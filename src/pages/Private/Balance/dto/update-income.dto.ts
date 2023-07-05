

export interface UpdateIncomeDto {

  id: number;
  description?: string;
  amount?: number;
  paymentMethod?: string;

  clientId?: string;

}