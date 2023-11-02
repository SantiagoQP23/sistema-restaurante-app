


export interface CreateInvoiceDetailDto {
  orderDetailId: string;
  quantity: number;
  title: string;
  description?: string;
  price: number;
}