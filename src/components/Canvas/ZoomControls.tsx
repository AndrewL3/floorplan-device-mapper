import styled from "@emotion/styled";

const Bar = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.space.lg};
  right: ${({ theme }) => theme.space.lg};
  display: flex;
  align-items: center;
  gap: 0;
  background: ${({ theme }) => theme.colors.surfaceContainer};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

const Btn = styled.button<{ $separator?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 28px;
  background: none;
  border: none;
  border-left: ${({ $separator, theme }) =>
    $separator ? `1px solid ${theme.colors.outlineVariant}` : "none"};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSize.body};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
  }
`;

const Pct = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 28px;
  padding: 0 ${({ theme }) => theme.space.xs};
  background: none;
  border: none;
  border-left: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-right: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  color: ${({ theme }) => theme.colors.onSurface};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.label};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
  }
`;

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitToView: () => void;
}

export function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitToView,
}: ZoomControlsProps) {
  return (
    <Bar>
      <Btn onClick={onZoomOut} title="Zoom out">
        −
      </Btn>
      <Pct onClick={onResetZoom} title="Reset to 100%">
        {Math.round(zoom * 100)}%
      </Pct>
      <Btn onClick={onZoomIn} title="Zoom in">
        +
      </Btn>
      <Btn onClick={onFitToView} title="Fit to view" $separator>
        ⊡
      </Btn>
    </Bar>
  );
}
