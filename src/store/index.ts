import { create } from 'zustand';
import { createDevicesSlice, type DevicesSlice } from './devicesSlice';
import { createWallsSlice, type WallsSlice } from './wallsSlice';
import { createUiSlice, type UiSlice } from './uiSlice';
import { createCoverageSlice, type CoverageSlice } from './coverageSlice';

export type AppStore = DevicesSlice & WallsSlice & UiSlice & CoverageSlice;

export const useStore = create<AppStore>()((...a) => ({
    ...createDevicesSlice(...a),
    ...createWallsSlice(...a),
    ...createUiSlice(...a),
    ...createCoverageSlice(...a),
}));