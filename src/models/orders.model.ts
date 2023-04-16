import { IUser, IClient, IProduct } from '.';
import { ITable } from './table.model';

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  // READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',

}


export enum TypeOrder {
  TAKE_AWAY = 'TAKE_AWAY',
  IN_PLACE = 'IN_PLACE',
  //DELIVERY = 'ENTREGA DOMICILIO',
}



export enum OrderStatusSpanish {
  PENDING = 'PENDIENTE',
  IN_PROGRESS = 'PREPARANDO',
  READY = 'LISTO',
  DELIVERED = 'ENTREGADO',
  CANCELLED = 'CANCELADO',
}

export interface IOrder {

  amount: number;
  client?: IClient;
  createdAt: Date;
  details: IOrderDetail[];
  discount: number;
  id: string;
  isPaid: boolean;
  num: number;
  people: number
  status: OrderStatus;  
  table?: ITable;
  total: number;
  type: TypeOrder;
  updatedAt: Date;
  user: IUser;
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

  discount: number;

 }


 export interface ICreateOrderDetail{

  quantity: number;
  product: IProduct;
  description?: string;
   

 }