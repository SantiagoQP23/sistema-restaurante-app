import { IUser, IClient, IProduct } from '.';
import { ITable } from './table.model';
import { Invoice } from '../pages/Private/Orders/models/Invoice.model';

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


export enum PaymentMethod {
  CASH = 'CASH',
  // CARD = 'CARD',
  TRANSFER = 'TRANSFER',
}



export enum OrderStatusSpanish {
  PENDING = 'PENDIENTE',
  IN_PROGRESS = 'PREPARANDO',
  READY = 'LISTO',
  DELIVERED = 'ENTREGADO',
  CANCELLED = 'CANCELADO',
}

export interface IOrder {
  notes: string;
  deliveryTime: Date;
  createdAt: Date;
  details: IOrderDetail[];
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
  isClosed: boolean;

  invoices: Invoice[];
}

export interface IOrderDetail{

  id: string;

  quantity: number;

  qtyDelivered: number;

  qtyPaid: number;

  amount: number;
  
  description: string;

  createtAt: Date;

  updatedAt: Date;

  product: IProduct;

  isActive: boolean;

  price: number;

  

 }


 export interface ICreateOrderDetail{

  quantity: number;
  product: IProduct;
  description?: string;
   

 }