import { FC, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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




export const EditOrder = () => {

  const navigate = useNavigate();

  const { orderId } = useParams();

  if (!orderId) navigate('/orders');

  const { reset } = useContext(OrderContext);

  const [orderDelivered, setOrderDelivered] = useState<boolean>(false)

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();


  const getOrderCall = async () => await callEndpoint(getOrder(orderId!));

  const loadOrderState = async () => {
    console.log('loadOrderState')
    const resp = await getOrderCall();
    dispatch(setActiveOrder(resp.data))

  }

  const { activeOrder } = useSelector(selectOrders);



  const { enqueueSnackbar } = useSnackbar();



  useEffect(() => {
    if (activeOrder) {
      setOrderDelivered(!!(activeOrder.details?.find(detail => detail.qtyDelivered > 0)))
    }
  }, [activeOrder])


  useEffect(() => {
    loadOrderState();

    return () => {
      reset();
      setActiveOrder(null);
    }
  }, [])


  if (!activeOrder)
    return <></>;



  return (
    <>

      <Grid container spacing={2} display='flex' justifyContent='space-between' alignItems='center' sx={{ pb: 2 }}>
        <Grid item display='flex' md={6} alignItems='center'>
          <Button onClick={() => { navigate('/orders') }}>
            <ArrowBack />
          </Button>

          <Typography variant="h4" >Editar pedido</Typography>

        </Grid>

      </Grid>

    
      {
        loading
          ?
          <>
            <CircularProgress />
          </>
          :
          <Grid container spacing={1}>

            <Grid container spacing={1} item xs={12} sm={7} alignContent='start' sx={{
              display: { xs: 'none', md: 'flex' },
            }}>
              <MenuAddProduct />
            </Grid>

            <Grid item xs={12} sm={5} >

              <OrderSummary order={activeOrder} />



            </Grid>

          </Grid>
      }




    </>
  )
}

