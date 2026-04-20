import {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "@emotion/styled";
import { useStore } from "../../store";
import { useFloorplanUpload } from "../../hooks/useFloorplanUpload";
import { usePanZoom } from "../../hooks/usePanZoom";
import { EmptyState } from "./EmptyState";
import { FloorplanStage } from "./FloorplanStage";
import { ZoomControls } from "./ZoomControls";
import { DropOverlay } from "./DropOverlay";

const Container = styled.div<{ $cursor: string }>`
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: ${({ $cursor }) => $cursor};
`;

export interface CanvasAreaHandle {
  openFilePicker: () => void;
}

export const CanvasArea = forwardRef<CanvasAreaHandle>(
  function CanvasArea(_props, ref) {
    const floorplan = useStore((s) => s.floorplan);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [dragCounter, setDragCounter] = useState(0);

    const { upload, openFilePicker, inputRef, loadedImage } =
      useFloorplanUpload();
    const { stageProps, cursor, zoomIn, zoomOut, resetZoom, fitToView, zoom } =
      usePanZoom(containerSize.width, containerSize.height);

    useImperativeHandle(ref, () => ({ openFilePicker }), [openFilePicker]);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setContainerSize({ width, height });
      });
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setDragCounter((c) => c + 1);
    }, []);

    const handleDragLeave = useCallback(() => {
      setDragCounter((c) => c - 1);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        setDragCounter(0);
        const file = e.dataTransfer.files[0];
        if (file) upload(file, containerSize.width, containerSize.height);
      },
      [upload, containerSize],
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) upload(file, containerSize.width, containerSize.height);
        e.target.value = "";
      },
      [upload, containerSize],
    );

    const hasStage = floorplan && loadedImage && containerSize.width > 0;

    return (
      <Container
        ref={containerRef}
        $cursor={cursor}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleInputChange}
        />

        {hasStage ? (
          <FloorplanStage
            width={containerSize.width}
            height={containerSize.height}
            image={loadedImage}
            stageProps={stageProps}
          />
        ) : (
          <EmptyState onUpload={openFilePicker} />
        )}

        {hasStage && (
          <ZoomControls
            zoom={zoom}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onResetZoom={resetZoom}
            onFitToView={fitToView}
          />
        )}

        <DropOverlay visible={dragCounter > 0} />
      </Container>
    );
  },
);
