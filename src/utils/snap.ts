import type { Point, Wall } from "../types";
import { distance, pointToSegmentProjection } from "./geometry";

export function nearestWallSnap(
  point: Point,
  walls: Wall[],
  threshold: number = 15,
): { wall: Wall; snapPoint: Point } | null {
  let closest: { wall: Wall; snapPoint: Point; dist: number } | null = null;

  for (const wall of walls) {
    const snapPoint = pointToSegmentProjection(point, wall.start, wall.end);
    const dist = distance(point, snapPoint);

    if (dist <= threshold && (closest === null || dist < closest.dist)) {
      closest = { wall, snapPoint, dist };
    }
  }

  return closest ? { wall: closest.wall, snapPoint: closest.snapPoint } : null;
}
