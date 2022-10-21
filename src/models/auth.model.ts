

export interface IRole {
  id: number,
  name: string,
  description: string
}


export interface IUser {
  idUsuario?: number,
  username: string,
  fullName: string,

  password?: string;

  online: boolean,
  
  role: IRole,
}


export interface IFormLogin{
  username: string;
  password: string;
}

