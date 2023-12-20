export interface CreateOrderDetailDto {
  quantity: number;
  description?: string;
  price: number;
  productId: string;
  orderId: string;
  productOptionId?: number;
}
