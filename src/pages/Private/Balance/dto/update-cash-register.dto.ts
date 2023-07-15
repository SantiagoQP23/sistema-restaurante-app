import { CreateCashRegisterDto } from "./create-cash-register.dto";


export interface UpdateCashRegisterDto {

  id: string;
  

  finalAmount: number;



  closingNote?: string;


}