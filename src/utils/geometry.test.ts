import {
  distance,
  pointToSegmentProjection,
  segmentIntersection,
} from "./geometry";

describe("distance", () => {
  it("returns 0 for identical points", () => {
    expect(distance({ x: 0, y: 0 }, { x: 0, y: 0 })).toBe(0);
  });

  it("computes horizontal distance", () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 0 })).toBe(3);
  });

  it("computes vertical distance", () => {
    expect(distance({ x: 0, y: 0 }, { x: 0, y: 4 })).toBe(4);
  });

  it("computes diagonal distance (3-4-5 triangle)", () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });

  it("handles negative coordinates", () => {
    expect(distance({ x: -1, y: -1 }, { x: 2, y: 3 })).toBe(5);
  });
});

describe("pointToSegmentProjection", () => {
  it("projects onto midpoint of horizontal segment", () => {
    const result = pointToSegmentProjection(
      { x: 5, y: 3 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    );
    expect(result.x).toBeCloseTo(5, 5);
    expect(result.y).toBeCloseTo(0, 5);
  });

  it("clamps to start for points before segment", () => {
    const result = pointToSegmentProjection(
      { x: -5, y: 3 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    );
    expect(result.x).toBeCloseTo(0, 5);
    expect(result.y).toBeCloseTo(0, 5);
  });

  it("clamps to end for points past segment", () => {
    const result = pointToSegmentProjection(
      { x: 15, y: 3 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    );
    expect(result.x).toBeCloseTo(10, 5);
    expect(result.y).toBeCloseTo(0, 5);
  });

  it("returns start point for zero-length segment", () => {
    const result = pointToSegmentProjection(
      { x: 5, y: 5 },
      { x: 3, y: 3 },
      { x: 3, y: 3 },
    );
    expect(result.x).toBe(3);
    expect(result.y).toBe(3);
  });

  it("projects onto diagonal segment", () => {
    const result = pointToSegmentProjection(
      { x: 0, y: 10 },
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    );
    expect(result.x).toBeCloseTo(5, 5);
    expect(result.y).toBeCloseTo(5, 5);
  });

  it("handles point exactly on segment", () => {
    const result = pointToSegmentProjection(
      { x: 5, y: 0 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    );
    expect(result.x).toBeCloseTo(5, 5);
    expect(result.y).toBeCloseTo(0, 5);
  });
});

describe("segmentIntersection", () => {
  it("finds intersection of crossing segments", () => {
    const result = segmentIntersection(
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      { x: 10, y: 0 },
      { x: 0, y: 10 },
    );
    expect(result).not.toBeNull();
    expect(result!.x).toBeCloseTo(5, 5);
    expect(result!.y).toBeCloseTo(5, 5);
  });

  it("returns null for parallel segments", () => {
    const result = segmentIntersection(
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 0, y: 5 },
      { x: 10, y: 5 },
    );
    expect(result).toBeNull();
  });

  it("returns null for non-intersecting segments", () => {
    const result = segmentIntersection(
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: -1 },
      { x: 6, y: 1 },
    );
    expect(result).toBeNull();
  });

  it("detects T-intersection at endpoint", () => {
    const result = segmentIntersection(
      { x: 5, y: 0 },
      { x: 5, y: 10 },
      { x: 0, y: 5 },
      { x: 10, y: 5 },
    );
    expect(result).not.toBeNull();
    expect(result!.x).toBeCloseTo(5, 5);
    expect(result!.y).toBeCloseTo(5, 5);
  });

  it("returns null for collinear overlapping segments", () => {
    const result = segmentIntersection(
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 5, y: 0 },
      { x: 15, y: 0 },
    );
    expect(result).toBeNull();
  });

  it("finds intersection of perpendicular segments", () => {
    const result = segmentIntersection(
      { x: 0, y: 5 },
      { x: 10, y: 5 },
      { x: 5, y: 0 },
      { x: 5, y: 10 },
    );
    expect(result).not.toBeNull();
    expect(result!.x).toBeCloseTo(5, 5);
    expect(result!.y).toBeCloseTo(5, 5);
  });
});
