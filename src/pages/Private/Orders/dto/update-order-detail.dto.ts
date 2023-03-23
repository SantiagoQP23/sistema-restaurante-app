import { DetailStatus } from "../../../../models";


export interface UpdateOrderDetailDto {
  id: string;
  quantity?: number;
  qtyDelivered?: number;
  description?: string;
  status?: DetailStatus;
  orderId: string;
  discount?: number;
}
