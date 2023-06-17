import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createClient, getClient, getClients, updateClient } from "../services"
import { IClient } from "../../../../models";
import { useSnackbar } from "notistack";
import { CreateClientDto } from "../dto/create-client.dto";
import { UpdateClientDto } from "../dto/update-client.dto";
import { PaginationDto } from "../dto/pagination.dto";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePaginationAsync } from "../../../../hooks/usePaginationAsync";
import { useSearch } from "../../../../hooks/useSearch";


export const useClients = () => {

  const dispatch = useDispatch();

  const pagination = usePaginationAsync();
  
  const {search, handleChangeSearch} = useSearch();

  

  const clientsQuery = useQuery<{ clients: IClient[], length: number }>(
    ['clients', {  limit: pagination.rowsPerPage, offset: pagination.page, search }],
    (data) => getClients({
      limit: pagination.rowsPerPage,
      offset: pagination.page,
      search
    })
  )

  useEffect(() => {
    clientsQuery.refetch();
  }, [search, pagination.page, pagination.rowsPerPage])


  return {
    clientsQuery,
    handleChangeSearch,
    search,

   ...pagination,

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