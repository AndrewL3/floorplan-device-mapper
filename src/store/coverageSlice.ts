import type { StateCreator } from 'zustand';

export interface CoverageState {
    grid: number[][] | null;
    gridResolutionPx: number;
    deadZones: Array<{ x: number; y: number; width: number; height: number}>;
}

export interface CoverageActions {

}

export type CoverageSlice = CoverageState & CoverageActions;

export const createCoverageSlice: StateCreator<CoverageSlice> = () => ({
    grid: null,
    gridResolutionPx: 8,
    deadZones:[],
});
