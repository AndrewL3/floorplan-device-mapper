import { describe, it, expect, beforeEach } from "vitest";
import { create } from "zustand";
import type { AppStore } from "./index";
import { createDevicesSlice } from "./devicesSlice";
import { createWallsSlice } from "./wallsSlice";
import { createUiSlice } from "./uiSlice";
import { createCoverageSlice } from "./coverageSlice";
import { createInteractionSlice } from "./interactionSlice";

function createTestStore() {
  return create<AppStore>()((...a) => ({
    ...createDevicesSlice(...a),
    ...createWallsSlice(...a),
    ...createUiSlice(...a),
    ...createCoverageSlice(...a),
    ...createInteractionSlice(...a),
  }));
}

describe("interactionSlice", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  describe("calibration", () => {
    it("stores first calibration point", () => {
      store.getState().addCalibrationPoint({ x: 10, y: 20 });
      expect(store.getState().calibrationPoints).toEqual([{ x: 10, y: 20 }]);
      expect(store.getState().showCalibrationInput).toBe(false);
    });

    it("stores second point and shows input", () => {
      store.getState().addCalibrationPoint({ x: 10, y: 20 });
      store.getState().addCalibrationPoint({ x: 110, y: 20 });
      expect(store.getState().calibrationPoints).toHaveLength(2);
      expect(store.getState().showCalibrationInput).toBe(true);
    });

    it("ignores third point", () => {
      store.getState().addCalibrationPoint({ x: 0, y: 0 });
      store.getState().addCalibrationPoint({ x: 100, y: 0 });
      store.getState().addCalibrationPoint({ x: 200, y: 0 });
      expect(store.getState().calibrationPoints).toHaveLength(2);
    });

    it("submits calibration and sets scale", () => {
      store.getState().addCalibrationPoint({ x: 0, y: 0 });
      store.getState().addCalibrationPoint({ x: 100, y: 0 });
      store.getState().submitCalibration(5);
      expect(store.getState().scale).toEqual({ pixelsPerMeter: 20 });
      expect(store.getState().activeTool).toBe("select");
      expect(store.getState().calibrationPoints).toEqual([]);
      expect(store.getState().showCalibrationInput).toBe(false);
    });

    it("rejects zero distance", () => {
      store.getState().addCalibrationPoint({ x: 0, y: 0 });
      store.getState().addCalibrationPoint({ x: 100, y: 0 });
      store.getState().submitCalibration(0);
      expect(store.getState().scale).toBeNull();
    });
  });

  describe("wall drawing", () => {
    it("stores first wall draw point", () => {
      store.getState().addWallDrawPoint({ x: 10, y: 20 });
      expect(store.getState().wallDrawStart).toEqual({ x: 10, y: 20 });
      expect(store.getState().walls).toHaveLength(0);
    });

    it("creates wall on second point and auto-continues", () => {
      store.getState().addWallDrawPoint({ x: 0, y: 0 });
      store.getState().addWallDrawPoint({ x: 100, y: 0 });
      expect(store.getState().walls).toHaveLength(1);
      expect(store.getState().walls[0].start).toEqual({ x: 0, y: 0 });
      expect(store.getState().walls[0].end).toEqual({ x: 100, y: 0 });
      expect(store.getState().wallDrawStart).toEqual({ x: 100, y: 0 });
    });

    it("uses active wall material", () => {
      store.getState().setActiveWallMaterial("concrete");
      store.getState().addWallDrawPoint({ x: 0, y: 0 });
      store.getState().addWallDrawPoint({ x: 100, y: 0 });
      expect(store.getState().walls[0].material).toBe("concrete");
    });

    it("chains multiple wall segments", () => {
      store.getState().addWallDrawPoint({ x: 0, y: 0 });
      store.getState().addWallDrawPoint({ x: 100, y: 0 });
      store.getState().addWallDrawPoint({ x: 100, y: 100 });
      expect(store.getState().walls).toHaveLength(2);
      expect(store.getState().walls[1].start).toEqual({ x: 100, y: 0 });
      expect(store.getState().walls[1].end).toEqual({ x: 100, y: 100 });
    });
  });

  describe("cancelInteraction", () => {
    it("clears partial wall state", () => {
      store.getState().addWallDrawPoint({ x: 10, y: 20 });
      store.getState().cancelInteraction();
      expect(store.getState().wallDrawStart).toBeNull();
    });

    it("clears partial calibration state", () => {
      store.getState().addCalibrationPoint({ x: 10, y: 20 });
      store.getState().cancelInteraction();
      expect(store.getState().calibrationPoints).toEqual([]);
    });
  });

  describe("resetInteraction", () => {
    it("clears all interaction state", () => {
      store.getState().addWallDrawPoint({ x: 10, y: 20 });
      store.getState().setWallDrawPreview({ x: 50, y: 50 });
      store.getState().resetInteraction();
      expect(store.getState().wallDrawStart).toBeNull();
      expect(store.getState().wallDrawPreview).toBeNull();
    });
  });
});
