

export interface UpdateOrderDto{

  id: string;
  tableId?: string;
  clientId?: string;
  orderDetail?: UpdateOrderDetailDto;

}

export interface UpdateOrderDetailDto{
  id: string;
  quantity?: number;
  description?: string;
  qtyDelivered?: number;
}