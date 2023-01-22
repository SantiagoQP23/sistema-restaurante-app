

export interface CreateOrderDto {
  clientId?: string;
  tableId?: string;
  details?: CreateOrderDetailDto[];
  people?: number;
}


export interface CreateOrderDetailDto {
  productId: string;
  quantity: number;
  description?: string;
}