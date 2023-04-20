import { FC, useContext } from "react";


import { Card, CardHeader, CardContent, Box, Button, Typography, TextField, Divider, Grid, Chip, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material';
import { TypeOrder } from "../../../../../../models";
import { ModalClientOrder } from "../../../components";
import { TableOrder } from "../../../components/ReceiptOrder/TableOrder.component";
import { OrderContext } from "../../../context/Order.context";
import { SocketContext } from '../../../../../../context/SocketContext';
import { CreateOrderDto } from "../../../dto/create-order.dto";
import { EventsEmitSocket } from "../../../interfaces/events-sockets.interface";
import { SocketResponseOrder } from "../../../interfaces/responses-sockets.interface";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NewOrderDetail } from "./NewOrderDetail.component";
import { Add, AddOutlined, AddShoppingCartOutlined, DeliveryDining, EditOutlined, LocalDining } from "@mui/icons-material";
import { useCreateOrder } from "../../../hooks/useCreateOrder";
import { LoadingButton } from "@mui/lab";
import { statusModalClientOrder } from "../../../services/sharing-information.service";
import { ComboBoxClient } from "../../../components/ComboBoxClient.component";


const TextFieldPeople: FC = () => {

  const { people, setPeople } = useContext(OrderContext);

  return (
    <>

      <TextField
        type='number'
        value={people}
        onChange={(e) => { setPeople(Number(e.target.value)) }}
        size="small"
        fullWidth
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

  const { amount, reset, getOrder, details, setTypeOrder, typeOrder, client, setClient} = useContext(OrderContext);

  const { socket } = useContext(SocketContext);

  const { createOrder, loading } = useCreateOrder();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const submitAddOrder = () => {

    const order: CreateOrderDto = getOrder();

    createOrder(order)





  }

  const editClient = () => {
    statusModalClientOrder.setSubject({ value: true });
  }

  return (
    <Card>

      <CardHeader title='Información del pedido' />
      <CardContent>


        <Grid container spacing={1}
          alignItems='center'
          sx={{
            borderRadius: 1,
            bgcolor: '#f5f5f5',
            p: 1,

          }}
        >
          <Grid item xs={4}>

            <Typography variant='h5'>Tipo de orden</Typography>
          </Grid>
          <Grid item xs={8}>
            <ToggleButtonGroup
              value={typeOrder}
              onChange={(e, value) => setTypeOrder(value)}
              exclusive
            >
              <ToggleButton
                value={TypeOrder.TAKE_AWAY}
              >
                <DeliveryDining />
              </ToggleButton>
              <ToggleButton
                value={TypeOrder.IN_PLACE}
              >
                <LocalDining />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>


          <Grid item xs={4}>

            <Typography variant='h5' mt={1}>Personas</Typography>
          </Grid>


          <Grid item xs={8}>
            <TextFieldPeople />
          </Grid>


          {
            typeOrder === TypeOrder.IN_PLACE && (
              <>
                <Grid item xs={4}>
                  <Typography variant='h5' mt={1}>Mesa</Typography>

                </Grid>

                <Grid item xs={8}>
                  <TableOrder />
                </Grid>



              </>
            )
          }

          <Grid item xs={4}>

            <Typography variant='h5'>Cliente </Typography>

          </Grid>


          <Grid item xs={8} display='flex'>

            <ComboBoxClient client={client} handleChangeClient={setClient} />
            <IconButton
              size="small"
              onClick={editClient}

            >
              <AddOutlined />
            </IconButton>


          </Grid>

          <Grid item xs={4}>
          </Grid>


          <Grid item xs={8}>
          </Grid>

        </Grid>
        <Box
          display='flex'
          justifyContent='space-around'
        >


          <Box
          >




          </Box>


        </Box>


        {/* <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>




         

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