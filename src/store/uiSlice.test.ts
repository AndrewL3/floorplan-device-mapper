import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "./index";

describe("uiSlice", () => {
  beforeEach(() => {
    useStore.setState({
      zoom: 1,
      pan: { x: 0, y: 0 },
      floorplan: null,
    });
  });

  describe("fitToView", () => {
    it("does nothing when no floorplan is loaded", () => {
      useStore.getState().fitToView(800, 600);
      expect(useStore.getState().zoom).toBe(1);
      expect(useStore.getState().pan).toEqual({ x: 0, y: 0 });
    });

    it("does nothing when stage is too small for padding", () => {
      useStore.getState().setFloorplan({
        objectUrl: "blob:test",
        filename: "floor.png",
        width: 2000,
        height: 1000,
      });
      useStore.getState().fitToView(0, 0);
      expect(useStore.getState().zoom).toBe(1);
      expect(useStore.getState().pan).toEqual({ x: 0, y: 0 });
    });

    it("fits a width-constrained image", () => {
      useStore.getState().setFloorplan({
        objectUrl: "blob:test",
        filename: "floor.png",
        width: 2000,
        height: 1000,
      });
      useStore.getState().fitToView(800, 600);

      const { zoom, pan } = useStore.getState();
      expect(zoom).toBeCloseTo(0.368);
      expect(pan.x).toBeCloseTo(32);
      expect(pan.y).toBeCloseTo(116);
    });

    it("fits a height-constrained image", () => {
      useStore.getState().setFloorplan({
        objectUrl: "blob:test",
        filename: "floor.png",
        width: 500,
        height: 2000,
      });
      useStore.getState().fitToView(800, 600);

      const { zoom, pan } = useStore.getState();
      expect(zoom).toBeCloseTo(0.268);
      expect(pan.x).toBeCloseTo(333);
      expect(pan.y).toBeCloseTo(32);
    });

    it("centers a small image without upscaling past fit", () => {
      useStore.getState().setFloorplan({
        objectUrl: "blob:test",
        filename: "small.png",
        width: 200,
        height: 100,
      });
      useStore.getState().fitToView(800, 600);

      const { zoom } = useStore.getState();
      expect(zoom).toBeCloseTo(3.68);
    });
  });

  describe("setFloorplan", () => {
    it("stores floorplan data", () => {
      const fp = {
        objectUrl: "blob:x",
        filename: "a.png",
        width: 100,
        height: 200,
      };
      useStore.getState().setFloorplan(fp);
      expect(useStore.getState().floorplan).toEqual(fp);
    });

    it("clears floorplan with null", () => {
      useStore
        .getState()
        .setFloorplan({
          objectUrl: "blob:x",
          filename: "a.png",
          width: 100,
          height: 200,
        });
      useStore.getState().setFloorplan(null);
      expect(useStore.getState().floorplan).toBeNull();
    });
  });

  describe("setZoom / setPan", () => {
    it("updates zoom", () => {
      useStore.getState().setZoom(2.5);
      expect(useStore.getState().zoom).toBe(2.5);
    });

    it("updates pan", () => {
      useStore.getState().setPan({ x: 100, y: -50 });
      expect(useStore.getState().pan).toEqual({ x: 100, y: -50 });
    });
  });
});
