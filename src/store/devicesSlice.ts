import type { StateCreator } from "zustand";
import type { Device, DeviceType, Point } from "../types";

const DEVICE_DEFAULTS: Record<
  DeviceType,
  { prefix: string; range: number; txPower: number }
> = {
  "access-point": { prefix: "AP", range: 50, txPower: 20 },
  camera: { prefix: "Camera", range: 30, txPower: 15 },
  sensor: { prefix: "Sensor", range: 20, txPower: 10 },
};

export interface DevicesState {
  devices: Device[];
}

export interface DevicesActions {
  addDevice: (type: DeviceType, position: Point) => void;
}

export type DevicesSlice = DevicesState & DevicesActions;

export const createDevicesSlice: StateCreator<DevicesSlice> = (set, get) => ({
  devices: [],

  addDevice: (type, position) => {
    const { devices } = get();
    const defaults = DEVICE_DEFAULTS[type];
    const count = devices.filter((d) => d.type === type).length + 1;
    set({
      devices: [
        ...devices,
        {
          id: crypto.randomUUID(),
          type,
          name: `${defaults.prefix}-${count}`,
          position,
          range: defaults.range,
          txPower: defaults.txPower,
        },
      ],
    });
  },
});
