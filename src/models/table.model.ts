import { IOrder } from "./orders.model";



export interface ITable {
  id: string;
  name: string;
  description: string;
  chairs: number;
  isAvailable: boolean;
  orders: IOrder[];

}


export interface ICreateTable {
  name: string;
  description?: string;
  chairs: number;

}