import { configureStore , ThunkAction, Action} from '@reduxjs/toolkit';

import { authSlice } from './slices/auth';
import { sectionsSlice,categoriesSlice, productsSlice,  } from './slices/menu';
import { detailsSlice, ordersSlice } from './slices/orders';



export interface IAppStore {
  
}


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sections: sectionsSlice.reducer,
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    orders: ordersSlice.reducer,
    details: detailsSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
