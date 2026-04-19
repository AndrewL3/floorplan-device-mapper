import type { StateCreator } from 'zustand';
import type { Wall } from '../types';

export interface WallsState {
    walls: Wall[];
}

export interface WallsActions {

}

export type WallsSlice = WallsState & WallsActions;

export const createWallsSlice: StateCreator<WallsSlice> = () => ({
    walls: [],
});
