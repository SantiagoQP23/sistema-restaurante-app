import { IOrderDetail } from "../../../../models";


export interface InvoiceDetail {

  id: string;

  title: string;

  description: string;

  quantity: number;

  orderDetail: IOrderDetail;

  price: number;

  amount: number;

  createdAt: Date;

  updatedAt: Date;


}