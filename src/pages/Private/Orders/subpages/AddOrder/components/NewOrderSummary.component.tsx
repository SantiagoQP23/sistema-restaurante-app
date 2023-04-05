import { FC, useContext } from "react";


import { Card, CardHeader, CardContent, Box, Button, Typography, TextField, Divider, Grid } from "@mui/material";
import { TypeOrder } from "../../../../../../models";
import { DataClient } from "../../../components";
import { TableOrder } from "../../../components/ReceiptOrder/TableOrder.component";
import { OrderContext } from "../../../context/Order.context";
import { SocketContext } from '../../../../../../context/SocketContext';
import { CreateOrderDto } from "../../../dto/create-order.dto";
import { EventsEmitSocket } from "../../../interfaces/events-sockets.interface";
import { SocketResponseOrder } from "../../../interfaces/responses-sockets.interface";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NewOrderDetail } from "./NewOrderDetail.component";
import { Add } from "@mui/icons-material";


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

        <Typography variant="h4" >Productos</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('products')}
          sx={{ display: { xs: 'flex', md: 'none' } }}
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




export const NewOrderSummary = () => {

  const { amount, reset, getOrder, details, setTypeOrder, typeOrder } = useContext(OrderContext);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

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
    <Card>

      <CardHeader title='Datos del pedido' />
      <CardContent>

        <Box display='flex' gap={2} justifyContent='center'>

          {
            Object.keys(TypeOrder).map((key) => (
              <Button
                variant={typeOrder === key ? "contained" : "outlined"}
                key={key}
                sx={{

                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white'
                  }

                }}

                onClick={() => setTypeOrder(key as TypeOrder)}


              >
                {TypeOrder[`${key}` as keyof typeof TypeOrder]}
              </Button>
            ))
          }

        </Box>

        <Box display='flex' gap={1} alignItems='center' my={2}>

          {
            typeOrder === "IN_PLACE" as TypeOrder &&
            <TableOrder />
          }

          <People />

        </Box>


        <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

          <DataClient />
        </Box>

        <Box >
          <OrderDetails />

        </Box>


        <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

          <Typography variant='h4' fontWeight='bold'>Total </Typography>
          <Typography variant='h4' fontWeight='bold'>${amount}</Typography>
        </Box>



        <Box mt={2}>
          <Button variant='contained' disabled={details.length <= 0} onClick={submitAddOrder} fullWidth >Crear pedido</Button>

        </Box>


      </CardContent>


    </Card>

  )
}