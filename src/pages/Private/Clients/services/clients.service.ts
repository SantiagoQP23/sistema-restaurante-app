import { loadAbort } from "../../../../helpers"
import restauranteApi from '../../../../api/restauranteApi';
import { IClient, ICreateClient } from "../../../../models";
import { TypeIdentification } from '../../../../models/common.model';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { SubjectDeleteClient } from '../helpers/subjects-clients.helper';


export const statusModalDeleteClient = new SubjectDeleteClient();

export const getClient = (term: string) => {

  const controller = loadAbort();


  return {
    call: restauranteApi.get<IClient>(`clients/${term}`,
      { signal: controller.signal }),
    controller
  }


}

export const getClients = () => {

  const controller = loadAbort();


  return {
    call: restauranteApi.get<IClient>(`clients/`,
      { signal: controller.signal }),
    controller
  }


}



export const updateClient = (id: string, data: UpdateClientDto) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<IClient>(`clients/${id}`,
      data,
      { signal: controller.signal }),
    controller
  }


}

export const createClient = ( data: CreateClientDto) => {
 
  console.log(data);

  const controller = loadAbort();

  return {
    call: restauranteApi.post<IClient>(`clients/`,
      data,
      { signal: controller.signal }),
    controller
  }


}


export const deleteClient = (id: string) => {
  
    const controller = loadAbort();
  
    return {
      call: restauranteApi.delete<IClient>(`clients/${id}`,
        { signal: controller.signal }),
      controller
    }

}