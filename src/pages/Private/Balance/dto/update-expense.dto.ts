

export interface UpdateExpenseDto {

  id: number;
  description?: string;
  amount?: number;
  paymentMethod?: string;
  supplierId?: string;

}