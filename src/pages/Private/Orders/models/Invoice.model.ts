import { IClient, IUser } from "../../../../models";
import { InvoiceDetail } from "./invoice-detail.model";


export enum PaymentMethod {
  CASH = 'CASH',
  // CARD = 'CARD',
  TRANSFER = 'TRANSFER',
}

export interface Invoice {

  id: string;

  transactionNumber: string;

  paymentMethod: PaymentMethod;

  amount: number;

  discount: number;

  total: number;

  client: IClient;

  createdAt: Date;

  updatedAt: Date;

  details: InvoiceDetail[];

  isActive: boolean;
  user: IUser


}