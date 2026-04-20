import { useState, useEffect, useCallback, useRef } from "react";
import { useStore } from "../store";
import type { KonvaEventObject } from "konva/lib/Node";

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;
const WHEEL_FACTOR = 1.1;
const BUTTON_FACTOR = 1.2;

export function usePanZoom(stageWidth: number, stageHeight: number) {
  const zoom = useStore((s) => s.zoom);
  const pan = useStore((s) => s.pan);
  const [spaceHeld, setSpaceHeld] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const stageSizeRef = useRef({ width: stageWidth, height: stageHeight });
  stageSizeRef.current = { width: stageWidth, height: stageHeight };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        !e.repeat &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setSpaceHeld(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") setSpaceHeld(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    if (!pointer) return;

    const {
      zoom: oldScale,
      pan: oldPan,
      setZoom,
      setPan,
    } = useStore.getState();
    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale = Math.min(
      MAX_ZOOM,
      Math.max(
        MIN_ZOOM,
        direction > 0 ? oldScale * WHEEL_FACTOR : oldScale / WHEEL_FACTOR,
      ),
    );

    const mousePointTo = {
      x: (pointer.x - oldPan.x) / oldScale,
      y: (pointer.y - oldPan.y) / oldScale,
    };

    setZoom(newScale);
    setPan({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  }, []);

  const handleDragStart = useCallback(() => setIsDragging(true), []);

  const handleDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
    setIsDragging(false);
    useStore.getState().setPan({ x: e.target.x(), y: e.target.y() });
  }, []);

  const zoomTo = useCallback((targetScale: number) => {
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, targetScale));
    const {
      zoom: oldScale,
      pan: oldPan,
      setZoom,
      setPan,
    } = useStore.getState();
    const { width, height } = stageSizeRef.current;
    const center = { x: width / 2, y: height / 2 };
    const worldCenter = {
      x: (center.x - oldPan.x) / oldScale,
      y: (center.y - oldPan.y) / oldScale,
    };
    setZoom(clamped);
    setPan({
      x: center.x - worldCenter.x * clamped,
      y: center.y - worldCenter.y * clamped,
    });
  }, []);

  const zoomIn = useCallback(() => {
    zoomTo(useStore.getState().zoom * BUTTON_FACTOR);
  }, [zoomTo]);

  const zoomOut = useCallback(() => {
    zoomTo(useStore.getState().zoom / BUTTON_FACTOR);
  }, [zoomTo]);

  const resetZoom = useCallback(() => {
    zoomTo(1);
  }, [zoomTo]);

  const fitToView = useCallback(() => {
    const { width, height } = stageSizeRef.current;
    useStore.getState().fitToView(width, height);
  }, []);

  const cursor = spaceHeld ? (isDragging ? "grabbing" : "grab") : "default";

  const stageProps = {
    scaleX: zoom,
    scaleY: zoom,
    x: pan.x,
    y: pan.y,
    draggable: spaceHeld,
    onWheel: handleWheel,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
  };

  return { stageProps, cursor, zoomIn, zoomOut, resetZoom, fitToView, zoom };
}
