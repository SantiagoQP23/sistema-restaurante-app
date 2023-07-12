import { useEffect } from 'react';

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { CreateInvoiceDto } from '../dto/invoices/create-invoice-dto';
import { InvoicesResponse, createInvoice, getInvoices, removeInvoice } from "../services/invoices.service";
import { IOrder } from "../../../../models";
import { useDispatch } from "react-redux";
import { setActiveOrder } from "../../../../redux";
import { useFilterInvoices } from "./useFilterInvoices.dto";


export const useInvoices = () => {


  const filter = useFilterInvoices();

  const invoicesQuery = useQuery<InvoicesResponse>(['invoices', filter],
    () => getInvoices({
      offset: filter.page,
      limit: filter.rowsPerPage,
      startDate: filter.startDate,
      endDate: filter.endDate,
      clientId: filter.client?.id,
      paymentMethod: filter.paymentMethod || undefined,
      transactionNumber: filter.transactionNumber || undefined,
      notaDeVenta: filter.notaDeVenta || undefined,

    }), {


  });

  useEffect(() => {

    invoicesQuery.refetch();
    filter.resetPage();

  }, [
    filter.startDate,
    filter.endDate,
    filter.client,
    filter.paymentMethod,
    filter.transactionNumber,
    filter.notaDeVenta,
    filter.rowsPerPage,
    filter.period
  ])

  useEffect(() => {
    invoicesQuery.refetch();
  }
    , [filter.page])

  return { invoicesQuery, ...filter };


}


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



// export const useClient = (id: string, enabled = true) => {
//   return useQuery<IClient>(['client', id], () => getClient(id), {
//     enabled,
//     retry: false,
//   });

// }

export const useRemoveInvoice = () => {

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  return useMutation<IOrder, unknown, string>((id) => removeInvoice(id), {
    onSuccess: (data) => {
      enqueueSnackbar('Pago eliminado', { variant: 'success' });

      dispatch(setActiveOrder(data));
    },
    onError: (error) => {
      enqueueSnackbar('Error al eliminar pago', { variant: 'error' });
    }
  })



}