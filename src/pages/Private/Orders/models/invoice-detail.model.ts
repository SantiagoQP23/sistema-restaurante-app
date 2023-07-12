import { IOrderDetail, IProduct } from "../../../../models";


export interface InvoiceDetail {

  id: string;

  quantity: number;

  orderDetail: IOrderDetail;

  product: IProduct;

  price: number;

  amount: number;

  createdAt: Date;

  updatedAt: Date;


}