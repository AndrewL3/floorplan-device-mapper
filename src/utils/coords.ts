import type { Point } from "../types";

export function clientToStage(
  clientX: number,
  clientY: number,
  containerRect: DOMRect,
  pan: Point,
  zoom: number,
): Point {
  return {
    x: (clientX - containerRect.left - pan.x) / zoom,
    y: (clientY - containerRect.top - pan.y) / zoom,
  };
}

export function stageToContainer(
  stage: Point,
  pan: Point,
  zoom: number,
): Point {
  return {
    x: stage.x * zoom + pan.x,
    y: stage.y * zoom + pan.y,
  };
}
