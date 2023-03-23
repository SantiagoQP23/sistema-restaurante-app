
import { Outlet} from "react-router-dom";

import { Container } from '@mui/material';

import { PageTitleWrapper, PageTitle } from '../../../components/ui';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { OrderProvider } from './context/Order.context';


import { ModalDeleteOrder } from './components/EditOrder/ModalDeleteOrder.component';
import { ModalPayOrder } from './components/ReceiptOrder/ModalPayOrder.component';
import { ModalDiscountOrder } from './components/ReceiptOrder/ModalDiscountOrder.component';
import { Clock } from "./subpages";



export const Orders = () => {


  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading='Pedidos ' />
        <Clock />
      </PageTitleWrapper>


      <Container maxWidth="lg">
        <OrderProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>

            <Outlet />


          </LocalizationProvider>
        </OrderProvider>

      </Container>
     

      <ModalDeleteOrder />
      <ModalDiscountOrder />
      <ModalPayOrder />


    </>
  )
}


export default Orders