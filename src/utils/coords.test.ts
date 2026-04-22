import { describe, it, expect } from "vitest";
import { clientToStage, stageToContainer } from "./coords";

describe("clientToStage", () => {
  const rect = { left: 100, top: 50 } as DOMRect;

  it("converts with no transform", () => {
    const result = clientToStage(200, 150, rect, { x: 0, y: 0 }, 1);
    expect(result).toEqual({ x: 100, y: 100 });
  });

  it("accounts for zoom", () => {
    const result = clientToStage(200, 150, rect, { x: 0, y: 0 }, 2);
    expect(result).toEqual({ x: 50, y: 50 });
  });

  it("accounts for pan", () => {
    const result = clientToStage(200, 150, rect, { x: 20, y: 10 }, 1);
    expect(result).toEqual({ x: 80, y: 90 });
  });

  it("accounts for zoom and pan together", () => {
    const result = clientToStage(300, 250, rect, { x: 40, y: 20 }, 2);
    expect(result).toEqual({ x: 80, y: 90 });
  });
});

describe("stageToContainer", () => {
  it("converts with no transform", () => {
    const result = stageToContainer({ x: 100, y: 100 }, { x: 0, y: 0 }, 1);
    expect(result).toEqual({ x: 100, y: 100 });
  });

  it("accounts for zoom", () => {
    const result = stageToContainer({ x: 50, y: 50 }, { x: 0, y: 0 }, 2);
    expect(result).toEqual({ x: 100, y: 100 });
  });

  it("accounts for pan and zoom", () => {
    const result = stageToContainer({ x: 50, y: 50 }, { x: 20, y: 10 }, 2);
    expect(result).toEqual({ x: 120, y: 110 });
  });
});
