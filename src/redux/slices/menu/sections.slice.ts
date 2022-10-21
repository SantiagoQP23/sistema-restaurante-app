

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISection } from "../../../models";
import { RootState } from "../../store";



export interface SectionsState {
  sections: ISection[],
  seccionActiva: ISection | null,
}

const initialState: SectionsState = {
  sections: [],
  seccionActiva: null
};

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    seccionAddNew: (state, action: PayloadAction<ISection>) => {
      state.sections = [...state.sections, action.payload]
    },
    seccionUpdated: (state, action: PayloadAction<ISection>) =>{
      state.sections = state.sections.map(
        p => (p.id === action.payload.id) 
        ? action.payload
        : p 
      )
    },
    seccionDeleted: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter(
        p => p.id !== action.payload
      )
    },
    seccionLoaded: (state, action: PayloadAction<ISection[]>) => {
      state.sections = action.payload
    },
    seccionSetActive: (state, action: PayloadAction<ISection>) => {
      state.seccionActiva = action.payload
    }
  }

});


export const {
  seccionDeleted, 
  seccionLoaded, 
  seccionUpdated, 
  seccionAddNew,
  seccionSetActive
} = sectionsSlice.actions;

export const selectSections = (state: RootState) => state.sections;

export default sectionsSlice.reducer;