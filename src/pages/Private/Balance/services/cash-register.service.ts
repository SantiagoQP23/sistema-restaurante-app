import { restauranteApi } from "../../../../api";
import { CreateCashRegisterDto } from "../dto/create-cash-register.dto";
import { CashRegister } from "../models/cash-register.model";
import { Income } from '../models/income.model';
import { Expense } from '../models/expense.model';
import { Invoice } from '../../Orders/models/Invoice.model';
import { UpdateCashRegisterDto } from "../dto/update-cash-register.dto";
import { DateFiltePaginationDto } from "../../Common/dto";

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

export interface CashRegistersResponse {
  cashRegisters: CashRegister[];
  count: number
}

export const getAllCashRegisters = async (filterDto: DateFiltePaginationDto): Promise<CashRegistersResponse> => {

  const {offset = 0, limit = 5, startDate, endDate} = filterDto;

  const { data } = await restauranteApi.get<CashRegistersResponse>(`/cash-register`, {
    params: {
      startDate: filterDto.startDate,
      endDate: filterDto.endDate,
      offset: offset * limit,
      limit: filterDto.limit,
      period: filterDto.period

    }
  });
  return data;

}



export const getCashRegister = async (term: string): Promise<ActiveCashRegister> => {

  const { data } = await restauranteApi.get<ActiveCashRegister>(`/cash-register/${term}`);

  return data;

}

export const getCashRegisterActive = async (): Promise<ActiveCashRegister> => {

  const { data } = await restauranteApi.get<ActiveCashRegister>(`/cash-register/active`);

  return data;

}

export const createCashRegister = async (data: CreateCashRegisterDto): Promise<ActiveCashRegister> => {

  const response = await restauranteApi.post<ActiveCashRegister>(`/cash-register`, data);

  return response.data;

}

export const updateCashRegister = async (updateCash: UpdateCashRegisterDto): Promise<CashRegister> => {

  const {id, ...data} = updateCash;

  const response = await restauranteApi.patch<CashRegister>(`/cash-register/${id}`, data);

  return response.data;

}