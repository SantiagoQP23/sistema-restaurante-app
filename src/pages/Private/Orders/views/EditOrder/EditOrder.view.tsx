import { FC, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Material UI
import {
  Grid, Container, CircularProgress
} from '@mui/material';

import { selectOrders, setActiveOrder } from '../../../../../redux';

import { OrderActionType, OrderContext } from '../../context/Order.context';

import { OrderSummary, OrderDetails } from './components';
import { TitlePage } from '../../../components/TitlePage.component';
import { useOrder } from '../../hooks';


export const EditOrder = () => {

  const navigate = useNavigate();

  const { orderId } = useParams();

  if (!orderId) navigate('/orders');

  const { dispatch } = useContext(OrderContext);

  const [orderDelivered, setOrderDelivered] = useState<boolean>(false)



  const { activeOrder } = useSelector(selectOrders);

 

  const { data, isLoading } = useOrder(orderId!);

  useEffect(() => {
    if (activeOrder) {
      setOrderDelivered(!!(activeOrder.details?.find(detail => detail.qtyDelivered > 0)))
    }
  }, [activeOrder])


  useEffect(() => {


    return () => {
      dispatch({ type: OrderActionType.RESET })
      setActiveOrder(null);
    }
  }, [])


  if (!activeOrder)
    return <></>;





  return (
    <>

      <Container maxWidth='xl'>

        <TitlePage
          title='Editar pedido'
        />

        {
          isLoading
            ?
            <>
              <CircularProgress />
            </>
            :

            <>

              <Grid
                spacing={1}
                container

              >

                <Grid item xs={12} md={8}>
                  <OrderDetails
                   order={activeOrder}
                  />

                </Grid>

                <Grid item xs={12} md={4}>

                  <OrderSummary order={activeOrder} />
                </Grid>


              </Grid>
            </>

        }

      </Container>



    </>
  )
}

