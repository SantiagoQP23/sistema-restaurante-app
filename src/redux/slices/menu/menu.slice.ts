

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

import { ICategory, IProduct, ISection } from "../../../models";


export interface MenuState {
  sections: ISection[],
  categories: ICategory[],
  products: IProduct[],
  activeSection: ISection | null,
  activeCategory: ICategory | null,
  activeProduct: IProduct | null,
}

const initialState: MenuState = {
  sections: [],
  categories: [],
  products: [],
  activeSection: null,
  activeCategory: null,
  activeProduct: null
};

export const menuSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<ISection>) => {
      state.sections = [...state.sections, action.payload]
    },
    updateSection: (state, { payload }: PayloadAction<ISection>) => {
      state.sections = state.sections.map(
        p => (p.id === payload.id)
          ? payload
          : p
      )
      state.activeSection = payload

    },
    deleteSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter(
        p => p.id !== action.payload
      )
    },
    loadSections: (state, action: PayloadAction<ISection[]>) => {
      state.sections = action.payload
    },
    setActiveCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload
    },
    setActiveProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    setActiveSection: (state, action: PayloadAction<ISection>) => {
      state.activeSection = action.payload
    },
    resetSections: () => ({ ...initialState }),
    resetActiveSection: (state) => {
      state.activeSection = null
    },
    setActiveCategory: (state, action: PayloadAction<ICategory>) => {
      state.activeCategory = action.payload
    },
    resetCategories: () => ({ ...initialState }),
    resetActiveCategory: (state) => {
      state.activeCategory = null
    },
    setActiveProduct: (state, action: PayloadAction<IProduct>) => {
      state.activeProduct = action.payload
    },
    resetProducts: () => ({ ...initialState }),
    resetActiveProduct: (state) => {
      state.activeProduct = null
    }
  }

});


export const {
  addSection,
  deleteSection,
  loadSections,
  resetActiveCategory,
  resetActiveProduct,
  resetActiveSection,
  resetCategories,
  resetProducts,
  resetSections,
  setActiveCategories,
  setActiveCategory,
  setActiveProduct,
  setActiveProducts,
  setActiveSection,
  updateSection,
} = menuSlice.actions;

export const selectMenu = (state: RootState) => state.menu;

export default menuSlice.reducer;