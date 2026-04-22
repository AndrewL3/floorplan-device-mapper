import type { StateCreator } from "zustand";
import type { Tool, WallMaterial, Scale } from "../types";

export interface UiState {
  activeTool: Tool;
  selectedDeviceId: string | null;
  activeWallMaterial: WallMaterial;
  floorplan: {
    objectUrl: string;
    filename: string;
    width: number;
    height: number;
  } | null;
  scale: Scale | null;
  zoom: number;
  pan: { x: number; y: number };
}

export interface UiActions {
  setFloorplan: (floorplan: UiState["floorplan"]) => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  fitToView: (stageWidth: number, stageHeight: number) => void;
  setActiveTool: (tool: Tool) => void;
  setActiveWallMaterial: (material: WallMaterial) => void;
  setScale: (scale: Scale) => void;
  setSelectedDeviceId: (id: string | null) => void;
}
export type UiSlice = UiState & UiActions;

export const createUiSlice: StateCreator<UiSlice> = (set, get) => ({
  activeTool: "select",
  selectedDeviceId: null,
  activeWallMaterial: "drywall",
  floorplan: null,
  scale: null,
  zoom: 1,
  pan: { x: 0, y: 0 },

  setFloorplan: (floorplan) => set({ floorplan }),
  setZoom: (zoom) => set({ zoom }),
  setPan: (pan) => set({ pan }),
  fitToView: (stageWidth, stageHeight) => {
    const { floorplan } = get();
    if (!floorplan) return;
    const padding = 32;
    if (stageWidth <= padding * 2 || stageHeight <= padding * 2) return;
    const availableWidth = stageWidth - padding * 2;
    const availableHeight = stageHeight - padding * 2;
    const scaleX = availableWidth / floorplan.width;
    const scaleY = availableHeight / floorplan.height;
    const zoom = Math.min(scaleX, scaleY);
    const pan = {
      x: (stageWidth - floorplan.width * zoom) / 2,
      y: (stageHeight - floorplan.height * zoom) / 2,
    };
    set({ zoom, pan });
  },
  setActiveTool: (activeTool) => set({ activeTool }),
  setActiveWallMaterial: (activeWallMaterial) => set({ activeWallMaterial }),
  setScale: (scale) => set({ scale }),
  setSelectedDeviceId: (selectedDeviceId) => set({ selectedDeviceId }),
});
