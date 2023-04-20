import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import { createClient, getClient, getClients, updateClient } from "../services"
import { IClient } from "../../../../models";
import { useSnackbar } from "notistack";
import { CreateClientDto } from "../dto/create-client.dto";
import { UpdateClientDto } from "../dto/update-client.dto";
import { PaginationDto } from "../dto/pagination.dto";
import { useState } from "react";


export const useClients = () => {

  const [page, setPage] = useState<number>(1);

  const [term, setTerm] = useState<string>('');

  const clientsQuery =  useQuery<IClient[]>(['clients'], 
  (data) => getClients(term)
  )

  return {
    clientsQuery,

    page,


    setTerm,
    term

  }
}


export const useClient = (id: string, enabled = true) => {
  return useQuery<IClient>(['client', id], () => getClient(id), {
     enabled,
     retry: false,
     });

}


export const useCreateCliente = (callback?: () => void) => {

  const { enqueueSnackbar } = useSnackbar();


  return useMutation<IClient, unknown, CreateClientDto>(createClient, {

    onSuccess: (data) => {
      enqueueSnackbar('Cliente creado', { variant: 'success' });



      callback && callback();
    },

    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Error al crear cliente', { variant: 'error' });
    }



  })


}


export const useUpdateClient = (callback?: () => void) => {

  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IClient, unknown, UpdateClientDto>(
    (data) => updateClient(data.id, data), {

    onSuccess: (data) => {
      enqueueSnackbar('Cliente actualizado', { variant: 'success' });

      callback && callback();
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Error al actualizar cliente', { variant: 'error' });
    }

  })

}