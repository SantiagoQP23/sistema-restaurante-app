import { loadAbort } from "../../../../helpers"
import restauranteApi from '../../../../api/restauranteApi';
import { IClient, ICreateClient } from "../../../../models";

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
export const updateClient = (id: string, data: ICreateClient) => {

  if(!data.email){
    delete data.email
  }
  if(!data.ruc){
    delete data.ruc
  }

  const controller = loadAbort();


  return {
    call: restauranteApi.patch<IClient>(`clients/${id}`,
      data,
      { signal: controller.signal }),
    controller
  }


}

export const createClient = ( data: ICreateClient) => {

  
  if(!data.email){
    delete data.email
  }
  if(!data.ruc){
    delete data.ruc
  }
  
  console.log(data);

  const controller = loadAbort();


  return {
    call: restauranteApi.post<IClient>(`clients/`,
      data,
      { signal: controller.signal }),
    controller
  }


}