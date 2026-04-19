import type { StateCreator } from 'zustand';
import type { Device } from '../types';

export interface DevicesState {
    devices: Device[];
}

export interface DevicesActions {

}

export type DevicesSlice = DevicesState & DevicesActions;

export const createDevicesSlice: StateCreator<DevicesSlice> = () => ({
    devices: [],
});