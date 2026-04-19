import { fspl, rssi, rssiAtPoint } from "./signal";
import type { Wall } from "../types";

describe("fspl", () => {
  it("returns 0 for zero distance", () => {
    expect(fspl(0)).toBe(0);
  });

  it("returns 0 for negative distance", () => {
    expect(fspl(-1)).toBe(0);
  });

  it("computes FSPL at 1m for 2.4 GHz", () => {
    expect(fspl(1, 2400)).toBeCloseTo(40.05, 1);
  });

  it("computes FSPL at 10m for 2.4 GHz", () => {
    expect(fspl(10, 2400)).toBeCloseTo(60.05, 1);
  });

  it("uses default frequency of 2400 MHz", () => {
    expect(fspl(1)).toBeCloseTo(fspl(1, 2400), 5);
  });

  it("computes FSPL at 5 GHz", () => {
    expect(fspl(1, 5000)).toBeCloseTo(46.43, 1);
  });
});

describe("rssi", () => {
  it("returns txPower at zero distance with no walls", () => {
    expect(rssi(20, 0, [])).toBe(20);
  });

  it("subtracts FSPL from txPower", () => {
    expect(rssi(20, 1, [])).toBeCloseTo(-20.05, 1);
  });

  it("subtracts wall attenuations", () => {
    expect(rssi(20, 1, [3.5, 7])).toBeCloseTo(-30.55, 1);
  });

  it("uses custom frequency", () => {
    expect(rssi(20, 1, [], 5000)).toBeCloseTo(-26.43, 1);
  });

  it("handles many walls", () => {
    const walls = [3.5, 3.5, 7, 25];
    expect(rssi(20, 1, walls)).toBeCloseTo(-59.05, 1);
  });
});

describe("rssiAtPoint", () => {
  const source = { x: 0, y: 0 };
  const target = { x: 100, y: 0 };
  const pxPerM = 10;

  it("computes RSSI with no walls", () => {
    const result = rssiAtPoint(20, source, target, [], pxPerM);
    expect(result).toBeCloseTo(-40.05, 1);
  });

  it("subtracts attenuation for intersected wall", () => {
    const wall: Wall = {
      id: "w1",
      start: { x: 50, y: -10 },
      end: { x: 50, y: 10 },
      material: "drywall",
      attenuationDb: 3.5,
    };
    const result = rssiAtPoint(20, source, target, [wall], pxPerM);
    expect(result).toBeCloseTo(-43.55, 1);
  });

  it("ignores walls not on the path", () => {
    const wall: Wall = {
      id: "w1",
      start: { x: 200, y: -10 },
      end: { x: 200, y: 10 },
      material: "concrete",
      attenuationDb: 7,
    };
    const result = rssiAtPoint(20, source, target, [wall], pxPerM);
    expect(result).toBeCloseTo(-40.05, 1);
  });

  it("accumulates multiple wall attenuations", () => {
    const walls: Wall[] = [
      {
        id: "w1",
        start: { x: 30, y: -10 },
        end: { x: 30, y: 10 },
        material: "drywall",
        attenuationDb: 3.5,
      },
      {
        id: "w2",
        start: { x: 70, y: -10 },
        end: { x: 70, y: 10 },
        material: "concrete",
        attenuationDb: 7,
      },
    ];
    const result = rssiAtPoint(20, source, target, walls, pxPerM);
    expect(result).toBeCloseTo(-50.55, 1);
  });

  it("returns txPower at zero distance", () => {
    const result = rssiAtPoint(20, source, source, [], pxPerM);
    expect(result).toBe(20);
  });
});
