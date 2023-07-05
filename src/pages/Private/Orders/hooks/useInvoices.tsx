import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { CreateInvoiceDto } from '../dto/invoices/create-invoice-dto';
import { createInvoice } from "../services/invoices.service";
import { IOrder } from "../../../../models";
import { useDispatch } from "react-redux";
import { setActiveOrder } from "../../../../redux";


export const useCreateInvoice = () => {

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();


  return useMutation<IOrder, unknown, CreateInvoiceDto>(createInvoice, {

    onSuccess: (data) => {
      enqueueSnackbar('Pago credo correctamente', {
        variant: 'success'
      });

      dispatch(setActiveOrder(data));

    },
    onError: (error) => {
      console.log(error)
      enqueueSnackbar('Error al guardar el pago', {
        variant: 'error'
      });
    }




  })

}


