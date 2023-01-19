import { IPerson } from "./common.model";

export interface IFormLogin{
  username: string;
  password: string;
}


export interface IRole {
  id: number,
  name: string,
  description: string
}


export interface IUser {
  id: string,
  username: string,
  person: IPerson,
  online: boolean,
  role: IRole,
}




