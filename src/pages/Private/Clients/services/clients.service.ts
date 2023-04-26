import { loadAbort } from "../../../../helpers"
import restauranteApi from '../../../../api/restauranteApi';
import { IClient, ICreateClient } from "../../../../models";
import { TypeIdentification } from '../../../../models/common.model';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { SubjectDeleteClient } from '../helpers/subjects-clients.helper';


export const statusModalDeleteClient = new SubjectDeleteClient();



export const getClient = async (term: string): Promise<IClient> => {

  const { data } = await restauranteApi.get<IClient>(`clients/${term}`)

  return data;

}


export const getClients = async (page = 0, limit = 10, term?: string): Promise<{clients: IClient[], length: number}> => {

  const params = new URLSearchParams();

  if (term) {
    params.append('term', term);
  }

  params.append('offset', page.toString());
  params.append('limit', limit.toString());

  const { data } = await restauranteApi.get<{clients: IClient[], length: number}>(`clients/`,{
    params
  })

  return {
    clients: data.clients,
    length: data.length
  };

}




// export const getClient = (term: string) => {

//   const controller = loadAbort();


//   return {
//     call: restauranteApi.get<IClient>(`clients/${term}`,
//       { signal: controller.signal }),
//     controller
//   }


// }

// export const getClients = () => {

//   const controller = loadAbort();


//   return {
//     call: restauranteApi.get<IClient>(`clients/`,
//       { signal: controller.signal }),
//     controller
//   }


// }


export const updateClient = async (id: string, data: UpdateClientDto): Promise<IClient> => {

  const { data: client } = await restauranteApi.patch<IClient>(`clients/${id}`,

    data)

  return client;

}




// export const updateClient = (id: string, data: UpdateClientDto) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.patch<IClient>(`clients/${id}`,
//       data,
//       { signal: controller.signal }),
//     controller
//   }


// }

export const createClient = async (data: CreateClientDto): Promise<IClient> => {

  const { data: client } = await restauranteApi.post<IClient>(`clients/`, data)

  return client;

}


// export const createClient = ( data: CreateClientDto) => {
 
//   console.log(data);

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.post<IClient>(`clients/`,
//       data,
//       { signal: controller.signal }),
//     controller
//   }


// }


export const deleteClient = (id: string) => {
  
    const controller = loadAbort();
  
    return {
      call: restauranteApi.delete<IClient>(`clients/${id}`,
        { signal: controller.signal }),
      controller
    }

}