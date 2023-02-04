import { IUser, IClient, IProduct } from '.';
import { ITable } from './table.model';

export enum OrderStatus {
  PENDING = 'PENDING',
  // IN_PROGRESS = 'IN_PROGRESS',
  // READY = 'READY',
  DELIVERED = 'DELIVERED',
  // CANCELLED = 'CANCELLED',
  PAID = 'PAID',
}

export enum OrderStatusSpanish {
  PENDING = 'PENDIENTE',
  IN_PROGRESS = 'EN PROCESO',
  READY = 'LISTO',
  DELIVERED = 'ENTREGADO',
  CANCELLED = 'CANCELADO',
  PAID = 'PAGADO',
}

export interface IOrder {

  id: string;

  num: number;

  amount: number;
  discount: number;

  total: number;

  status: OrderStatus;  

  user: IUser;

  client?: IClient;
  table?: ITable;

  createdAt: Date;

  updatedAt: Date;

  details: IOrderDetail[];
  people: number

}



export interface IUpdateOrder{
  amount?: number;

  isDelivered?: boolean;

  client?: IClient;

  updatedAt?: Date;

  details?: IOrderDetail[];

}





export enum DetailStatus {
  PENDING = 'PENDING',
  COOKING = 'COOKING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
}




export interface IOrderDetail{

  id: string;

  quantity: number;

  qtyDelivered: number;

  amount: number;

  status: DetailStatus;
  
  description: string;

  createtAt: Date;

  updatedAt: Date;

  product: IProduct;

  isActive: boolean;

 }


 export interface ICreateOrderDetail{

  quantity: number;
  product: IProduct;
  description?: string;
  
  

 }