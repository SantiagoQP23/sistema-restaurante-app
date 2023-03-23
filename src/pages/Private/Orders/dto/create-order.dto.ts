import { TypeOrder } from "../../../../models";


export interface CreateOrderDto {
  clientId?: string;
  tableId?: string;
  details?: CreateOrderDetailDto[];
  people?: number;
  typeOrder?: TypeOrder;
}


export interface CreateOrderDetailDto {
  productId: string;
  quantity: number;
  description?: string;
}