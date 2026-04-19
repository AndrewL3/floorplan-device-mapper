import { nearestWallSnap } from "./snap";
import type { Wall } from "../types";

function makeWall(
  id: string,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): Wall {
  return {
    id,
    start: { x: x1, y: y1 },
    end: { x: x2, y: y2 },
    material: "drywall",
    attenuationDb: 3.5,
  };
}

describe("nearestWallSnap", () => {
  it("returns null when no walls exist", () => {
    expect(nearestWallSnap({ x: 5, y: 5 }, [])).toBeNull();
  });

  it("returns null when all walls are beyond threshold", () => {
    const wall = makeWall("w1", 0, 100, 100, 100);
    expect(nearestWallSnap({ x: 50, y: 0 }, [wall], 15)).toBeNull();
  });

  it("snaps to wall within threshold", () => {
    const wall = makeWall("w1", 0, 0, 100, 0);
    const result = nearestWallSnap({ x: 50, y: 10 }, [wall], 15);
    expect(result).not.toBeNull();
    expect(result!.wall.id).toBe("w1");
    expect(result!.snapPoint.x).toBeCloseTo(50, 5);
    expect(result!.snapPoint.y).toBeCloseTo(0, 5);
  });

  it("returns closest wall when multiple are within threshold", () => {
    const walls = [
      makeWall("far", 0, 10, 100, 10),
      makeWall("close", 0, 3, 100, 3),
    ];
    const result = nearestWallSnap({ x: 50, y: 0 }, walls, 15);
    expect(result).not.toBeNull();
    expect(result!.wall.id).toBe("close");
  });

  it("returns first wall when equidistant", () => {
    const walls = [
      makeWall("first", 0, 5, 100, 5),
      makeWall("second", 0, -5, 100, -5),
    ];
    const result = nearestWallSnap({ x: 50, y: 0 }, walls, 15);
    expect(result).not.toBeNull();
    expect(result!.wall.id).toBe("first");
  });

  it("snaps when point is exactly on wall", () => {
    const wall = makeWall("w1", 0, 0, 100, 0);
    const result = nearestWallSnap({ x: 50, y: 0 }, [wall], 15);
    expect(result).not.toBeNull();
    expect(result!.snapPoint.x).toBeCloseTo(50, 5);
    expect(result!.snapPoint.y).toBeCloseTo(0, 5);
  });

  it("includes boundary — snaps at exactly threshold distance", () => {
    const wall = makeWall("w1", 0, 0, 100, 0);
    expect(nearestWallSnap({ x: 50, y: 15 }, [wall], 15)).not.toBeNull();
  });

  it("excludes beyond threshold", () => {
    const wall = makeWall("w1", 0, 0, 100, 0);
    expect(nearestWallSnap({ x: 50, y: 16 }, [wall], 15)).toBeNull();
  });

  it("uses default threshold of 15", () => {
    const wall = makeWall("w1", 0, 0, 100, 0);
    expect(nearestWallSnap({ x: 50, y: 14 }, [wall])).not.toBeNull();
    expect(nearestWallSnap({ x: 50, y: 16 }, [wall])).toBeNull();
  });
});
