
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IOrder, IOrderDetail } from "../../../models";
import { RootState } from "../../store";


export interface PedidosState {
  orders: IOrder[]
  orderActive: IOrder | null;
  date: string;
  detailActive: IOrderDetail | null;
}

const initialState: PedidosState = {
  orders: [],
  orderActive: null,
  date: '',
  detailActive: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {

    pedidoSetActive: (state, action: PayloadAction<IOrder>) => {
      state.orderActive = action.payload;
    },

    pedidoAddNew: (state, action: PayloadAction<IOrder>) => {
      state.orders = [...state.orders, action.payload]
    },

    pedidoUpdated: (state, action: PayloadAction<IOrder>) => {
      state.orders = state.orders.map(
        p => (p.id === action.payload.id)
          ? action.payload
          : p
      )
    },

    pedidoDeleted: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        p => p.id !== action.payload
      )
    },

    pedidoLoaded: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload
    },
    pedidoSetFecha: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
/* 
    pedidoUpdateTotal: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.map(
        p => (p.idPedido === state.orderActive?.idPedido)
          ? { ...p, total: action.payload }
          : p
      )
      state.orderActive = { ...state.orderActive!, total: action.payload }
    },


    pedidoUpdatedCliente: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.map(
        p => (p.idPedido === state.orderActive?.idPedido)
          ? { ...p, nombreCliente: action.payload }
          : p
      );
      state.orderActive = { ...state.orderActive!, nombreCliente: action.payload };
    },

    pedidoUpdatedEstado: (state, action: PayloadAction<boolean>) => {
      state.orders = state.orders.map(
        p => (p.idPedido === state.orderActive?.idPedido)
          ? { ...p, estado: action.payload }
          : p

      );
      state.orderActive = { ...state.orderActive!, estado: action.payload };
    },

    pedidoUpdatedNombreCliente: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.map(
        p => (p.idPedido === state.orderActive?.idPedido)
          ? { ...p, nombreCliente: action.payload }
          : p

      );
      state.orderActive = { ...state.orderActive!, nombreCliente: action.payload };

    },

    pedidoUpdateDetalles: (state, action: PayloadAction<IOrderDetail[]>) => {

      state.orders = state.orders.map(
        p => (p.idPedido === state.orderActive?.idPedido)
          ? { ...p, detalles: action.payload }
          : p
      )
      state.orderActive = { ...state.orderActive!, detalles: action.payload }
    },

    pedidoDetalleAddNew: (state, action: PayloadAction<IOrderDetail>) => {

      state.orders = state.orders.map(
        p => (p.idPedido === state.orderActive?.idPedido)
          ? { ...p, detalles: [...state.orderActive!.detalles, action.payload] }
          : p
      );

      state.orderActive = {
        ...state.orderActive!, detalles: [...state.orderActive!.detalles, action.payload]
      }
    },

    pedidoDetalleDeleted: (state, action: PayloadAction<number>) => {

      state.orders = state.orders.map(
        p => (p.idPedido === state.orderActive?.idPedido)
          ? {
            ...p, detalles: state.orderActive!.detalles.filter(
              d => d.idDetallePedido !== action.payload
            )
          }
          : p
      );

      state.orderActive = {
        ...state.orderActive!, detalles: state.orderActive!.detalles.filter(
          d => d.idDetallePedido !== action.payload
        )
      }

    },

    pedidoDetalleCantidad: (state, action: PayloadAction<number>) => {
      const detalles = state.orderActive!.detalles;
      const subtotal = state.detailActive!.producto.precio * action.payload;
      const cantidad = action.payload;
      state.orders = state.orders.map(
        p => (p.idPedido === state.orderActive?.idPedido)
          ? {
            ...p, detalles: detalles.map(
              d => d.idDetallePedido === state.detailActive!.idDetallePedido
                ? {
                  ...d,
                  cantidad,
                  subtotal
                } as IOrderDetail
                : d
            )
          }
          : p
      );

      state.orderActive = {
        ...state.orderActive!, detalles: detalles.map(
          d => d.idDetallePedido === state.detailActive!.idDetallePedido
            ? {
              ...d,
              cantidad,
              subtotal
            } as IOrderDetail
            : d
        )
      }

      state.detailActive = {
        ...state.detailActive!,
        cantidad,
        subtotal
      }

    },
    pedidodetailActive: (state, action: PayloadAction<IOrderDetail>) => {
      state.detailActive = action.payload;
    },








 */

  }

});
export const { 
  pedidoAddNew, 
  pedidoDeleted, 
  pedidoLoaded,
  pedidoSetActive, 
  pedidoUpdated, 
  pedidoSetFecha, 
  /* 
  pedidoUpdatedCliente,
  pedidoUpdatedEstado, 
  pedidoUpdatedNombreCliente, 
  pedidoUpdateTotal, pedidoUpdateDetalles,
  pedidoDetalleAddNew, pedidoDetalleDeleted, 
  pedidodetailActive, pedidoDetalleCantidad
 */
} = ordersSlice.actions;


export const selectOrders = (state: RootState) => state.orders;





export default ordersSlice.reducer;