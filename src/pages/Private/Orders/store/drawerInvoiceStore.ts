import { create } from "zustand";
import { Invoice } from "../models/Invoice.model";



interface DrawerInvoiceState {

  activeInvoice: Invoice | null;

  open: boolean;

  setOpen: (open: boolean) => void;

  setActiveInvoice: (invoice: Invoice | null) => void;

  reset: () => void;

  handleOpenDrawer: () => void;

  handleCloseDrawer: () => void;
}



export const useDrawerInvoiceStore = create<DrawerInvoiceState>((set, get) => ({

  title: 'Drawer Invoice',

  activeInvoice: null,

  open: false,

  setOpen: (open: boolean) => set({ open }),

  setActiveInvoice: (activeInvoice: Invoice | null) => set({ activeInvoice }),

  reset: () => set({ activeInvoice: null }),

  handleOpenDrawer: () => set({ open: true }),

  handleCloseDrawer: () => set({ open: false, activeInvoice: null }),




}));