import { describe, it, expect, beforeEach } from "vitest";
import { create } from "zustand";
import { createWallsSlice, type WallsSlice } from "./wallsSlice";

function createTestStore() {
  return create<WallsSlice>()(createWallsSlice);
}

describe("wallsSlice", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it("starts with empty walls", () => {
    expect(store.getState().walls).toEqual([]);
  });

  it("adds a drywall wall with correct attenuation", () => {
    store.getState().addWall({ x: 0, y: 0 }, { x: 100, y: 0 }, "drywall");
    const walls = store.getState().walls;
    expect(walls).toHaveLength(1);
    expect(walls[0].start).toEqual({ x: 0, y: 0 });
    expect(walls[0].end).toEqual({ x: 100, y: 0 });
    expect(walls[0].material).toBe("drywall");
    expect(walls[0].attenuationDb).toBe(3.5);
    expect(walls[0].id).toBeTruthy();
  });

  it("adds a metal wall with correct attenuation", () => {
    store.getState().addWall({ x: 0, y: 0 }, { x: 50, y: 50 }, "metal");
    expect(store.getState().walls[0].attenuationDb).toBe(25);
  });

  it("adds a glass wall with correct attenuation", () => {
    store.getState().addWall({ x: 0, y: 0 }, { x: 50, y: 50 }, "glass");
    expect(store.getState().walls[0].attenuationDb).toBe(2);
  });

  it("adds a concrete wall with correct attenuation", () => {
    store.getState().addWall({ x: 0, y: 0 }, { x: 50, y: 50 }, "concrete");
    expect(store.getState().walls[0].attenuationDb).toBe(7);
  });

  it("removes a wall by id", () => {
    store.getState().addWall({ x: 0, y: 0 }, { x: 100, y: 0 }, "drywall");
    const id = store.getState().walls[0].id;
    store.getState().removeWall(id);
    expect(store.getState().walls).toEqual([]);
  });

  it("does not remove other walls", () => {
    store.getState().addWall({ x: 0, y: 0 }, { x: 100, y: 0 }, "drywall");
    store.getState().addWall({ x: 0, y: 0 }, { x: 0, y: 100 }, "glass");
    const firstId = store.getState().walls[0].id;
    store.getState().removeWall(firstId);
    expect(store.getState().walls).toHaveLength(1);
    expect(store.getState().walls[0].material).toBe("glass");
  });
});
