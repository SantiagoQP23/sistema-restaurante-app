

export interface IClient {

  id: string;
  lastNames: string;
  firstNames: string;
  cedula: string;
  ruc?: string;
  address: string;
  email: string;
}

export interface ICreateClient {

 
  lastNames: string;
  firstNames: string;
  cedula: string;
  ruc?: string;
  address?: string;
  email?: string;
}