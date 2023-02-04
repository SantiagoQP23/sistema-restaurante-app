import { FC, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
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
import { Order, OrderDetail } from '../components';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { InputSearch, Label } from '../../../../components/ui';
import { OrderDetails } from '../components/EditOrder/OrderDetails.component';

import { IOrder, ITable } from '../../../../models';

import { getOrder, statusModalDeleteOrder } from '../services/orders.service';
import { format } from 'date-fns';
import { TableOrder, DataClient } from '../components/';

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



const label = { inputProps: { 'aria-label': 'Switch demo' } };

interface PropsStatusOrder {
  status: boolean;
}

interface Props {
  people: number;
}


const PeopleOrder: FC<Props> = ({  }) => {


  const [people, setPeople] = useState<number>();

  const { socket } = useContext(SocketContext);

  const { activeOrder } = useSelector(selectOrders);



  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value)
    if (num < 1) return setPeople(1);

    setPeople(Number(event.target.value))
  }

  const updatePeopleOrder = () => {

    const data: UpdateOrderDto = {
      id: activeOrder!.id,
      people,
    }

    socket?.emit(EventsEmitSocket.updateOrder, data, (res: SocketResponseOrder) => {
      console.log(res);
      if (res.ok) {
        dispatch(setActiveOrder(res.order!));
      } else {
        enqueueSnackbar('No se pudo actualizar el cliente', { variant: 'error' })
      }
    });



  }


  useEffect(() => {

    setPeople(activeOrder?.people);

    return () => {
      setPeople(0);
    }
  }, [activeOrder])


  return (
    <>
      <Box display='flex'>


        <TextField
          type='number'
          label='Personas'
          value={people}
          onChange={handleChange}
          variant='standard'
        />

        {
          activeOrder?.people !== people &&
          <IconButton
            onClick={() => updatePeopleOrder()}


          >
            <Done />

          </IconButton>

        }
      </Box>

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


  const endEdit = () => {
    navigate('/orders');

  }

  const { activeOrder } = useSelector(selectOrders);



  const { enqueueSnackbar } = useSnackbar();

  const eliminarPedido = () => {

    statusModalDeleteOrder.setSubject(true, activeOrder!)
  }



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


  if (activeOrder.status === OrderStatus.PAID)
    return <Navigate to='receipt' />;


  return (
    <>

      <Grid container spacing={2} display='flex' justifyContent='space-between' alignItems='center' sx={{ pb: 2 }}>
        <Grid item display='flex' md={6}>
          <Button onClick={() => { navigate('/orders') }}>
            <ArrowBack />
          </Button>

          <Typography variant="h4" >Editar pedido</Typography>

        </Grid>

        <Grid container md={6} spacing={1} item >



          {
            <Grid item >


              <Button
                variant='contained'
                color='error'
                onClick={eliminarPedido}
                disabled={orderDelivered}
              >
                <DeleteOutline />

                Eliminar
              </Button>
            </Grid>

          }
                <Grid item>

          <Button
            variant='contained'
            onClick={() => { navigate('receipt') }}
          >
            Comprobante
          </Button>
          </Grid>

          <Grid item>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('products')}

          >

            <Add />
            Añadir productos
          </Button>
          </Grid>


        </Grid>

      </Grid>


      <Grid container spacing={1}>
        <Grid container spacing={1} item xs={12} sm={7} alignContent='start' sx={{
          display: {xs:'none', md:'flex'},


        }}>

          <MenuAddProduct />



        </Grid>

        <Grid item xs={12} sm={5}>

          <Card>
            <CardContent>



              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Box>
                  <Typography variant='h5' fontWeight='bold'>Pedido N° {activeOrder.num}</Typography>

                </Box>

                <Box>
                  {/* <Typography variant='subtitle1' >Mesa</Typography>
                    <Typography variant='h5' fontWeight='bold' align='right'>12</Typography> */}
                  <OrderTable />

                </Box>

              </Box>

              <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

                <Typography variant='h5'>Hora: {format(new Date(activeOrder?.createdAt), 'HH:mm')}</Typography>
                <Label color='info'>{OrderStatusSpanish[`${activeOrder.status as OrderStatus}`]}</Label>
              </Box>

              <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
                <Typography variant='body1'>Mesero: <b>{activeOrder.user.person.firstName} {activeOrder.user.person.lastName} </b></Typography>
                <Box sx={{ width: '100px' }}>
                  <PeopleOrder people={activeOrder.people} />

                </Box>

              </Box>

              <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

                <DataClient client={activeOrder?.client} />
              </Box>
              {/*  <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
            <Typography variant='h5' fontWeight='bold'>Personas</Typography>

            <People />
          </Box> */}


              <OrderDetails details={activeOrder.details} />



              <Box display='flex' justifyContent='space-between' alignItems='center'>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

                <Typography variant='h4' fontWeight='bold'>Total </Typography>
                <Typography variant='h4' fontWeight='bold'>${activeOrder.amount}</Typography>
              </Box>

            </CardContent>
          </Card>
        </Grid>


      </Grid>





    </>
  )
}

