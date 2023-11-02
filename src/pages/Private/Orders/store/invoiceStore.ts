import { IOrder, IOrderDetail } from "../../../../models";
import { CreateInvoiceDto } from "../dto";
import { PaymentMethod } from "../models/Invoice.model";

import { create } from "zustand";

export interface DraftInvoiceDetail {
  orderDetailPayable: OrderDetailPayable;
  quantity: number;
  invoiceId: number;
}

export interface AccountDetail {
  [key: string]: DraftInvoiceDetail;
}

export interface CreateInvoice {
  // details: AccountDetail;
  discount: number;
  id: number;
}

export interface OrderDetailPayable extends IOrderDetail {
  qtyToPay: number;
  qtyInAccounts: number;
}

interface InvoiceActions {
  setPayableDetails: (details: OrderDetailPayable[]) => void;
  addInvoice: () => void;

  removeInvoice: (id: number) => void;

  setPaymentMethod: (paymentMethod: PaymentMethod) => void;

  setDiscount: (discount: number) => void;

  setAmountPaid: (amountPaid: number) => void;

  setOrder: (order: IOrder) => void;

  reset: () => void;

  addDetail: (detail: OrderDetailPayable) => void;

  addDetailsToInvoice: (details: OrderDetailPayable[]) => void;

  updateDetail: (detail: OrderDetailPayable) => void;

  removeDetail: (orderDetailId: string) => void;

  getInvoice: () => CreateInvoiceDto;

  resetDetails: () => void;

  setStep: (step: number) => void;

  handleNextStep: () => void;

  handleBackStep: () => void;

  setActiveInvoice: (invoice: CreateInvoice | null) => void;
}

interface InvoiceState {
  invoices: CreateInvoice[];
  activeInvoice: CreateInvoice | null;
  order: IOrder | null;
  payableDetails: OrderDetailPayable[];
  accountDetails: AccountDetail;

  paymentMethod: PaymentMethod;
  discount: number;
  amountPaid: number;
  step: number;
  amount: number;
  total: number;
}

const initialState = {
  invoices: [],
  activeInvoice: null,
  accountDetails: {},
};

export const useInvoiceStore = create<InvoiceState & InvoiceActions>(
  (set, get) => ({
    title: "Invoices",
    accountDetails: {},
    payableDetails: [],

    order: null,
    paymentMethod: PaymentMethod.CASH,
    discount: 0,
    amountPaid: 0,
    step: 0,
    amount: 0,
    total: 0,
    invoices: [
      {
        details: [],
        discount: 0,
        id: 1,
      },
    ],
    activeInvoice: null,

    addInvoice: () => {
      const lastInvoice = get().invoices[get().invoices.length - 1];

      const invoice = {
        discount: 0,
        id: lastInvoice ? lastInvoice.id + 1 : 1,
      };

      set({
        invoices: [...get().invoices, invoice],
        activeInvoice: invoice,
      });
    },

    setPayableDetails: (details: OrderDetailPayable[]) => {
      set({ payableDetails: details });
    },

    removeInvoice: (id: number) => {
      // remove details from accountDetails

      Object.entries(get().accountDetails).map(([key, detail]) => {
        if (detail.invoiceId === id) {
          delete get().accountDetails[key];
        }

        let qtyInAccounts = 0;

        get().invoices.map((i) => {
          const det =
            get().accountDetails[`${i.id}-${detail.orderDetailPayable.id}`];

          if (det) {
            qtyInAccounts += det.quantity;
          }
        });

        set({
          payableDetails: get().payableDetails.map((pd) => {
            if (pd.id === detail.orderDetailPayable.id) {
              return {
                ...pd,
                qtyInAccounts,
              };
            }
            return pd;
          }),
        });
      });

      set({
        invoices: get().invoices.filter((invoice) => invoice.id !== id),
      });
    },

    setPaymentMethod: (paymentMethod: PaymentMethod) => set({ paymentMethod }),
    setDiscount: (discount: number) =>
      set({
        discount,
      }),
    setAmountPaid: (amountPaid: number) => set({ amountPaid }),

    setOrder: (order: IOrder) => set({ order }),

    addDetail: (detail: OrderDetailPayable) => {
      // const { details } = get();
      // const index = details.findIndex(
      //   (d) => d.orderDetail.id === detail.orderDetail.id
      // );
      // const invoice = get().activeInvoice;
      // if (index === -1) {
      //   // set({ details: [...details, detail] });
      //   if (invoice) {
      //     set({
      //       activeInvoice: {
      //         ...invoice,
      //         details: [...invoice.details, detail],
      //       },
      //     });
      //   }
      // } else {
      //   const newDetails = [...details];
      //   newDetails[index] = detail;
      //   // set({ details: newDetails });
      //   if (invoice) {
      //     // set({
      //     //   activeInvoice: {
      //     //     ...invoice,
      //     //     details: [...invoice.details, detail],
      //     //   },
      //     // });
      //   }
      // }
      // set({
      //   amount: get().amount + detail.orderDetail.price * detail.quantity,
      //   total: get().amount - get().discount,
      // });
    },
    addDetailsToInvoice: (details: OrderDetailPayable[]) => {
      const activeInvoice = get().activeInvoice;

      if (activeInvoice) {
        details.map((d) => {
          const draftDetail: DraftInvoiceDetail = {
            orderDetailPayable: d,
            quantity: d.qtyToPay,
            invoiceId: activeInvoice.id,
          };

          set({
            accountDetails: {
              ...get().accountDetails,
              [`${activeInvoice.id}-${d.id}`]: draftDetail,
            },
          });

          let qtyInAccounts = 0;

          get().invoices.map((i) => {
            const det = get().accountDetails[`${i.id}-${d.id}`];

            if (det) {
              qtyInAccounts += det.quantity;
            }
          });

          set({
            payableDetails: get().payableDetails.map((pd) => {
              if (pd.id === d.id) {
                return {
                  ...pd,
                  qtyToPay: 0,
                  qtyInAccounts,
                };
              }
              return pd;
            }),
          });
        });
      }

      // Calculate the qtyInAccounts

      // const invoice = get().activeInvoice;

      // if (invoice) {
      //   console.log("añadiendo", details);

      //   const orderDetailsDraft: DraftInvoiceDetail[] = details.map(
      //     (detail) => ({
      //       orderDetailPayable: detail,
      //       quantity: detail.quantity,
      //     })
      //   );

      //   const payableDetailsUpdated = get().payableDetails.map((d) => {
      //     const detail = orderDetailsDraft.find(
      //       (od) => od.orderDetailPayable.orderDetail.id === d.orderDetail.id
      //     );
      //     if (detail) {
      //       return {
      //         ...d,
      //         quantity: 0,
      //         qtyPaid: d.qtyPaid + detail.quantity,
      //       };
      //     }
      //     return d;
      //   });

      //   set({
      //     payableDetails: [...payableDetailsUpdated],
      //     activeInvoice: {
      //       ...invoice,
      //       details: [...invoice.details, ...orderDetailsDraft],
      //     },
      //     invoices: get().invoices.map((i) => {
      //       if (i.id === invoice.id) {
      //         return {
      //           ...invoice,
      //           details: [...invoice.details, ...orderDetailsDraft],
      //         };
      //       }
      //       return i;
      //     }),
      //   });
    },

    updateDetail: (detail: OrderDetailPayable) => {
      const { payableDetails } = get();
      const newDetails = [...payableDetails];
      const index = payableDetails.findIndex((d) => d.id === detail.id);
      newDetails[index] = detail;
      // console.log(newDetails)
      set({
        payableDetails: newDetails,
      });
    },

    removeDetail: (key: string) => {
      const detail = get().accountDetails[key];

      const { orderDetailPayable } = detail;

      if (detail) {
        set({
          payableDetails: get().payableDetails.map((d) => {
            if (d.id === orderDetailPayable.id) {
              return {
                ...d,
                qtyInAccounts: d.qtyInAccounts - detail.quantity,
              };
            }

            return d;
          }),
        });

        delete get().accountDetails[key];
      }

      // const { details } = get();
      // const detail = details.find((d) => d.orderDetail.id === orderDetailId)!;
      // set({
      //   details: details.filter((d) => d.orderDetail.id !== orderDetailId),
      //   amount: get().amount - detail.orderDetail.price * detail.quantity,
      //   total: get().amount - get().discount,
      // });
    },

    resetDetails: () =>
      set({ payableDetails: [], amount: 0, total: 0, discount: 0 }),

    setStep: (step: number) => set({ step }),

    handleNextStep: () => set({ step: get().step + 1 }),

    handleBackStep: () => set({ step: get().step - 1 }),

    setActiveInvoice: (invoice: CreateInvoice | null) =>
      set({ activeInvoice: invoice }),

    getInvoice: (): CreateInvoiceDto => {
      const { order } = get();
      return {
        orderId: order!.id,
        details: [],
        cashRegisterId: "",
      };
    },

    reset: () => {
      // set qtyInAccounts to 0

      set({
        payableDetails: get().payableDetails.map((pd) => {
          return {
            ...pd,
            qtyInAccounts: 0,
          };
        }),
      });

      set({ ...get(), ...initialState });
    },
  })
);
