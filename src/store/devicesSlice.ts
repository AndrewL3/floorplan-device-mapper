import type { StateCreator } from "zustand";
import type { Device, DeviceType, Point } from "../types";
import type { AppStore } from "./index";

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
  updateDevice: (
    id: string,
    updates: Partial<Pick<Device, "name" | "position" | "range" | "txPower">>,
  ) => void;
  removeDevice: (id: string) => void;
  duplicateDevice: (id: string) => void;
}

export type DevicesSlice = DevicesState & DevicesActions;

export const createDevicesSlice: StateCreator<
  AppStore,
  [],
  [],
  DevicesSlice
> = (set, get) => ({
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

  updateDevice: (id, updates) => {
    set({
      devices: get().devices.map((d) =>
        d.id === id ? { ...d, ...updates } : d,
      ),
    });
  },

  removeDevice: (id) => {
    set({ devices: get().devices.filter((d) => d.id !== id) });
    if (get().selectedDeviceId === id) {
      get().setSelectedDeviceId(null);
    }
  },

  duplicateDevice: (id) => {
    const source = get().devices.find((d) => d.id === id);
    if (!source) return;
    const newId = crypto.randomUUID();
    set({
      devices: [
        ...get().devices,
        {
          ...source,
          id: newId,
          name: `${source.name} (copy)`,
          position: { x: source.position.x + 30, y: source.position.y + 30 },
        },
      ],
    });
    get().setSelectedDeviceId(newId);
  },
});
