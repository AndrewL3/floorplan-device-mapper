import type { StateCreator } from "zustand";
import type { Tool, WallMaterial, Scale } from '../types';

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

}

export type UiSlice = UiState & UiActions;

export const createUiSlice: StateCreator<UiSlice> = () => ({
    activeTool: 'select',
    selectedDeviceId: null,
    activeWallMaterial: 'drywall',
    floorplan: null,
    scale: null,
    zoom: 1,
    pan: { x:0, y:0 },
});