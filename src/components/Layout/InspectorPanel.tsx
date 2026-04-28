import styled from "@emotion/styled";
import { useStore } from "../../store";
import { theme } from "../../theme";
import type { DeviceType } from "../../types";

const Aside = styled.aside`
  width: ${({ theme }) => theme.layout.panelWidth};
  min-width: ${({ theme }) => theme.layout.panelWidth};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  padding: ${({ theme }) => theme.space.lg} 18px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const AccentBar = styled.div`
  width: 2px;
  height: 14px;
  background: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.widest};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onSurface};
  margin: 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${({ theme }) => theme.colors.outline};
  font-size: ${({ theme }) => theme.fontSize.body};
  text-align: center;
  opacity: 0.4;
`;

const EmptyIcon = styled.div`
  width: 40px;
  height: 40px;
  border: 2px dashed ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.space.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const Section = styled.div`
  padding: ${({ theme }) => theme.space.md} 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
`;

const DEVICE_COLORS: Record<DeviceType, string> = {
  "access-point": theme.colors.accessPoint,
  camera: theme.colors.camera,
  sensor: theme.colors.sensor,
};

const DEVICE_LABELS: Record<DeviceType, string> = {
  "access-point": "Access Point",
  camera: "Camera",
  sensor: "Sensor",
};

const TypeBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const TypeCircle = styled.div<{ deviceColor: string }>`
  width: 24px;
  height: 24px;
  background: ${({ deviceColor }) => `${deviceColor}26`};
  border: 1.5px solid ${({ deviceColor }) => deviceColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.label};
  color: ${({ deviceColor }) => deviceColor};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const TypeLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.outline};
`;

const TYPE_ABBREVS: Record<DeviceType, string> = {
  "access-point": "AP",
  camera: "CAM",
  sensor: "SNS",
};

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.label};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.outline};
  margin-bottom: 6px;
`;

const NameInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.surfaceLowest};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 6px 8px;
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: ${({ theme }) => theme.fontSize.body};
  font-family: ${({ theme }) => theme.fonts.sans};
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SliderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const SliderValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: ${({ theme }) => theme.colors.outlineVariant};
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.colors.onSurface};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.colors.onSurface};
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
`;

const SliderBounds = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.space.xs};
  font-size: ${({ theme }) => theme.fontSize.labelSmall};
  color: ${({ theme }) => theme.colors.outline};
  opacity: 0.6;
`;

const PositionRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.outline};
`;

const PositionValue = styled.span`
  color: ${({ theme }) => theme.colors.onSurface};
`;

const Actions = styled.div`
  padding: ${({ theme }) => theme.space.md} 18px;
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 6px 0;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  font-family: ${({ theme }) => theme.fonts.sans};
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transition.fast};

  &:hover {
    opacity: 0.85;
  }
`;

const DuplicateButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.surfaceContainerHigh};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  color: ${({ theme }) => theme.colors.onSurface};
`;

const DeleteButton = styled(ActionButton)`
  background: ${({ theme }) => `${theme.colors.dead}1a`};
  border: 1px solid ${({ theme }) => `${theme.colors.dead}4d`};
  color: ${({ theme }) => theme.colors.dead};
`;

export function InspectorPanel() {
  const device = useStore((s) =>
    s.devices.find((d) => d.id === s.selectedDeviceId),
  );
  const updateDevice = useStore((s) => s.updateDevice);
  const scale = useStore((s) => s.scale);
  const duplicateDevice = useStore((s) => s.duplicateDevice);
  const removeDevice = useStore((s) => s.removeDevice);

  return (
    <Aside>
      <Header>
        <AccentBar />
        <Title>Inspector</Title>
      </Header>
      {!device ? (
        <EmptyState>
          <EmptyIcon>⎋</EmptyIcon>
          Select a device
          <br />
          to inspect
        </EmptyState>
      ) : (
        <>
          <Section>
            <TypeBadge>
              <TypeCircle deviceColor={DEVICE_COLORS[device.type]}>
                {TYPE_ABBREVS[device.type]}
              </TypeCircle>
              <TypeLabel>{DEVICE_LABELS[device.type]}</TypeLabel>
            </TypeBadge>
          </Section>

          <Section>
            <Label>Name</Label>
            <NameInput
              key={device.id}
              defaultValue={device.name}
              onBlur={(e) => updateDevice(device.id, { name: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          </Section>

          <Section>
            <SliderRow>
              <Label as="span">Range</Label>
              <SliderValue>{device.range} m</SliderValue>
            </SliderRow>
            <Slider
              type="range"
              min={0}
              max={100}
              value={device.range}
              onChange={(e) =>
                updateDevice(device.id, { range: Number(e.target.value) })
              }
            />
            <SliderBounds>
              <span>0</span>
              <span>100 m</span>
            </SliderBounds>
          </Section>

          <Section>
            <SliderRow>
              <Label as="span">TX Power</Label>
              <SliderValue>{device.txPower} dBm</SliderValue>
            </SliderRow>
            <Slider
              type="range"
              min={0}
              max={30}
              value={device.txPower}
              onChange={(e) =>
                updateDevice(device.id, { txPower: Number(e.target.value) })
              }
            />
            <SliderBounds>
              <span>0</span>
              <span>30 dBm</span>
            </SliderBounds>
          </Section>

          <Section>
            <Label>Position</Label>
            <PositionRow>
              <span>
                x:{" "}
                <PositionValue>
                  {scale
                    ? (device.position.x / scale.pixelsPerMeter).toFixed(1)
                    : device.position.x.toFixed(1)}
                </PositionValue>{" "}
                {scale ? "m" : "px"}
              </span>
              <span>
                y:{" "}
                <PositionValue>
                  {scale
                    ? (device.position.y / scale.pixelsPerMeter).toFixed(1)
                    : device.position.y.toFixed(1)}
                </PositionValue>{" "}
                {scale ? "m" : "px"}
              </span>
            </PositionRow>
          </Section>
          <Actions>
            <DuplicateButton onClick={() => duplicateDevice(device.id)}>
              Duplicate
            </DuplicateButton>
            <DeleteButton onClick={() => removeDevice(device.id)}>
              Delete
            </DeleteButton>
          </Actions>
        </>
      )}
    </Aside>
  );
}
