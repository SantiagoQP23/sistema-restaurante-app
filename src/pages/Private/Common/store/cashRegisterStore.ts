import { create } from "zustand";
import { CashRegister } from "../../Balance/models/cash-register.model";
import { ActiveCashRegister } from "../../Balance/services/cash-register.service";




interface CashRegisterState {

  activeCashRegister: ActiveCashRegister | null;
  setActiveCashRegister: (activeCashRegister: ActiveCashRegister | null) => void;

  isOpenCreate: boolean;

  setOpenCreate: (open: boolean) => void;

  openCreate: () => void;

  closeCreate: () => void;

  


  



}


export const useCashRegisterStore = create<CashRegisterState>((set, get) => ({
  title: 'Cash Register',
  activeCashRegister: null,
  setActiveCashRegister: (activeCashRegister: ActiveCashRegister | null) => set({ activeCashRegister }),
  isOpenCreate: false,

  setOpenCreate: (open: boolean) => set({ isOpenCreate: open }),

  closeCreate: () => set({ isOpenCreate: false }),

  openCreate: () => set({ isOpenCreate: true }),

}));
