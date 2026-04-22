import { Layer, Line } from "react-konva";
import { useStore } from "../../store";
import { theme } from "../../theme";
import type { WallMaterial } from "../../types";

const WALL_COLORS: Record<WallMaterial, string> = {
  drywall: theme.colors.wallDrywall,
  glass: theme.colors.wallGlass,
  concrete: theme.colors.wallConcrete,
  metal: theme.colors.wallMetal,
};

export function WallLayer() {
  const walls = useStore((s) => s.walls);

  return (
    <Layer>
      {walls.map((wall) => (
        <Line
          key={wall.id}
          points={[wall.start.x, wall.start.y, wall.end.x, wall.end.y]}
          stroke={WALL_COLORS[wall.material]}
          strokeWidth={theme.wall.strokeWidth[wall.material]}
          lineCap="round"
          perfectDrawEnabled={false}
        />
      ))}
    </Layer>
  );
}
