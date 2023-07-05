import { restauranteApi } from "../../../../api";
import { CreateIncomeDto } from "../dto/create-income.dto";
import { UpdateIncomeDto } from "../dto/update-income.dto";
import { Income } from "../models/income.model";



export const getIncomes = async (): Promise<Income[]> => {

  const { data } = await restauranteApi.get<Income[]>("/incomes");

  return data;
}

export const createIncome = async (income: CreateIncomeDto): Promise<Income> => {

  const { data } = await restauranteApi.post<Income>("/incomes", income);

  return data;

}

export const updateIncome = async (income: UpdateIncomeDto): Promise<Income> => {

  const {id, ...incomeDto} = income;

  const { data } = await restauranteApi.patch<Income>(`/incomes/${id}`, incomeDto);

  return data;

}

export const deleteIncome= async (id: number): Promise<void> => {

  await restauranteApi.delete<void>(`/Income/${id}`);

}



