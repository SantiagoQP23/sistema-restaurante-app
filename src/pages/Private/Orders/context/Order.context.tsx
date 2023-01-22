import { createContext, FC, useState } from 'react';
import { IClient, ITable } from '../../../../models';

import { ICreateOrderDetail } from '../../../../models/orders.model';
import { CreateOrderDto, CreateOrderDetailDto } from '../dto/create-order.dto';




interface IOrderContext {
  amount: number;
  client: IClient | undefined;
  details: ICreateOrderDetail[];
  table: ITable | undefined;

  people: number | undefined;
  addDetail: (detail: ICreateOrderDetail) => void;
  deleteDetail: (nameProduct: string) => void;
  reset: () => void;
  setPeople: (people: number) => void;
  setClient: (client: IClient | undefined) => void;
  setTable: (table: ITable) => void;
  updateDetail: (detail: ICreateOrderDetail) => void;
  getOrder: () => CreateOrderDto;
  setDetails: (details: ICreateOrderDetail[]) => void;
}

interface Props {
  children: React.ReactNode
}


export const OrderContext = createContext({} as IOrderContext);


export const OrderProvider: FC<Props> = ({ children }) => {


  const [amount, setAmount] = useState<number>(0)
  const [details, setDetails] = useState<ICreateOrderDetail[]>([]);
  const [table, setTable] = useState<ITable>();
  const [client, setClient] = useState<IClient>();
  const [people, setPeople] = useState<number>(1);



  const addDetail = (detail: ICreateOrderDetail) => {
    const isDetail = details.find(det => det.product.id === detail.product.id);

    if (!isDetail) {
      setDetails((details) => [detail, ...details]);
      setAmount((amount) => amount + detail.product.price * detail.quantity);

    } else {
      console.log("Ya existe el detalle");
      //TODO: Snackbar "Ya existe el detalle"
    }


  }

  const deleteDetail = (nameProduct: string) => {

    setDetails((details) => details.filter(det => {

      const isSameProduct = det.product.name !== nameProduct

      if (!isSameProduct) {
        const amountDiff = det.quantity * det.product.price;
        setAmount((amount) => amount - amountDiff)

      }

      return isSameProduct;


    }));
  }

  const updateDetail = (detail: ICreateOrderDetail) => {
    setDetails((details) => details.map(det => {
      if (det.product.name === detail.product.name) {

        const diff = Math.abs(det.quantity - detail.quantity);

        const amountDiff = diff * detail.product.price;

        detail.quantity > det.quantity
          ? setAmount((amount) => amount + amountDiff)
          : setAmount((amount) => amount - amountDiff)

        return detail

      }
      return det
    }))
  }

  const getOrder = () => {
    const order: CreateOrderDto = {

      clientId: client?.id || '',
      tableId: table?.id || '',
      details: details.map(detail => {


        const orderDetail: CreateOrderDetailDto = {
          productId: detail.product.id,
          quantity: detail.quantity,
          description: detail.description
        } 
        return orderDetail;
      }),

      people,

    }

    return order;
  }


  const reset = () => {
    setAmount(0)
    setClient(undefined);
    setTable(undefined);
    setDetails([]);

  }

  return (
    <OrderContext.Provider
      value={
        {
          addDetail,
          amount,
          client,
          deleteDetail,
          details,
          reset,
          setClient,
          setTable,
          table,
          updateDetail,
          getOrder, 
          people,
          setPeople,
          setDetails

        }
      }
    >
      {children}
    </OrderContext.Provider>
  )
}