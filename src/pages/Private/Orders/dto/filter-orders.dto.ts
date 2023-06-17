import { OrderStatus } from "../../../../models";
import { DateFiltePaginationDto } from "../../dto";



export interface FilterOrdersDto extends DateFiltePaginationDto {


  userId?: string;

  clientId?: string;

  status?: OrderStatus;

  isPaid?: boolean;

  tableId?: string;


}