

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISection } from "../../../models";
import { RootState } from "../../store";



export interface SectionsState {
  sections: ISection[],
  activeSection: ISection | null,
}

const initialState: SectionsState = {
  sections: [],
  activeSection: null
};

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<ISection>) => {
      state.sections = [...state.sections, action.payload]
    },
    updateSection: (state, action: PayloadAction<ISection>) =>{
      state.sections = state.sections.map(
        p => (p.id === action.payload.id) 
        ? action.payload
        : p 
      )
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter(
        p => p.id !== action.payload
      )
    },
    loadSections: (state, action: PayloadAction<ISection[]>) => {
      state.sections = action.payload
    },
    setActiveSection: (state, action: PayloadAction<ISection>) => {
      state.activeSection = action.payload
    },
    reset: () => ({ ...initialState }),
  }

});


export const {
  addSection,
  deleteSection, 
  loadSections, 
  setActiveSection,
  updateSection, 
} = sectionsSlice.actions;

export const selectSections = (state: RootState) => state.sections;

export default sectionsSlice.reducer;