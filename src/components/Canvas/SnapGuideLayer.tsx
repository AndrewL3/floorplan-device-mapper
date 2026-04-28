import { type MutableRefObject, useEffect, useRef } from "react";
import { Layer, Line, Circle, Text, Rect } from "react-konva";
import type Konva from "konva";
import { useStore } from "../../store";
import { theme } from "../../theme";
import { distance } from "../../utils/geometry";
import type { SnapGuideState } from "../../types";

const CALIBRATION_COLOR = theme.colors.camera;

const WALL_COLORS: Record<string, string> = {
  drywall: theme.colors.wallDrywall,
  glass: theme.colors.wallGlass,
  concrete: theme.colors.wallConcrete,
  metal: theme.colors.wallMetal,
};

interface SnapGuideLayerProps {
  snapGuideRef: MutableRefObject<SnapGuideState>;
}

export function SnapGuideLayer({ snapGuideRef }: SnapGuideLayerProps) {
  const calibrationPoints = useStore((s) => s.calibrationPoints);
  const calibrationPreview = useStore((s) => s.calibrationPreview);
  const showCalibrationInput = useStore((s) => s.showCalibrationInput);
  const wallDrawStart = useStore((s) => s.wallDrawStart);
  const wallDrawPreview = useStore((s) => s.wallDrawPreview);
  const activeWallMaterial = useStore((s) => s.activeWallMaterial);

  const wallLineRef = useRef<Konva.Line>(null);
  const snapRectRef = useRef<Konva.Rect>(null);

  useEffect(() => {
    snapGuideRef.current.wallLineNode = wallLineRef.current;
    snapGuideRef.current.snapPointNode = snapRectRef.current;
  });

  const calStart = calibrationPoints[0] ?? null;
  const calEnd = showCalibrationInput
    ? calibrationPoints[1]
    : calibrationPreview;

  const wallColor = WALL_COLORS[activeWallMaterial];

  return (
    <Layer>
      {calStart && calEnd && (
        <>
          <Line
            points={[calStart.x, calStart.y, calEnd.x, calEnd.y]}
            stroke={CALIBRATION_COLOR}
            strokeWidth={2}
            dash={showCalibrationInput ? undefined : [8, 4]}
            opacity={showCalibrationInput ? 0.8 : 0.6}
            listening={false}
          />
          <Circle
            x={calStart.x}
            y={calStart.y}
            radius={5}
            stroke={CALIBRATION_COLOR}
            strokeWidth={2}
            listening={false}
          />
          <Circle
            x={calEnd.x}
            y={calEnd.y}
            radius={5}
            stroke={CALIBRATION_COLOR}
            strokeWidth={2}
            listening={false}
          />
          <Text
            x={(calStart.x + calEnd.x) / 2}
            y={(calStart.y + calEnd.y) / 2 - 16}
            text={`${Math.round(distance(calStart, calEnd))} px`}
            fontSize={11}
            fontFamily={theme.fonts.mono}
            fill={CALIBRATION_COLOR}
            opacity={0.7}
            offsetX={20}
            listening={false}
          />
        </>
      )}

      {wallDrawStart && wallDrawPreview && (
        <Line
          points={[
            wallDrawStart.x,
            wallDrawStart.y,
            wallDrawPreview.x,
            wallDrawPreview.y,
          ]}
          stroke={wallColor}
          strokeWidth={2}
          dash={[8, 4]}
          opacity={0.6}
          lineCap="round"
          listening={false}
        />
      )}

      <Line
        ref={wallLineRef}
        points={[]}
        stroke="#888"
        strokeWidth={2}
        dash={[6, 4]}
        opacity={0.5}
        visible={false}
        listening={false}
      />
      <Rect
        ref={snapRectRef}
        width={6}
        height={6}
        offsetX={3}
        offsetY={3}
        fill="#888"
        visible={false}
        listening={false}
      />
    </Layer>
  );
}
