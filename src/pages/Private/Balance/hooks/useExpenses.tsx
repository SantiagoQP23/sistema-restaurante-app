import { useMutation, useQuery } from "@tanstack/react-query";
import { createExpense, getExpenses, updateExpense } from "../services/expenses.service";
import { useSnackbar } from "notistack";
import { CreateExpenseDto } from "../dto/create-expense.dto";
import { Expense } from "../models/expense.model";
import { UpdateExpenseDto } from "../dto/update-expense.dto";
import { queryClient } from "../../../../main";




export const useExpenses = () => {


  const expensesQuery = useQuery(["expenses"], getExpenses, {
    onSuccess: (data) => {
      console.log(data);
    }
  });

  return {
    expensesQuery
  }

}

export const useCreateExpense = () => {

  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Expense, unknown, CreateExpenseDto>(createExpense, {

    onSuccess: () => {
      enqueueSnackbar('Gasto creado correctamente', { variant: 'success' });
      queryClient.invalidateQueries(['expenses']);

      queryClient.invalidateQueries(['cashRegisterActive']);


    },
    onError: () => {
      console.log('onError')
      enqueueSnackbar('Error al crear el gasto', { variant: 'error' })

    }

  })




}


export const useUpdateExpense = () => {

  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Expense, unknown, UpdateExpenseDto>(updateExpense, {

    onSuccess: () => {
      enqueueSnackbar('Gasto actualizado correctamente', { variant: 'success' })
      queryClient.invalidateQueries(['expenses']);

      queryClient.invalidateQueries(['cashRegisterActive']);


    },
    onError: () => {
      console.log('onError')
      enqueueSnackbar('Error al actualizar el gasto', { variant: 'error' })

    }

  })

}