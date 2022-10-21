

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../../models";
import { RootState } from "../../store";


export interface CategoriasState {
  categories: ICategory[];
  categoriaActiva: ICategory | null;
}

const initialState: CategoriasState = {
  categories: [],
  categoriaActiva: null
};

export const categoriesSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    categoriaAddNew: (state, action: PayloadAction<ICategory>) => {
      state.categories = [...state.categories, action.payload]
    },
    categoriaUpdated: (state, action: PayloadAction<ICategory>) =>{
      state.categories = state.categories.map(
        c => (c.id === action.payload.id) 
        ? action.payload
        : c 
      )
    },
    categoriaDeleted: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        c => c.id !== action.payload
      )
    },
    categoriaLoaded: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload
    },
    categoriaSetActive: (state, action: PayloadAction<ICategory>) => {
      state.categoriaActiva = action.payload
    }

  }

});


export const {
  categoriaAddNew, 
  categoriaDeleted, 
  categoriaLoaded, 
  categoriaUpdated,
  categoriaSetActive
} = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories;



export default categoriesSlice.reducer;