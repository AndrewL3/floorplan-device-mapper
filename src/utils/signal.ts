import type { Point, Wall } from "../types";
import { distance, segmentIntersection } from "./geometry";

export function fspl(distanceMeters: number, freqMHz: number = 2400): number {
  if (distanceMeters <= 0) return 0;
  return 20 * Math.log10(distanceMeters) + 20 * Math.log10(freqMHz) - 27.55;
}

export function rssi(
  txPowerDbm: number,
  distanceMeters: number,
  wallAttenuations: number[],
  freqMHz: number = 2400,
): number {
  const pathLoss = fspl(distanceMeters, freqMHz);
  const wallLoss = wallAttenuations.reduce((sum, db) => sum + db, 0);
  return txPowerDbm - pathLoss - wallLoss;
}

export function rssiAtPoint(
  txPowerDbm: number,
  source: Point,
  target: Point,
  walls: Wall[],
  pixelsPerMeter: number,
  freqMHz: number = 2400,
): number {
  const pixelDist = distance(source, target);
  const meters = pixelDist / pixelsPerMeter;

  const attenuations: number[] = [];
  for (const wall of walls) {
    if (segmentIntersection(source, target, wall.start, wall.end) !== null) {
        attenuations.push(wall.attenuationDb);
    }
  }

  return rssi(txPowerDbm, meters, attenuations, freqMHz);
}
