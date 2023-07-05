import { restauranteApi } from "../../../../api";
import { IOrder } from "../../../../models";
import { CreateInvoiceDto } from "../dto";
import { Invoice } from "../models/Invoice.model";




export const createInvoice = async (invoice: CreateInvoiceDto): Promise<IOrder> => {


  console.log('invoice', invoice);

  const { data } = await restauranteApi.post<IOrder>(`invoices`, invoice);

  return data;


}