



import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../models";
import { RootState } from "../../store";


export interface ProductsState {
  products: IProduct[];
  productoActivo: IProduct | null;
}

const initialState: ProductsState = {
  products: [],
  productoActivo: null
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = [...state.products, action.payload]
    },
    updateProduct: (state, action: PayloadAction<IProduct>) =>{
      state.products = state.products.map(
        p => (p.id === action.payload.id) 
        ? action.payload
        : p 
      )
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        p => p.id !== action.payload
      )
    },
    loadProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    setActiveProduct: (state, action: PayloadAction<IProduct>) => {
      state.productoActivo = action.payload
    }

  }

});

export const {
  addProduct, 
  deleteProduct, 
  loadProducts,
  updateProduct
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;


export default productsSlice.reducer;