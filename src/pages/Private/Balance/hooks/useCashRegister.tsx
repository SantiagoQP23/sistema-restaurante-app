import { useMutation, useQuery } from "@tanstack/react-query"
import { ActiveCashRegister, createCashRegister, getAllCashRegisters, getCashRegister, getCashRegisterActive, updateCashRegister } from "../services/cash-register.service"
import { useSnackbar, enqueueSnackbar } from 'notistack';
import { CashRegister } from "../models/cash-register.model";
import { CreateCashRegisterDto } from "../dto/create-cash-register.dto";
import { useSearch } from "../../../../hooks/useSearch";
import { useCashRegisterStore } from "../../Common/store/cashRegisterStore";
import { UpdateCashRegisterDto } from "../dto/update-cash-register.dto";


export const useAllCashRegister = () => {

  const cashRegisterQuery = useQuery(['cashRegister'], getAllCashRegisters, {
    onSuccess: (data) => {
      console.log(data)
    },
  })

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

  const { setActiveCashRegister } = useCashRegisterStore(state => state)

  const cashRegisterQuery = useQuery<ActiveCashRegister>(['cashRegisterActive'], getCashRegisterActive, {

    enabled: false,
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

  const {setActiveCashRegister} = useCashRegisterStore(state => state);

  return useMutation<ActiveCashRegister, unknown, CreateCashRegisterDto>(createCashRegister, {
    onSuccess: (data) => {
      enqueueSnackbar('Caja creada correctamente', { variant: 'success' });
      setActiveCashRegister(data);

    },
    onError: () => {
      enqueueSnackbar('Ocurrió un error al crear la caja', { variant: 'error' })
    }
  })

}

export const useUpdateCashRegister = () => {


  const {enqueueSnackbar} = useSnackbar();


  const {setActiveCashRegister} = useCashRegisterStore(state => state);

  return useMutation<CashRegister, unknown, UpdateCashRegisterDto>(updateCashRegister, {
    onSuccess: () => {

      enqueueSnackbar('Caja actualizada correctamente', { variant: 'success' });
      setActiveCashRegister(null);
    },
    onError: () => {

      enqueueSnackbar('Ocurrió un error al actualizar la caja', { variant: 'error' })
    }
  })

}