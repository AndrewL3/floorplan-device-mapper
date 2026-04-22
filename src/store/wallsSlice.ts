  import type { StateCreator } from 'zustand';
  import type { Wall, WallMaterial, Point } from '../types';                                                                         
  
  const ATTENUATION: Record<WallMaterial, number> = {                                                                                
    drywall: 3.5,                                                                                                                  
    glass: 2,                                                                                                                        
    concrete: 7,                                                                                                                   
    metal: 25,
  };                                                                                                                                 
  
  export interface WallsState {                                                                                                      
    walls: Wall[];                                                                                                                 
  }

  export interface WallsActions {                                                                                                    
    addWall: (start: Point, end: Point, material: WallMaterial) => void;
    removeWall: (id: string) => void;                                                                                                
  }                                                                                                                                
                                                                                                                                     
  export type WallsSlice = WallsState & WallsActions;
                                                                                                                                     
  export const createWallsSlice: StateCreator<WallsSlice> = (set) => ({                                                              
    walls: [],
                                                                                                                                     
    addWall: (start, end, material) =>                                                                         
      set((state) => ({
        walls: [
          ...state.walls,                                                                                                            
          {
            id: crypto.randomUUID(),                                                                                                 
            start,                                                                                             
            end,
            material,
            attenuationDb: ATTENUATION[material],
          },
        ],
      })),

    removeWall: (id) =>                                                                                                              
      set((state) => ({
        walls: state.walls.filter((w) => w.id !== id),                                                                               
      })),                                                                                                     
  });