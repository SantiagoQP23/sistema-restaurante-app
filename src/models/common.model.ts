

export enum TypeIdentification{
  CEDULA = "cedula",
  RUC = "ruc"
}

export interface Identification{
  id: string;  
  type: TypeIdentification;
  num: string;

}

export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identification: Identification
}