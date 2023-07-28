import { CreateExpenseDto } from "./create-expense.dto";


export interface UpdateExpenseDto extends Partial<CreateExpenseDto> {

  id: number;

}