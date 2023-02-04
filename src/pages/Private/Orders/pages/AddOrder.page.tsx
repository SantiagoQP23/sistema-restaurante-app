import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Grid, Card, CardContent, Typography, TextField, IconButton, Divider } from '@mui/material';

import { MenuAddProduct } from '../components/EditOrder/MenuAddProduct.component';
import { DataClient } from '../components';
import { TableOrder } from '../components/ReceiptOrder/TableOrder.component';


import { useContext } from 'react';
import { Add, ArrowBack, EditOutlined } from '@mui/icons-material';
import { CardHeader, Box, } from "@mui/material"
import { OrderDetail } from "./../components"
import { OrderContext } from '../context/Order.context';
import { NewOrderDetail } from '../components/AddOrder/NewOrderDetail.component';
import { SocketContext } from '../../../../context/SocketContext';
import { CreateOrderDto } from '../dto/create-order.dto';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';
import { useSnackbar } from 'notistack';






const People: FC = () => {

  const { people, setPeople } = useContext(OrderContext);

  return (
    <>

      <TextField
        type='number'
        label='Personas'
        value={people}
        onChange={(e) => { setPeople(Number(e.target.value)) }}
      />

    </>
  )
}


export const OrderDetails = () => {


  const navigate = useNavigate();

  const { details } = useContext(OrderContext)


  return (

    <>

      <Box display='flex' justifyContent='space-between' alignItems='center' my={1}>

        <Typography variant="h3" fontWeight='bold'>Productos</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('products')}
          sx={{display: { xs: 'flex', md: 'none' }}}
        >
          <Add />
        </Button>

      </Box>

      <Divider sx={{ my: 1 }} />

      <Grid container spacing={1}>
        {
          details.map((detail) => (

            <Grid key={detail.product.name} item xs={12}>
              <NewOrderDetail detalle={detail} />
              <Divider sx={{ my: 1 }} />
            </Grid>

          ))

        }
      </Grid>

    </>
  )
}



export const AddOrder = () => {

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const { amount, reset, getOrder, details } = useContext(OrderContext);

  const cancelOrder = () => {
    navigate(-1);
    reset();
  }

  const { enqueueSnackbar } = useSnackbar();

  const submitAddOrder = () => {

    const order: CreateOrderDto = getOrder();

    socket?.emit(EventsEmitSocket.createOrder, order, (resp: SocketResponseOrder) => {

      console.log('orden creada', resp)
      if (resp.ok) {

        navigate('/orders');
        reset();
      } else {
        enqueueSnackbar(resp.msg, { variant: 'error' });
      }


    });



  }



  return (
    <>
      <Grid container spacing={1} >
        <Grid container item xs={12} md={7} spacing={1} justifyContent='space-between' >

          <Grid item display='flex' xs={12} alignContent='start'>

            <Button onClick={() => { navigate('/orders') }}>
              <ArrowBack />
            </Button>
            <Typography variant='h3'>Nuevo pedido</Typography>
          </Grid>

          <Grid item xs={12} sx={{
            display: {xs: 'none', md: 'flex'},
          }}>
            <MenuAddProduct />

          </Grid>


        </Grid>

        <Grid container item xs={12} md={5} spacing={1} alignItems='start'>

          <Grid item xs={12}>

            <Card>
              <CardContent>

                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography variant='h5' fontWeight='bold'>Nuevo pedido</Typography>

                  <Box>
                    {/* <Typography variant='subtitle1' >Mesa</Typography>
                    <Typography variant='h5' fontWeight='bold' align='right'>12</Typography> */}
                    <TableOrder />

                  </Box>

                </Box>

                <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

                  <DataClient />
                  {/* <Typography variant='h5' fontWeight='bold'>Cliente</Typography>
                  <Box display='flex' alignItems='center'>
                    <Typography variant='h5' fontWeight='bold'>Santiago Quirumbay </Typography>
                    <IconButton size='small'>
                      <EditOutlined />
                    </IconButton>
                  </Box> */}

                </Box>



                <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
                  <Typography variant='h5' fontWeight='bold'>Personas</Typography>

                  <People />

                  {/* <Box display='flex' alignItems='center'>
                    <Typography variant='h5' fontWeight='bold'>6</Typography>
                    <IconButton size='small'>
                      <EditOutlined />
                    </IconButton>
                  </Box> */}


                </Box>


                <Box >
                  <OrderDetails />

                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

                  <Typography variant='h4' fontWeight='bold'>Total </Typography>
                  <Typography variant='h4' fontWeight='bold'>${amount}</Typography>
                </Box>



                <Box mt={2}>
                  <Button variant='contained' disabled={details.length <= 0} onClick={submitAddOrder} fullWidth > Create Order</Button>

                </Box>


              </CardContent>


            </Card>

          </Grid>

          {/*  <Grid item xs={12} md={6}>
            <TableOrder />
          </Grid>

          <Grid item xs={12} md={6}>
            <People />
          </Grid>

          <Grid item xs={12} >
            <DataClient />
          </Grid>
          <Grid item xs={12}>

          </Grid> */}
        </Grid>


      </Grid>






    </>
  )
}