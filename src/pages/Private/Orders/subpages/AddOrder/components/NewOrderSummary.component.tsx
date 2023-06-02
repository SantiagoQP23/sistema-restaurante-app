import { FC, useContext } from "react";


import { Card, CardHeader, CardContent, Box, Button, Typography, TextField, Divider, Grid, Chip, ToggleButtonGroup, ToggleButton, IconButton, List, ListItemButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack } from '@mui/material';
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

  const handleChangePeople = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (Number(e.target.value) <= 0) return;

    setPeople(Number(e.target.value));

  }

  return (
    <>

      <TextField
        type='number'
        value={people}
        onChange={handleChangePeople}

        fullWidth
        label='Personas'


      />

    </>
  )
}






export const OrderDetails = () => {


  const navigate = useNavigate();

  const { details, getTotalProducts } = useContext(OrderContext)


  const totalProducts = getTotalProducts();

  return (

    <>

      <Card>

        <CardHeader
          title='Productos'
          subheader={`Total: ${totalProducts}`}
          action={
            <>
              <IconButton
                // sx={{ display: { xs: 'flex', md: 'none' } }}
                size="small"
                onClick={() => navigate('/orders/menu')}
                color="primary"


              >

                <AddShoppingCartOutlined />
              </IconButton>
            </>
          }
        />

        <Divider />


        <TableContainer>

          <Table>

            <TableHead>
              <TableRow>
                <TableCell>
                  Cantidad
                </TableCell>
                <TableCell>
                  Producto
                </TableCell>
                <TableCell>
                  Descripción
                </TableCell>
                <TableCell>
                  Subtotal
                </TableCell>
                <TableCell>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>


              {
                details.length > 0
                  ? details.map((detail) => (
                    <>
                      <NewOrderDetail detalle={detail} />
                    </>


                  ))
                  : (<TableRow>
                    <TableCell colSpan={5}>

                      <Typography variant='body1' align='center' my={5}>No se han añadido productos</Typography>
                    </TableCell>
                  </TableRow>)

              }
            </TableBody>
          </Table>
        </TableContainer>



      </Card>

    </>
  )
}




export const NewOrderSummary = () => {

  const { amount, reset, getOrder, details, setTypeOrder, typeOrder, client, setClient } = useContext(OrderContext);

  const { socket } = useContext(SocketContext);

  const { createOrder, loading } = useCreateOrder();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const submitAddOrder = () => {

    const order: CreateOrderDto = getOrder();

    createOrder(order)


  }

  console.log(client);

  const editClient = () => {
    statusModalClientOrder.setSubject({ value: true });
  }

  return (
    <Box>
      <Card
        sx={{ mb: 2 }}
      >

        <CardHeader title='Información del pedido' />
        <CardContent>


          <Grid container spacing={2}
            alignItems='center'

          >

            <Grid item xs={12}>
              <ToggleButtonGroup
                value={typeOrder}
                onChange={(e, value) => setTypeOrder(value)}
                exclusive
                size="small"
                fullWidth
              >
                <ToggleButton
                  value={TypeOrder.TAKE_AWAY}
                >
                  <DeliveryDining />
                  Para llevar
                </ToggleButton>
                <ToggleButton
                  value={TypeOrder.IN_PLACE}
                >
                  <LocalDining />
                  Para servir
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>



            <Grid item xs={6}>
              {/* <Typography variant='h6'>Personas</Typography> */}
              <TextFieldPeople />
            </Grid>


            {
              typeOrder === TypeOrder.IN_PLACE && (
                <>

                  <Grid item xs={6}>
                    {/* <Typography variant='subtitle1'>Mesa</Typography> */}
                    <TableOrder />
                  </Grid>



                </>
              )
            }


            <Grid item xs={12} >


              <ComboBoxClient client={client} handleChangeClient={setClient} />

              <Box display='flex' flexDirection='row-reverse' mt={1}>

                <Button
                  size="small"
                  onClick={editClient}
                  startIcon={<AddOutlined />}
                  variant="outlined"
                >
                  Nuevo cliente
                </Button>

              </Box>
            </Grid>

          </Grid>

          <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

            <Typography variant='h4' fontWeight='bold'>Total </Typography>
            <Typography variant='h4' fontWeight='bold'>${amount}</Typography>
          </Box>


        </CardContent>


      </Card>

      <LoadingButton
        variant='contained'
        disabled={details.length <= 0}
        onClick={submitAddOrder}
        fullWidth
        loading={loading}
      >
        Crear pedido
      </LoadingButton>

    </ Box>

  )
}