import {useState} from 'react';

import { useDateFilter } from "../../../../hooks/useDateFilter";
import { usePaginationAsync } from "../../../../hooks/usePaginationAsync";
import { IClient, IUser } from "../../../../models";
import { Period } from "../../../../models/period.model";
import { PaymentMethod } from '../models/Invoice.model';


export const useFilterInvoices = () => {

  const dateFilter = useDateFilter(Period.CUSTOM);

  const [user, setUser] = useState<null | IUser>(null);

  const [isActive, setIsActive] = useState<boolean | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null >(null);

  const [transactionNumber, setTransactionNumber] = useState<string | null>(null);

  const [notaDeVenta, setNotaDeVenta] = useState<string | null>(null);

  const [client, setClient] = useState<null | IClient>(null);




  const pagination = usePaginationAsync();

  const handleChangeUser = (user: IUser | null) => {
    setUser(user);
  }

  const handleChangeIsActive = (isActive: boolean | null) => {
    setIsActive(isActive);
  }

  const handleChangePaymentMethod = (paymentMethod: PaymentMethod | null ) => {
    setPaymentMethod(paymentMethod);
  }

  const handleChangeTransactionNumber = (transactionNumber: string | null) => {
    setTransactionNumber(transactionNumber);
  }

  const handleChangeNotaDeVenta = (notaDeVenta: string | null) => {
    setNotaDeVenta(notaDeVenta);
  }

  const handleChangeClient = (client: IClient | null) => {
    setClient(client);
  }


  const reset = () => {
    setUser(null);
    setIsActive(null);
    setPaymentMethod(null);
    setTransactionNumber(null);
    setNotaDeVenta(null);
  }



  return {

    user,
    isActive,
    paymentMethod,
    transactionNumber,
    notaDeVenta,
    client,

    handleChangeUser,
    handleChangeIsActive,
    handleChangePaymentMethod,
    handleChangeTransactionNumber,
    handleChangeNotaDeVenta,
    handleChangeClient,



    ...dateFilter,
    ...pagination,


  }
}