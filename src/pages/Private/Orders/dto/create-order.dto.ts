

export interface CreateOrderDto {
  clientId: string;
  tableId: string;
  details: CreateOrderDetailDto[];
}


export interface CreateOrderDetailDto {
  productId: string;
  quantity: number;
  description?: string;
}