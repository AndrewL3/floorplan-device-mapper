import { useEffect, useCallback, useRef } from "react";
import { Stage } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { FloorplanImage } from "./FloorplanImage";
import { WallLayer } from "./WallLayer";
import { CoverageLayer } from "./CoverageLayer";
import { DeviceLayer } from "./DeviceLayer";
import { SnapGuideLayer } from "./SnapGuideLayer";
import { useStore } from "../../store";
import type { Point, SnapGuideState } from "../../types";

interface FloorplanStageProps {
  width: number;
  height: number;
  image: HTMLImageElement;
  stageProps: {
    scaleX: number;
    scaleY: number;
    x: number;
    y: number;
    draggable: boolean;
    onWheel: (e: KonvaEventObject<WheelEvent>) => void;
    onDragStart: () => void;
    onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
  };
}

function pointerToWorld(e: KonvaEventObject<MouseEvent>): Point | null {
  const stage = e.target.getStage();
  const pointer = stage?.getPointerPosition();
  if (!pointer || !stage) return null;
  return {
    x: (pointer.x - stage.x()) / stage.scaleX(),
    y: (pointer.y - stage.y()) / stage.scaleY(),
  };
}

export function FloorplanStage({
  width,
  height,
  image,
  stageProps,
}: FloorplanStageProps) {
  const activeTool = useStore((s) => s.activeTool);
  const selectedDeviceId = useStore((s) => s.selectedDeviceId);
  const setSelectedDeviceId = useStore((s) => s.setSelectedDeviceId);
  const removeDevice = useStore((s) => s.removeDevice);
  const addCalibrationPoint = useStore((s) => s.addCalibrationPoint);
  const setCalibrationPreview = useStore((s) => s.setCalibrationPreview);
  const addWallDrawPoint = useStore((s) => s.addWallDrawPoint);
  const setWallDrawPreview = useStore((s) => s.setWallDrawPreview);
  const cancelInteraction = useStore((s) => s.cancelInteraction);

  const snapGuideRef = useRef<SnapGuideState>({
    wall: null,
    snapPoint: null,
    wallLineNode: null,
    snapPointNode: null,
  });
  const handleClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      const point = pointerToWorld(e);
      if (!point) return;

      switch (activeTool) {
        case "calibrate":
          addCalibrationPoint(point);
          break;
        case "draw-wall":
          addWallDrawPoint(point);
          break;
        case "select":
          setSelectedDeviceId(null);
          break;
      }
    },
    [activeTool, addCalibrationPoint, addWallDrawPoint, setSelectedDeviceId],
  );

  const handleMouseMove = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      const point = pointerToWorld(e);
      if (!point) return;

      const state = useStore.getState();

      if (activeTool === "calibrate" && state.calibrationPoints.length === 1) {
        setCalibrationPreview(point);
      } else if (activeTool === "draw-wall" && state.wallDrawStart !== null) {
        setWallDrawPreview(point);
      }
    },
    [activeTool, setCalibrationPreview, setWallDrawPreview],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        tag === "INPUT" ||
        tag === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "Escape") {
        cancelInteraction();
        setSelectedDeviceId(null);
      }

      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        activeTool === "select" &&
        selectedDeviceId
      ) {
        removeDevice(selectedDeviceId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    cancelInteraction,
    setSelectedDeviceId,
    activeTool,
    selectedDeviceId,
    removeDevice,
  ]);

  return (
    <Stage
      width={width}
      height={height}
      {...stageProps}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      <FloorplanImage image={image} />
      <WallLayer />
      <CoverageLayer />
      <DeviceLayer snapGuideRef={snapGuideRef} />
      <SnapGuideLayer snapGuideRef={snapGuideRef} />
    </Stage>
  );
}
