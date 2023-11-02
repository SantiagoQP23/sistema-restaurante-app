import { CreateInvoiceDetailDto } from './create-invoice-detail.dto';


export interface CreateInvoiceDto {

    orderId: string;

    details: CreateInvoiceDetailDto[];

    cashRegisterId: string;

}