import { IPerson } from "./common.model";


export interface IRole {
  id: number,
  name: string,
  description: string
}


export interface IUser {
  id: number,
  username: string,
  
  person: IPerson,

  online: boolean,
  
  role: IRole,
}


export interface IFormLogin{
  username: string;
  password: string;
}

