

export enum TypeIdentification{
  CEDULA = "cedula",
  RUC = "ruc"
}

export interface Identification{
  id: string;  
  type: TypeIdentification;
  num: string;

}


export interface CreateIdentification{
  type: TypeIdentification;
  num: string;
}


export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identification: Identification
  phone?: string;
}




export interface CreatePerson{
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  identification: CreateIdentification;
}

