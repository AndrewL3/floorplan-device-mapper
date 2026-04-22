import { Layer, Group, Circle, Path } from "react-konva";
import { useStore } from "../../store";
import { theme } from "../../theme";
import type { DeviceType } from "../../types";

interface DeviceVisual {
  color: string;
  fill: string;
  iconPath: string;
  extraCircle?: { x: number; y: number; radius: number; filled: boolean };
}

const DEVICE_VISUALS: Record<DeviceType, DeviceVisual> = {
  "access-point": {
    color: theme.colors.accessPoint,
    fill: `${theme.colors.accessPoint}26`,
    iconPath:
      "M5 12.55 A11 11 0 0 1 19.08 12.55 M8.53 16.11 A6 6 0 0 1 15.48 16.11",
    extraCircle: { x: 12, y: 20, radius: 1.5, filled: true },
  },
  camera: {
    color: theme.colors.camera,
    fill: `${theme.colors.camera}26`,
    iconPath:
      "M5 7 L7 7 L9 4 L15 4 L17 7 L19 7 A2 2 0 0 1 21 9 L21 18 A2 2 0 0 1 19 20 L5 20 A2 2 0 0 1 3 18 L3 9 A2 2 0 0 1 5 7 Z",
    extraCircle: { x: 12, y: 13, radius: 4, filled: false },
  },
  sensor: {
    color: theme.colors.sensor,
    fill: `${theme.colors.sensor}26`,
    iconPath: "M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12",
    extraCircle: { x: 12, y: 12, radius: 3, filled: false },
  },
};

const {
  badgeRadius,
  iconScale,
  iconViewBox,
  strokeWidth,
  selectedStrokeWidth,
  selectedStrokeColor,
} = theme.device;
const iconOffset = iconViewBox / 2;

export function DeviceLayer() {
  const devices = useStore((s) => s.devices);
  const selectedId = useStore((s) => s.selectedDeviceId);
  const setSelectedDeviceId = useStore((s) => s.setSelectedDeviceId);

  return (
    <Layer>
      {devices.map((device) => {
        const visual = DEVICE_VISUALS[device.type];
        const isSelected = device.id === selectedId;

        return (
          <Group
            key={device.id}
            x={device.position.x}
            y={device.position.y}
            onClick={(e) => {
              e.cancelBubble = true;
              setSelectedDeviceId(device.id);
            }}
          >
            <Circle
              radius={badgeRadius}
              fill={visual.fill}
              stroke={isSelected ? selectedStrokeColor : visual.color}
              strokeWidth={isSelected ? selectedStrokeWidth : strokeWidth}
              perfectDrawEnabled={false}
            />
            <Group
              offsetX={iconOffset}
              offsetY={iconOffset}
              scaleX={iconScale}
              scaleY={iconScale}
            >
              <Path
                data={visual.iconPath}
                stroke={visual.color}
                strokeWidth={2.5}
                fill=""
                lineCap="round"
                lineJoin="round"
                listening={false}
              />
              {visual.extraCircle && (
                <Circle
                  x={visual.extraCircle.x}
                  y={visual.extraCircle.y}
                  radius={visual.extraCircle.radius}
                  fill={visual.extraCircle.filled ? visual.color : undefined}
                  stroke={visual.extraCircle.filled ? undefined : visual.color}
                  strokeWidth={visual.extraCircle.filled ? undefined : 2.5}
                  listening={false}
                />
              )}
            </Group>
          </Group>
        );
      })}
    </Layer>
  );
}
