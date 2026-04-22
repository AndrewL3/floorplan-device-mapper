import styled from "@emotion/styled";
import { useStore } from "../../store";
import type { Tool } from "../../types";

const Group = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`;

const ToolButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 6px 0;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.onSurface : theme.colors.outline};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.surfaceContainerHighest : "transparent"};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.outlineVariant};
  border-left: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.primary}` : undefined};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
  }
`;

const TOOLS: { tool: Tool; label: string }[] = [
  { tool: "select", label: "Select" },
  { tool: "draw-wall", label: "Wall" },
  { tool: "calibrate", label: "Scale" },
];

export function ToolBar() {
  const activeTool = useStore((s) => s.activeTool);
  const setActiveTool = useStore((s) => s.setActiveTool);
  const resetInteraction = useStore((s) => s.resetInteraction);

  const handleClick = (tool: Tool) => {
    setActiveTool(tool);
    resetInteraction();
  };

  return (
    <Group>
      {TOOLS.map(({ tool, label }) => (
        <ToolButton
          key={tool}
          $active={activeTool === tool}
          onClick={() => handleClick(tool)}
        >
          {label}
        </ToolButton>
      ))}
    </Group>
  );
}
