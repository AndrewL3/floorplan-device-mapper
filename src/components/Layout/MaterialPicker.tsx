import styled from "@emotion/styled";
import { useStore } from "../../store";
import type { WallMaterial } from "../../types";
import { theme } from "../../theme";

const Group = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`;

const MATERIAL_COLORS: Record<WallMaterial, string> = {
  drywall: theme.colors.wallDrywall,
  glass: theme.colors.wallGlass,
  concrete: theme.colors.wallConcrete,
  metal: theme.colors.wallMetal,
};

const MaterialButton = styled.button<{ $active: boolean; $color: string }>`
  flex: 1;
  padding: 5px 0;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSize.label};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};
  color: ${({ $active, $color, theme }) =>
    $active ? $color : theme.colors.outline};
  background: ${({ $active, $color }) =>
    $active ? `${$color}15` : "transparent"};
  border: 1px solid
    ${({ $active, $color, theme }) =>
      $active ? $color : theme.colors.outlineVariant};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
  }
`;

const MATERIALS: { material: WallMaterial; label: string }[] = [
  { material: "drywall", label: "Dry" },
  { material: "glass", label: "Glass" },
  { material: "concrete", label: "Conc" },
  { material: "metal", label: "Metal" },
];

export function MaterialPicker() {
  const activeMaterial = useStore((s) => s.activeWallMaterial);
  const setMaterial = useStore((s) => s.setActiveWallMaterial);

  return (
    <Group>
      {MATERIALS.map(({ material, label }) => (
        <MaterialButton
          key={material}
          $active={activeMaterial === material}
          $color={MATERIAL_COLORS[material]}
          onClick={() => setMaterial(material)}
        >
          {label}
        </MaterialButton>
      ))}
    </Group>
  );
}
