import type { StateCreator } from "zustand";
import type { Point } from "../types";
import type { AppStore } from "./index";
import { distance } from "../utils/geometry";

export interface InteractionState {
  calibrationPoints: Point[];
  calibrationPreview: Point | null;
  showCalibrationInput: boolean;
  wallDrawStart: Point | null;
  wallDrawPreview: Point | null;
}

export interface InteractionActions {
  addCalibrationPoint: (p: Point) => void;
  setCalibrationPreview: (p: Point | null) => void;
  submitCalibration: (distanceMeters: number) => void;
  addWallDrawPoint: (p: Point) => void;
  setWallDrawPreview: (p: Point | null) => void;
  cancelInteraction: () => void;
  resetInteraction: () => void;
}

export type InteractionSlice = InteractionState & InteractionActions;

const INITIAL_STATE: InteractionState = {
  calibrationPoints: [],
  calibrationPreview: null,
  showCalibrationInput: false,
  wallDrawStart: null,
  wallDrawPreview: null,
};

export const createInteractionSlice: StateCreator<
  AppStore,
  [],
  [],
  InteractionSlice
> = (set, get) => ({
  ...INITIAL_STATE,

  addCalibrationPoint: (p) => {
    const { calibrationPoints } = get();
    if (calibrationPoints.length === 0) {
      set({ calibrationPoints: [p], calibrationPreview: null });
    } else if (calibrationPoints.length === 1) {
      set({
        calibrationPoints: [calibrationPoints[0], p],
        calibrationPreview: null,
        showCalibrationInput: true,
      });
    }
  },

  setCalibrationPreview: (calibrationPreview) => set({ calibrationPreview }),

  submitCalibration: (distanceMeters) => {
    const { calibrationPoints, setScale, setActiveTool } = get();
    if (calibrationPoints.length !== 2 || distanceMeters <= 0) return;
    const pixelDistance = distance(calibrationPoints[0], calibrationPoints[1]);
    const pixelsPerMeter = pixelDistance / distanceMeters;
    setScale({ pixelsPerMeter });
    setActiveTool("select");
    set(INITIAL_STATE);
  },

  addWallDrawPoint: (p) => {
    const { wallDrawStart, activeWallMaterial, addWall } = get();
    if (wallDrawStart === null) {
      set({ wallDrawStart: p, wallDrawPreview: null });
    } else {
      addWall(wallDrawStart, p, activeWallMaterial);
      set({ wallDrawStart: p, wallDrawPreview: null });
    }
  },

  setWallDrawPreview: (wallDrawPreview) => set({ wallDrawPreview }),

  cancelInteraction: () => set(INITIAL_STATE),

  resetInteraction: () => set(INITIAL_STATE),
});
