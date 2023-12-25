import { CreateBillDto } from "./create-bill-dto";

export interface UpdateBillDto extends Partial<CreateBillDto> {
  id: number;
  isPaid?: boolean;
}