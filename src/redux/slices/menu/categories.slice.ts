

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../../models";
import { RootState } from "../../store";


export interface CategoriasState {
  categories: ICategory[];
  activeCategory: ICategory | null;
}

const initialState: CategoriasState = {
  categories: [],
  activeCategory: null
};

export const categoriesSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories = [...state.categories, action.payload]
    },
    updatedCategory: (state, action: PayloadAction<ICategory>) =>{
      state.categories = state.categories.map(
        c => (c.id === action.payload.id) 
        ? action.payload
        : c 
      )
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        c => c.id !== action.payload
      )
    },
    loadCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload
    },
    setActiveCategory: (state, action: PayloadAction<ICategory>) => {
      state.activeCategory = action.payload
    }

  }

});


export const {
  addCategory, 
  deleteCategory, 
  loadCategories, 
  updatedCategory,
  setActiveCategory
} = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories;



export default categoriesSlice.reducer;