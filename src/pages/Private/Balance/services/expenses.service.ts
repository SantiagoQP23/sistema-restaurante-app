import { restauranteApi } from "../../../../api";
import { CreateExpenseDto } from "../dto/create-expense.dto";
import { UpdateExpenseDto } from "../dto/update-expense.dto";
import { Expense } from "../models/expense.model";



export const getExpenses = async (): Promise<Expense[]> => {

  const { data } = await restauranteApi.get<Expense[]>("/expenses");

  return data;
}

export const createExpense = async (expense: CreateExpenseDto): Promise<Expense> => {

  const { data } = await restauranteApi.post<Expense>("/expenses", expense);

  return data;

}

export const updateExpense = async (expense: UpdateExpenseDto): Promise<Expense> => {

  const {id, ...expenseData} = expense;

  const { data } = await restauranteApi.patch<Expense>(`/expenses/${expense.id}`, expenseData);

  return data;

}

export const deleteExpense = async (id: number): Promise<void> => {

  await restauranteApi.delete<void>(`/expenses/${id}`);

}



