import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createClient, getClient, getClients, updateClient } from "../services"
import { IClient } from "../../../../models";
import { useSnackbar } from "notistack";
import { CreateClientDto } from "../dto/create-client.dto";
import { UpdateClientDto } from "../dto/update-client.dto";
import { PaginationDto } from "../dto/pagination.dto";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { usePaginationAsync } from "../../../../hooks/usePaginationAsync";


export const useClients = () => {

  const dispatch = useDispatch();

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePaginationAsync();

  const [term, setTerm] = useState<string>('');

  const clientsQuery = useQuery<{ clients: IClient[], length: number }>(['clients', { page, rowsPerPage, term }],
    (data) => getClients(page, rowsPerPage, term)
  )

  const handleChangeTerm = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event && event.target)
      setTerm(event.target.value);
  };



  return {
    clientsQuery,

    page,

    handleChangePage,

    rowsPerPage,

    handleChangeRowsPerPage,

    handleChangeTerm,

    term

  }
}


export const useClient = (id: string, enabled = true) => {
  return useQuery<IClient>(['client', id], () => getClient(id), {
    enabled,
    retry: false,
  });

}


export const useCreateCliente = () => {

  const { enqueueSnackbar } = useSnackbar();


  return useMutation<IClient, unknown, CreateClientDto>(createClient, {

    onSuccess: (data) => {
      enqueueSnackbar('Cliente creado', { variant: 'success' });

    },

    onError: (error) => {
      enqueueSnackbar('Error al crear cliente', { variant: 'error' });
    }



  })


}


export const useUpdateClient = () => {

  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IClient, unknown, UpdateClientDto>(
    (data) => updateClient(data.id, data), {

    onSuccess: (data) => {
      enqueueSnackbar('Cliente actualizado', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar('Error al actualizar cliente', { variant: 'error' });
    }

  })

}