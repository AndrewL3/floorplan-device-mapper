export interface Point {
  x: number;
  y: number;
}

export type DeviceType = "access-point" | "camera" | "sensor";

export interface Device {
  id: string;
  type: DeviceType;
  name: string;
  position: Point;
  range: number;
  txPower: number;
}

export type WallMaterial = "drywall" | "glass" | "concrete" | "metal";

export interface Wall {
  id: string;
  start: Point;
  end: Point;
  material: WallMaterial;
  attenuationDb: number;
}

export type Tool = "select" | "draw-wall" | "calibrate";

export interface Scale {
  pixelsPerMeter: number;
}

export interface SnapGuideState {
  wall: Wall | null;
  snapPoint: Point | null;
  wallLineNode: import("konva/lib/shapes/Line").Line | null;
  snapPointNode: import("konva/lib/shapes/Rect").Rect | null;
}
