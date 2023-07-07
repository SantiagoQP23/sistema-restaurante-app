import { restauranteApi } from "../../../../api";
import { CreateCashRegisterDto } from "../dto/create-cash-register.dto";
import { CashRegister } from "../models/cash-register.model";



export const getAllCashRegisters = async (): Promise<CashRegister[]> => {

  const { data } = await restauranteApi.get<CashRegister[]>(`/cash-register`);
  return data;

}



export const getCashRegister = async (term: string): Promise<CashRegister> => {

  const { data } = await restauranteApi.get(`/cash-register/${term}`);

  return data;

}

export const createCashRegister = async (data: CreateCashRegisterDto): Promise<CashRegister> => {

  const response = await restauranteApi.post<CashRegister>(`/cash-register`, data);

  return response.data;

}