import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "./index";

function resetStore() {
  useStore.setState(useStore.getInitialState());
}

describe("devicesSlice", () => {
  beforeEach(() => {
    resetStore();
  });

  it("starts with empty devices", () => {
    expect(useStore.getState().devices).toEqual([]);
  });

  it("adds an access point with correct defaults", () => {
    useStore.getState().addDevice("access-point", { x: 100, y: 200 });
    const devices = useStore.getState().devices;
    expect(devices).toHaveLength(1);
    expect(devices[0].type).toBe("access-point");
    expect(devices[0].position).toEqual({ x: 100, y: 200 });
    expect(devices[0].name).toBe("AP-1");
    expect(devices[0].range).toBe(50);
    expect(devices[0].txPower).toBe(20);
    expect(devices[0].id).toBeTruthy();
  });

  it("adds a camera with correct defaults", () => {
    useStore.getState().addDevice("camera", { x: 50, y: 50 });
    const device = useStore.getState().devices[0];
    expect(device.name).toBe("Camera-1");
    expect(device.range).toBe(30);
    expect(device.txPower).toBe(15);
  });

  it("adds a sensor with correct defaults", () => {
    useStore.getState().addDevice("sensor", { x: 50, y: 50 });
    const device = useStore.getState().devices[0];
    expect(device.name).toBe("Sensor-1");
    expect(device.range).toBe(20);
    expect(device.txPower).toBe(10);
  });

  it("increments name counter per type", () => {
    useStore.getState().addDevice("access-point", { x: 0, y: 0 });
    useStore.getState().addDevice("camera", { x: 10, y: 10 });
    useStore.getState().addDevice("access-point", { x: 20, y: 20 });
    const devices = useStore.getState().devices;
    expect(devices[0].name).toBe("AP-1");
    expect(devices[1].name).toBe("Camera-1");
    expect(devices[2].name).toBe("AP-2");
  });

  describe("updateDevice", () => {
    it("updates device position", () => {
      useStore.getState().addDevice("access-point", { x: 100, y: 200 });
      const id = useStore.getState().devices[0].id;
      useStore.getState().updateDevice(id, { position: { x: 300, y: 400 } });
      expect(useStore.getState().devices[0].position).toEqual({
        x: 300,
        y: 400,
      });
    });

    it("updates device name", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      const id = useStore.getState().devices[0].id;
      useStore.getState().updateDevice(id, { name: "Lobby AP" });
      expect(useStore.getState().devices[0].name).toBe("Lobby AP");
    });

    it("updates range and txPower", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      const id = useStore.getState().devices[0].id;
      useStore.getState().updateDevice(id, { range: 75, txPower: 25 });
      const d = useStore.getState().devices[0];
      expect(d.range).toBe(75);
      expect(d.txPower).toBe(25);
    });

    it("does not modify other devices", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      useStore.getState().addDevice("camera", { x: 10, y: 10 });
      const apId = useStore.getState().devices[0].id;
      useStore.getState().updateDevice(apId, { name: "Changed" });
      expect(useStore.getState().devices[1].name).toBe("Camera-1");
    });

    it("no-ops for unknown id", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      useStore.getState().updateDevice("nonexistent", { name: "X" });
      expect(useStore.getState().devices[0].name).toBe("AP-1");
    });
  });

  describe("removeDevice", () => {
    it("removes device by id", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      useStore.getState().addDevice("camera", { x: 10, y: 10 });
      const apId = useStore.getState().devices[0].id;
      useStore.getState().removeDevice(apId);
      expect(useStore.getState().devices).toHaveLength(1);
      expect(useStore.getState().devices[0].type).toBe("camera");
    });

    it("clears selectedDeviceId when removing the selected device", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      const id = useStore.getState().devices[0].id;
      useStore.getState().setSelectedDeviceId(id);
      expect(useStore.getState().selectedDeviceId).toBe(id);
      useStore.getState().removeDevice(id);
      expect(useStore.getState().selectedDeviceId).toBeNull();
    });

    it("does not clear selectedDeviceId when removing a different device", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      useStore.getState().addDevice("camera", { x: 10, y: 10 });
      const apId = useStore.getState().devices[0].id;
      const camId = useStore.getState().devices[1].id;
      useStore.getState().setSelectedDeviceId(camId);
      useStore.getState().removeDevice(apId);
      expect(useStore.getState().selectedDeviceId).toBe(camId);
    });

    it("no-ops for unknown id", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      useStore.getState().removeDevice("nonexistent");
      expect(useStore.getState().devices).toHaveLength(1);
    });
  });

  describe("duplicateDevice", () => {
    it("creates a copy with offset position and new id", () => {
      useStore.getState().addDevice("access-point", { x: 100, y: 200 });
      const original = useStore.getState().devices[0];
      useStore.getState().duplicateDevice(original.id);
      const devices = useStore.getState().devices;
      expect(devices).toHaveLength(2);
      const copy = devices[1];
      expect(copy.id).not.toBe(original.id);
      expect(copy.type).toBe("access-point");
      expect(copy.position).toEqual({ x: 130, y: 230 });
      expect(copy.range).toBe(50);
      expect(copy.txPower).toBe(20);
    });

    it("appends ' (copy)' to name", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      const id = useStore.getState().devices[0].id;
      useStore.getState().duplicateDevice(id);
      expect(useStore.getState().devices[1].name).toBe("AP-1 (copy)");
    });

    it("auto-selects the duplicate", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      const id = useStore.getState().devices[0].id;
      useStore.getState().duplicateDevice(id);
      const copyId = useStore.getState().devices[1].id;
      expect(useStore.getState().selectedDeviceId).toBe(copyId);
    });

    it("no-ops for unknown id", () => {
      useStore.getState().addDevice("access-point", { x: 0, y: 0 });
      useStore.getState().duplicateDevice("nonexistent");
      expect(useStore.getState().devices).toHaveLength(1);
    });
  });
});
