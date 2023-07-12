import { restauranteApi } from "../../../../api";
import { CreateCashRegisterDto } from "../dto/create-cash-register.dto";
import { CashRegister } from "../models/cash-register.model";
import { Income } from '../models/income.model';
import { Expense } from '../models/expense.model';
import { Invoice } from '../../Orders/models/Invoice.model';

export interface ActiveCashRegister extends CashRegister {
  totalIncomes: number;
  totalExpenses: number;
  totalInvoices: number;
  totalIncomesCash: number;
  totalExpensesCash: number;
  totalInvoicesCash: number;
  totalIncomesTransfer: number;
  totalExpensesTransfer: number;
  totalInvoicesTransfer: number;
  balance: number;
}

export const getAllCashRegisters = async (): Promise<CashRegister[]> => {

  const { data } = await restauranteApi.get<CashRegister[]>(`/cash-register`);
  return data;

}



export const getCashRegister = async (term: string): Promise<CashRegister> => {

  const { data } = await restauranteApi.get(`/cash-register/${term}`);

  return data;

}

export const getCashRegisterActive = async (): Promise<ActiveCashRegister> => {

  const { data } = await restauranteApi.get<ActiveCashRegister>(`/cash-register/active`);

  return data;

}


export const createCashRegister = async (data: CreateCashRegisterDto): Promise<CashRegister> => {

  const response = await restauranteApi.post<CashRegister>(`/cash-register`, data);

  return response.data;

}