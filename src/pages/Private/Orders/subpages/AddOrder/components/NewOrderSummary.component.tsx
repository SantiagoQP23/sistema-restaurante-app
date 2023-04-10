import { FC, useContext } from "react";


import { Card, CardHeader, CardContent, Box, Button, Typography, TextField, Divider, Grid, Chip, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material';
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
import { Add, AddShoppingCartOutlined, DeliveryDining, LocalDining } from "@mui/icons-material";
import { useCreateOrder } from "../../../hooks/useCreateOrder";
import { LoadingButton } from "@mui/lab";


const People: FC = () => {

  const { people, setPeople } = useContext(OrderContext);

  return (
    <>

      <TextField
        type='number'
        value={people}
        onChange={(e) => { setPeople(Number(e.target.value)) }}
        size="small"
      />

    </>
  )
}






export const OrderDetails = () => {


  const navigate = useNavigate();

  const { details } = useContext(OrderContext)


  return (

    <>

      <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

        <Typography variant="h4" >Productos</Typography>

        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' } }}
          size="small"
          onClick={() => navigate('products')}
          color="primary"


        >

          <AddShoppingCartOutlined />
        </IconButton>

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

  const {createOrder, loading} = useCreateOrder();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const submitAddOrder = () => {

    const order: CreateOrderDto = getOrder();

    createOrder(order)

   



  }

  return (
    <Card>

      <CardHeader title='Información del pedido' />
      <CardContent>

        <Box
          display='flex' gap={2} alignItems='center'
          justifyContent='center'
        >
          <Box>

            <Typography variant='h5'>Tipo de orden</Typography>

            <ToggleButtonGroup
              value={typeOrder}
              onChange={(e, value) => setTypeOrder(value as TypeOrder)}
            >
              <ToggleButton
                value={"TAKE_AWAY"}
              >
                <DeliveryDining />
              </ToggleButton>
              <ToggleButton
                value={"IN_PLACE"}
              >
                <LocalDining />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

        </Box>

        <Box
          display='flex' 
          justifyContent='space-around'
        >


          <Box
          >


            <Typography variant='h5' mt={1}>Personas</Typography>
            <People />
          </Box>

          <Box
          >

            <Typography variant='h5' mt={1}>Mesa</Typography>
            <TableOrder />


          </Box>

        </Box>


        {/* <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

          <DataClient />
        </Box> */}

        <Box >
          <OrderDetails />

        </Box>


        <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

          <Typography variant='h4' fontWeight='bold'>Total </Typography>
          <Typography variant='h4' fontWeight='bold'>${amount}</Typography>
        </Box>



        <Box mt={2}>
          <LoadingButton 
          variant='contained' 
          disabled={details.length <= 0} 
          onClick={submitAddOrder} 
          fullWidth 
          loading={loading}
          >
            Crear pedido
          </LoadingButton>

        </Box>


      </CardContent>


    </Card>

  )
}