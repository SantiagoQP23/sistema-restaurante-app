import { CreatePerson, Identification, IPerson } from './common.model';


export interface IClient {

  id: string;
  person: IPerson;
  address: string;
}

export interface ICreateClient extends CreatePerson{

  address?: string;

}