import { IOrderDetail } from "../../../../models";


export interface InvoiceDetail {

  id: string;

  quantity: number;

  orderDetail: IOrderDetail;

  amount: number;

  createdAt: Date;

  updatedAt: Date;


}