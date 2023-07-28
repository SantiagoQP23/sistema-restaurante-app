import { PaymentMethod } from "../../../../models";


export interface CreateTransactionDto {
  description: string;
  amount: number;
  paymentMethod: PaymentMethod;
  responsibleId: string;
  cashRegisterId: string;
}