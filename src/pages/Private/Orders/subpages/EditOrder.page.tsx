import { FC, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate, useNavigationType } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Material UI
import {
  Grid, Typography, Button, Box, Card, CardContent, Paper, IconButton,

} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DoneOutline, DeleteOutline, Done, Add } from '@mui/icons-material';

import { selectOrders, setActiveOrder } from '../../../../redux';
import { ArrowBack } from '@mui/icons-material';
import { getClient } from '../../Clients/services';
import { useAsync, useFetchAndLoad } from '../../../../hooks';
import { useSnackbar } from 'notistack';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { InputSearch, Label } from '../../../../components/ui';
import { OrderDetails } from '../components/EditOrder/OrderDetails.component';

import { IOrder, ITable } from '../../../../models';

import { getOrder, statusModalDeleteOrder } from '../services/orders.service';
import { format } from 'date-fns';
import { TableOrder, DataClient } from '../components';

import { OrderContext } from '../context/Order.context';
import { ModalDeleteOrder } from '../components/EditOrder/ModalDeleteOrder.component';
import { Stack } from '@mui/system';
import { MenuAddProduct } from '../components/EditOrder/MenuAddProduct.component';
import { OrderStatus, OrderStatusSpanish } from '../../../../models/orders.model';
import { OrderTable } from '../components/EditOrder/OrderTable.component';
import { TextField } from '@mui/material';
import { SocketContext } from '../../../../context/SocketContext';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { SelectTypeOrder } from '../components/EditOrder/SelectTypeOrder.component';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { PeopleOrder } from '../components/EditOrder';


interface PropsOrder {
  order: IOrder
}

const Order: FC<PropsOrder> = ({ order }) => {

  const navigate = useNavigate();

  const [orderDelivered, setOrderDelivered] = useState<boolean>(false);



  useEffect(() => {
    if (order) {
      setOrderDelivered(!!(order.details?.find(detail => detail.qtyDelivered > 0)))
    }
  }, [order])


  const eliminarPedido = () => {

    statusModalDeleteOrder.setSubject(true, order)
  }


  return (
    <>
      <Card>
        <CardContent>

          <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
            <Box>
              <Typography variant='h4' fontWeight='bold'>Pedido N° {order.num}</Typography>
              {
              !order.isPaid && order.status === OrderStatus.DELIVERED
                ? <Label color='warning'>Por pagar</Label>
                :
                <Label color='info'>

                  {
                    order.isPaid
                      ? 'PAGADO'
                      : OrderStatusSpanish[`${order.status as OrderStatus}`]

                  }
                </Label>
                }
            </Box>

            <Box>
              <Button
                variant='contained'
                color='error'
                onClick={eliminarPedido}
                disabled={orderDelivered}
              >
                <DeleteOutline />
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('products')}
              >
                <ShoppingCartIcon />

              </Button>

            </Box>

          </Box>

          <SelectTypeOrder />




          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

            <Typography variant='h5'>Hora: {format(new Date(order?.createdAt), 'HH:mm')}</Typography>
            <OrderTable />
          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
            <Typography variant='body1'>Mesero: <b>{order.user.person.firstName} {order.user.person.lastName} </b></Typography>
            <Box sx={{ width: '100px' }}>
              <PeopleOrder people={order.people} />

            </Box>

          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

            <DataClient client={order?.client} />
          </Box>
          {/*  <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
            <Typography variant='h5' fontWeight='bold'>Personas</Typography>

            <People />
          </Box> */}


          <OrderDetails details={order.details} />



          <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

            <Typography variant='h4' fontWeight='bold'>Total </Typography>
            <Typography variant='h4' fontWeight='bold'>${order.amount}</Typography>
          </Box>
          <Box display='flex' justifyContent='center' alignItems='center'>

            <Button
              variant='contained'
              onClick={() => { navigate('receipt') }}

              sx={{ mt: 2 }}
            >
              Comprobante
            </Button>
          </Box>

        </CardContent>
      </Card>
    </>
  )

}



export const EditOrder = () => {

  const navigate = useNavigate();

  const { orderId } = useParams();

  if (!orderId) navigate('/orders');

  const { reset } = useContext(OrderContext);

  const [orderDelivered, setOrderDelivered] = useState<boolean>(false)


  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const getOrderCall = async () => await callEndpoint(getOrder(orderId!));

  const loadOrderState = (data: IOrder) => {
    dispatch(setActiveOrder(data))

  }
  useAsync(getOrderCall, loadOrderState, () => { });

  const { activeOrder } = useSelector(selectOrders);



  const { enqueueSnackbar } = useSnackbar();



  useEffect(() => {
    if (activeOrder) {
      setOrderDelivered(!!(activeOrder.details?.find(detail => detail.qtyDelivered > 0)))
    }
  }, [activeOrder])


  useEffect(() => {

    return () => {
      reset();
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


      <Grid container spacing={1}>

        <Grid container spacing={1} item xs={12} sm={7} alignContent='start' sx={{
          display: { xs: 'none', md: 'flex' },
        }}>
          <MenuAddProduct />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Order order={activeOrder} />

        </Grid>

      </Grid>





    </>
  )
}

