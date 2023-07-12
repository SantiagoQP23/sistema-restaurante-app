import { useMutation, useQuery } from "@tanstack/react-query";
import { createIncome, getIncomes, updateIncome } from "../services/incomes.service";
import { useSnackbar } from "notistack";
import { CreateIncomeDto } from "../dto/create-income.dto";
import { Income } from "../models/income.model";
import { UpdateIncomeDto } from "../dto/update-income.dto";
import { queryClient } from "../../../../main";




export const useIncomes = () => { 

  const incomesQuery = useQuery(["incomes"], getIncomes);

  return {
    incomesQuery
  }



}

export const useCreateIncome = () => {

  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Income, unknown, CreateIncomeDto>(createIncome, {

    onSuccess: () => {
      enqueueSnackbar('Ingreso creado correctamente', { variant: 'success' })
      queryClient.invalidateQueries(['incomes']);
      queryClient.invalidateQueries(['cashRegisterActive']);

    },
    onError: () => {
      console.log('onError')
      enqueueSnackbar('Error al crear el ingreso', { variant: 'error' })

    }

  })

}


export const useUpdateIncome = () => {

  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Income, unknown, UpdateIncomeDto>(updateIncome, {

    onSuccess: () => {
      enqueueSnackbar('Ingreso actualizado correctamente', { variant: 'success' })

      queryClient.invalidateQueries(['incomes']);

      queryClient.invalidateQueries(['cashRegisterActive']);

    },
    onError: () => {
      console.log('onError')
      enqueueSnackbar('Error al actualizar el ingreso', { variant: 'error' })

    }

  })

}

