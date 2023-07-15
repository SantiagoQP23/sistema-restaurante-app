import { restauranteApi } from "../../../../api";
import { CreateExpenseDto } from "../dto/create-expense.dto";
import { FilterExpensesDto } from "../dto/filters/filter-expenses.dto";
import { UpdateExpenseDto } from "../dto/update-expense.dto";
import { Expense } from "../models/expense.model";

export interface ExpensesResponse {
  expenses: Expense[];
  count: number;
}

export const getExpenses = async (filterDto: FilterExpensesDto): Promise<ExpensesResponse> => {

  const { limit=10, offset = 0, ...restFilter } = filterDto;

  const { data } = await restauranteApi.get<ExpensesResponse>("/expenses", {
    params: {
      ...restFilter,
      offset: limit * offset,
      limit
    }
  });

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



