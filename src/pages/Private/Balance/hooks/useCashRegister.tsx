import { useMutation, useQuery } from "@tanstack/react-query"
import { createCashRegister, getAllCashRegisters, getCashRegister } from "../services/cash-register.service"
import {  useSnackbar } from 'notistack';
import { CashRegister } from "../models/cash-register.model";
import { CreateCashRegisterDto } from "../dto/create-cash-register.dto";
import { useSearch } from "../../../../hooks/useSearch";


export const useAllCashRegister = () => {

  const cashRegisterQuery = useQuery(['cashRegister'], getAllCashRegisters)

  return {
    cashRegisterQuery
  }
}



export const useCashRegister = (term: string) => {


  const cashRegisterQuery = useQuery(['cashRegister', term], () => getCashRegister(term), {

    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return {
    cashRegisterQuery
  }

    
}


export const useCreateCashRegister = () => {

  const {enqueueSnackbar} = useSnackbar()

  return useMutation<CashRegister, unknown, CreateCashRegisterDto>(createCashRegister, {
    onSuccess: () => {
      enqueueSnackbar('Caja creada correctamente', {variant: 'success'})
    },
    onError: () => {
      enqueueSnackbar('Ocurrió un error al crear la caja', {variant: 'error'})
    }
  })

}