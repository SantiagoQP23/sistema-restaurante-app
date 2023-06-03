import { FC, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Material UI
import {
  Grid, Typography, Button, CircularProgress,
  LinearProgress,

} from '@mui/material';

import { selectOrders, setActiveOrder } from '../../../../../redux';
import { ArrowBack } from '@mui/icons-material';
import { getClient } from '../../../Clients/services';
import { useAsync, useFetchAndLoad } from '../../../../../hooks';
import { useSnackbar } from 'notistack';


import { IOrder, ITable } from '../../../../../models';

import { getOrder, statusModalDeleteOrder } from '../../services/orders.service';

import { OrderContext } from '../../context/Order.context';

import { MenuAddProduct } from '../../components/EditOrder/MenuAddProduct.component';

import { OrderSummary } from './components/';
import { Container, Stack, Box } from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { OrderDetails } from './components/OrderDetails.component';
import { useOrder } from '../../hooks';




export const EditOrder = () => {

  const navigate = useNavigate();

  const { orderId } = useParams();

  if (!orderId) navigate('/orders');

  const { reset } = useContext(OrderContext);

  const [orderDelivered, setOrderDelivered] = useState<boolean>(false)

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();

  const { activeOrder } = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  const {data, isLoading} = useOrder(orderId!);

  useEffect(() => {
    if (activeOrder) {
      setOrderDelivered(!!(activeOrder.details?.find(detail => detail.qtyDelivered > 0)))
    }
  }, [activeOrder])


  useEffect(() => {
  

    return () => {
      reset();
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

              <Stack
                spacing={1}
                direction={{ xs: 'column', md: 'row' }}
              >

                <Box
                  sx={{
                    flexBasis: '60%',
                  }}
                >

                  <OrderDetails
                    details={activeOrder.details}
                  />
                </Box>
                
                <Box
                  sx={{
                    flexBasis: '40%',
                  }}
                >

                <OrderSummary order={activeOrder} />
                </Box>
              </Stack>
            </>
         
        }

      </Container>



    </>
  )
}

