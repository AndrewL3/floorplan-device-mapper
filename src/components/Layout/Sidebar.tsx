import styled from "@emotion/styled";
import { useStore } from "../../store";
import { ToolBar } from "./ToolBar";
import { MaterialPicker } from "./MaterialPicker";
import { DevicePalette } from "./DevicePalette";

const Aside = styled.aside`
  width: ${({ theme }) => theme.layout.sidebarWidth};
  min-width: ${({ theme }) => theme.layout.sidebarWidth};
  background: ${({ theme }) => theme.colors.surfaceLowest};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Section = styled.div<{ $raised?: boolean }>`
  padding: ${({ theme }) => theme.space.lg};
  background: ${({ theme, $raised }) =>
    $raised ? theme.colors.surface : "transparent"};
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSize.label};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.widest};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.outline};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const UploadButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.surfaceContainer};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
  }
`;

const ScaleReadout = styled.div`
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.outline};
`;

const ScaleValue = styled.span`
  color: ${({ theme }) => theme.colors.sensor};
`;

interface SidebarProps {
  onUpload: () => void;
}

export function Sidebar({ onUpload }: SidebarProps) {
  const activeTool = useStore((s) => s.activeTool);
  const scale = useStore((s) => s.scale);

  return (
    <Aside>
      <Section>
        <Label>Floorplan</Label>
        <UploadButton onClick={onUpload}>Upload floorplan</UploadButton>
      </Section>
      <Section $raised>
        <Label>Tools</Label>
        <ToolBar />
      </Section>
      {activeTool === "draw-wall" && (
        <Section>
          <Label>Material</Label>
          <MaterialPicker />
        </Section>
      )}
      <Section $raised style={{ flex: 1 }}>
        <Label>Devices</Label>
        <DevicePalette />
      </Section>
      <Section>
        <Label>Scale</Label>
        <ScaleReadout>
          {scale ? (
            <>
              <ScaleValue>✓</ScaleValue> {scale.pixelsPerMeter.toFixed(1)} px/m
            </>
          ) : (
            "Not calibrated"
          )}
        </ScaleReadout>
      </Section>
    </Aside>
  );
}
