import { describe, it, expect, beforeEach } from "vitest";
import { create } from "zustand";
import { createDevicesSlice, type DevicesSlice } from "./devicesSlice";

function createTestStore() {
  return create<DevicesSlice>()(createDevicesSlice);
}

describe("devicesSlice", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it("starts with empty devices", () => {
    expect(store.getState().devices).toEqual([]);
  });

  it("adds an access point with correct defaults", () => {
    store.getState().addDevice("access-point", { x: 100, y: 200 });
    const devices = store.getState().devices;
    expect(devices).toHaveLength(1);
    expect(devices[0].type).toBe("access-point");
    expect(devices[0].position).toEqual({ x: 100, y: 200 });
    expect(devices[0].name).toBe("AP-1");
    expect(devices[0].range).toBe(50);
    expect(devices[0].txPower).toBe(20);
    expect(devices[0].id).toBeTruthy();
  });

  it("adds a camera with correct defaults", () => {
    store.getState().addDevice("camera", { x: 50, y: 50 });
    const device = store.getState().devices[0];
    expect(device.name).toBe("Camera-1");
    expect(device.range).toBe(30);
    expect(device.txPower).toBe(15);
  });

  it("adds a sensor with correct defaults", () => {
    store.getState().addDevice("sensor", { x: 50, y: 50 });
    const device = store.getState().devices[0];
    expect(device.name).toBe("Sensor-1");
    expect(device.range).toBe(20);
    expect(device.txPower).toBe(10);
  });

  it("increments name counter per type", () => {
    store.getState().addDevice("access-point", { x: 0, y: 0 });
    store.getState().addDevice("camera", { x: 10, y: 10 });
    store.getState().addDevice("access-point", { x: 20, y: 20 });
    const devices = store.getState().devices;
    expect(devices[0].name).toBe("AP-1");
    expect(devices[1].name).toBe("Camera-1");
    expect(devices[2].name).toBe("AP-2");
  });
});
