import { TypeTransaction } from "../models/cash-transaction.model";



export interface CreateCashTransactionDto {

  reason: string;

  responsible: string;

  type: TypeTransaction;

  amount: number;

  cashRegisterId: string;

} 