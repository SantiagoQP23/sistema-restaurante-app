import { useMutation } from "@tanstack/react-query"
import { createCashIncome, updateCashIncome } from "../services/cash-income.service"
import { CashIncome } from "../models/cash-income.model"
import { CreateCashIncomeDto } from "../dto/create-cash-income.dto"
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { UpdateCashIncomeDto } from "../dto/update-cash-income.dto";



export const useCashIncome = () => {
  


  
  return {

  }
  
}



export const useCreateCashIncome = () => {

  const {enqueueSnackbar} = useSnackbar();

  
  return useMutation<CashIncome, unknown, CreateCashIncomeDto>(createCashIncome, {
    onSuccess: () => {
      enqueueSnackbar('Ingreso creado correctamente', {variant: 'success'})
      
      
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Error al create el ingreso', {variant: 'error'})
    }
  
  
  })

  
}


export const useUpdateCashIncome = () => {

  const {enqueueSnackbar} = useSnackbar();


  return useMutation<CashIncome, unknown, UpdateCashIncomeDto>(updateCashIncome, {

    onSuccess: () => {
      enqueueSnackbar('Ingreso actualizado correctamente', {variant: 'success'})
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Error al actualizar el ingreso', {variant: 'error'})
    }

  })

}