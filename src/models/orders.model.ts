import { IUser, IClient, IProduct } from '.';


export interface IOrder {

  id: string;

  num: number;

  amount: number;

  isDelivered: boolean;

  user: IUser;

  client: IClient;

  createdAt: Date;

  updatedAt: Date;

  details?: IOrderDetail[];

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

  qtyDeliverd: number;

  amount: number;

  isCompleted: boolean;
  
  description: string;

  createtAt: Date;

  updatedAt: Date;

  product: IProduct;

 }