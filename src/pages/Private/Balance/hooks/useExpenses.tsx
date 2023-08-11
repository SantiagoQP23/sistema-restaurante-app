import {useEffect} from 'react';

import { useMutation, useQuery } from "@tanstack/react-query";
import { createExpense, deleteExpense, getExpenses, updateExpense } from "../services/expenses.service";
import { useSnackbar } from "notistack";
import { CreateExpenseDto } from "../dto/create-expense.dto";
import { Expense } from "../models/expense.model";
import { UpdateExpenseDto } from "../dto/update-expense.dto";
import { queryClient } from "../../../../main";
import { useFilterExpenses } from "./useFilterExpenses";




export const useExpenses = () => {

  const filter = useFilterExpenses();

  const expensesQuery = useQuery(["expenses"], () => getExpenses ({

    offset: filter.page,
    limit: filter.rowsPerPage,
    startDate: filter.startDate,
    endDate: filter.endDate,
    period: filter.period,
    cashRegisterId: filter.cashRegister ? filter.cashRegister.id : undefined,
    userId: filter.user ? filter.user.id : undefined,

  }), {
    onSuccess: (data) => {
      console.log(data);
    }
  });


  useEffect(() => {
    expensesQuery.refetch();
    filter.resetPage();

  }, [filter.startDate, filter.endDate, filter.period, filter.cashRegister, filter.user, filter.rowsPerPage]);


  useEffect(() => {

    expensesQuery.refetch();

  }, [filter.page])




  return {
    expensesQuery, 
    ...filter
  }

}

export const useCreateExpense = () => {

  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Expense, unknown, CreateExpenseDto>(createExpense, {

    onSuccess: () => {
      enqueueSnackbar('Gasto creado correctamente', { variant: 'success' });
      queryClient.invalidateQueries({queryKey: ['cashRegisterActive']});
      queryClient.invalidateQueries(['expenses']);



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



export const useDeleteExpense = (id: string) => {
  
    const { enqueueSnackbar } = useSnackbar();
  
    return useMutation(() => deleteExpense(id), {
  
      onSuccess: () => {
        enqueueSnackbar('Gasto eliminado correctamente', { variant: 'success' })
        queryClient.invalidateQueries(['expenses']);
  
        queryClient.invalidateQueries(['cashRegisterActive']);

      }

    })

}