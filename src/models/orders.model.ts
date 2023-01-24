import { IUser, IClient, IProduct } from '.';
import { ITable } from './table.model';


export interface IOrder {

  id: string;

  num: number;

  amount: number;
  discount: number;

  total: number;

  isDelivered: boolean;
  
  isPaid: boolean;

  user: IUser;

  client?: IClient;
  table?: ITable;

  createdAt: Date;

  updatedAt: Date;

  details: IOrderDetail[];

}

export interface IUpdateOrder{
  amount?: number;

  isDelivered?: boolean;

  client?: IClient;

  updatedAt?: Date;

  details?: IOrderDetail[];

}







export interface IOrderDetail{

  id: string;

  quantity: number;

  qtyDelivered: number;

  amount: number;

  isCompleted: boolean;
  
  description: string;

  createtAt: Date;

  updatedAt: Date;

  product: IProduct;

 }


 export interface ICreateOrderDetail{

  quantity: number;
  product: IProduct;
  description?: string;
  
  

 }