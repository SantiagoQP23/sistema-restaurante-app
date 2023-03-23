import { TypeOrder } from '../../../../models/orders.model';


export interface UpdateOrderDto{

  id: string;
  tableId?: string;
  clientId?: string;
  people?: number;
  status?: string;
  discount?: number;
  typeOrder?: TypeOrder;
  isPaid?: boolean;


}



export interface PayOrderDto{
  id: string;
  discount?: number;
}

  