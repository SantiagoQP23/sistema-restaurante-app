
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IOrder, IOrderDetail } from "../../../models";
import { RootState } from "../../store";


export interface PedidosState {
  orders: IOrder[]
  activeOrder: IOrder | null;
  date: string;
  detailActive: IOrderDetail | null;
  
}

const initialState: PedidosState = {
  orders: [],
  activeOrder: null,
  date: '',
  detailActive: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {

    setActiveOrder: (state, action: PayloadAction<IOrder | null >) => {
      state.activeOrder = action.payload;
    },

    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders = [...state.orders, action.payload]
    },

    updateOrder: (state, {payload}: PayloadAction<IOrder>) => {
      state.orders = state.orders.map(
        p => (p.id === payload.id)
          ? payload
          : p
      )
      if(state.activeOrder?.id === payload.id){
        state.activeOrder = payload;
      }

    },

    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        p => p.id !== action.payload
      )
    },

    loadOrders: (state, action: PayloadAction<IOrder[]>) => {

      // sort by date
      action.payload.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        return 0;
      });


      state.orders = action.payload
    },
    setDateOrders: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    resetOrders: () => ({ ...initialState }),
    resetActiveOrder: (state) => {
      state.activeOrder = null
    },
/* 
    pedidoUpdateTotal: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.map(
        p => (p.idPedido === state.activeOrder?.idPedido)
          ? { ...p, total: action.payload }
          : p
      )
      state.activeOrder = { ...state.activeOrder!, total: action.payload }
    },


    pedidoUpdatedCliente: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.map(
        p => (p.idPedido === state.activeOrder?.idPedido)
          ? { ...p, nombreCliente: action.payload }
          : p
      );
      state.activeOrder = { ...state.activeOrder!, nombreCliente: action.payload };
    },

    pedidoUpdatedEstado: (state, action: PayloadAction<boolean>) => {
      state.orders = state.orders.map(
        p => (p.idPedido === state.activeOrder?.idPedido)
          ? { ...p, estado: action.payload }
          : p

      );
      state.activeOrder = { ...state.activeOrder!, estado: action.payload };
    },

    pedidoUpdatedNombreCliente: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.map(
        p => (p.idPedido === state.activeOrder?.idPedido)
          ? { ...p, nombreCliente: action.payload }
          : p

      );
      state.activeOrder = { ...state.activeOrder!, nombreCliente: action.payload };

    },

    pedidoUpdateDetalles: (state, action: PayloadAction<IOrderDetail[]>) => {

      state.orders = state.orders.map(
        p => (p.idPedido === state.activeOrder?.idPedido)
          ? { ...p, detalles: action.payload }
          : p
      )
      state.activeOrder = { ...state.activeOrder!, detalles: action.payload }
    },

    pedidoDetalleAddNew: (state, action: PayloadAction<IOrderDetail>) => {

      state.orders = state.orders.map(
        p => (p.idPedido === state.activeOrder?.idPedido)
          ? { ...p, detalles: [...state.activeOrder!.detalles, action.payload] }
          : p
      );

      state.activeOrder = {
        ...state.activeOrder!, detalles: [...state.activeOrder!.detalles, action.payload]
      }
    },

    pedidoDetalleDeleted: (state, action: PayloadAction<number>) => {

      state.orders = state.orders.map(
        p => (p.idPedido === state.activeOrder?.idPedido)
          ? {
            ...p, detalles: state.activeOrder!.detalles.filter(
              d => d.idDetallePedido !== action.payload
            )
          }
          : p
      );

      state.activeOrder = {
        ...state.activeOrder!, detalles: state.activeOrder!.detalles.filter(
          d => d.idDetallePedido !== action.payload
        )
      }

    },

    pedidoDetalleCantidad: (state, action: PayloadAction<number>) => {
      const detalles = state.activeOrder!.detalles;
      const subtotal = state.detailActive!.producto.precio * action.payload;
      const cantidad = action.payload;
      state.orders = state.orders.map(
        p => (p.idPedido === state.activeOrder?.idPedido)
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

      state.activeOrder = {
        ...state.activeOrder!, detalles: detalles.map(
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
  setActiveOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  loadOrders,
  setDateOrders,
  resetOrders,
  resetActiveOrder,
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