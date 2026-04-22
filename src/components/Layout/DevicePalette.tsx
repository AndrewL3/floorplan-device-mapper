import styled from "@emotion/styled";
import type { DeviceType } from "../../types";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: grab;
  border: 1px solid transparent;
  transition: border-color ${({ theme }) => theme.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.outlineVariant};
  }
`;

const Badge = styled.div<{ $color: string }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ $color }) => `${$color}26`};
  border: 1.5px solid ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Name = styled.span`
  font-size: ${({ theme }) => theme.fontSize.body};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

interface DeviceConfig {
  type: DeviceType;
  label: string;
  color: string;
  icon: string;
}

const DEVICES: DeviceConfig[] = [
  {
    type: "access-point",
    label: "Access Point",
    color: "#448FFD",
    icon: "M5 12.55a11 11 0 0 1 14.08 0 M8.53 16.11a6 6 0 0 1 6.95 0",
  },
  {
    type: "camera",
    label: "Camera",
    color: "#F2994A",
    icon: "M5 7h2l2-3h6l2 3h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z",
  },
  {
    type: "sensor",
    label: "Sensor",
    color: "#4ADE80",
    icon: "M12 2v4 M12 18v4 M2 12h4 M18 12h4",
  },
];

const handleDragStart = (e: React.DragEvent, type: DeviceType) => {
  e.dataTransfer.setData("application/device-type", type);
  e.dataTransfer.effectAllowed = "copy";
};

export function DevicePalette() {
  return (
    <List>
      {DEVICES.map(({ type, label, color, icon }) => (
        <Row key={type} draggable onDragStart={(e) => handleDragStart(e, type)}>
          <Badge $color={color}>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={icon} />
              {type === "access-point" && (
                <circle cx="12" cy="20" r="1.5" fill={color} stroke="none" />
              )}
              {type === "camera" && <circle cx="12" cy="13" r="4" />}
              {type === "sensor" && <circle cx="12" cy="12" r="3" />}
            </svg>
          </Badge>
          <Name>{label}</Name>
        </Row>
      ))}
    </List>
  );
}
