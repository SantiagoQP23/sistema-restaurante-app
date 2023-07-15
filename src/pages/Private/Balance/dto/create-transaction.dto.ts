import { PaymentMethod } from "../../../../models";


export interface CreateTransactionDto {
  description: string;
  amount: number;
  paymentMethod: PaymentMethod;
  responsible: string;
  cashRegisterId: string;
}