import { useMutation, useQuery } from "@tanstack/react-query"
import { ActiveCashRegister, createCashRegister, getAllCashRegisters, getCashRegister, getCashRegisterActive } from "../services/cash-register.service"
import { useSnackbar } from 'notistack';
import { CashRegister } from "../models/cash-register.model";
import { CreateCashRegisterDto } from "../dto/create-cash-register.dto";
import { useSearch } from "../../../../hooks/useSearch";
import { useCashRegisterStore } from "../../Common/store/cashRegisterStore";


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

export const useCashRegisterActive = () => {

  const { enqueueSnackbar } = useSnackbar();

  const {setActiveCashRegister} = useCashRegisterStore(state => state)

  const cashRegisterQuery = useQuery<ActiveCashRegister>(['cashRegisterActive'], getCashRegisterActive, {

    onSuccess: (data) => {
      console.log(data)
      enqueueSnackbar('Caja activa', { variant: 'success' })
      setActiveCashRegister(data)
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

    const { enqueueSnackbar } = useSnackbar()

    return useMutation<CashRegister, unknown, CreateCashRegisterDto>(createCashRegister, {
      onSuccess: () => {
        enqueueSnackbar('Caja creada correctamente', { variant: 'success' })
      },
      onError: () => {
        enqueueSnackbar('Ocurrió un error al crear la caja', { variant: 'error' })
      }
    })

  }