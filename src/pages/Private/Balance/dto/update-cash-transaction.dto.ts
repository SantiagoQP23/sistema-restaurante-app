import { TypeTransaction } from "../models/cash-transaction.model";


export interface UpdateCashTransactionDto {
  id: string;
  amount?: number;

  reason?: string;

  responsible?: string;

  type?: TypeTransaction;

  cashRegisterId?: string;



}
