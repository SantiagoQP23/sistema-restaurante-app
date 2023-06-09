import { FC, useContext } from "react";


import { Card, CardHeader, CardContent, Box, Button, Typography, Grid, ToggleButtonGroup, ToggleButton, IconButton, List, ListItemButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack } from '@mui/material';
import { IClient, TypeOrder } from "../../../../../../models";
import { ModalClientOrder } from "../../../components";
import { TableOrder } from "../../../components/TableOrder.component";
import { OrderActionType, OrderContext } from "../../../context/Order.context";
import { CreateOrderDetailDto, CreateOrderDto } from "../../../dto/create-order.dto";

import { Add, AddOutlined, AddShoppingCartOutlined, DeliveryDining, EditOutlined, LocalDining } from "@mui/icons-material";
import { useCreateOrder } from "../../../hooks/useCreateOrder";
import { LoadingButton } from "@mui/lab";
import { statusModalClientOrder } from "../../../services/sharing-information.service";
import { ComboBoxClient } from "../../../components/ComboBoxClient.component";
import { PeopleCounter } from "./PeopleCounter.component";



export const NewOrderSummary = () => {


  const { state, dispatch } = useContext(OrderContext);

  const { amount, table, people, details, typeOrder, client } = state;

  const { createOrder, loading } = useCreateOrder();

  const submitAddOrder = () => {

    const order: CreateOrderDto = {

      clientId: client?.id || '',
      tableId: table?.id || '',
      details: details.map(detail => {


        const orderDetail: CreateOrderDetailDto = {
          productId: detail.product.id,
          quantity: detail.quantity,
          description: detail.description
        }
        return orderDetail;
      }),

      people,
      typeOrder

    };

    createOrder(order)


  }

  const handleChangeClient = (value: IClient | null) => {

    dispatch({ type: OrderActionType.SET_CLIENT, payload: value })

  }


  const openModalAddClient = () => {
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
                onChange={(e, value) => dispatch({ type: OrderActionType.SET_TYPE_ORDER, payload: value })}
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



            <Grid item xs={6 }>
              <PeopleCounter />
            </Grid>


            {
              typeOrder === TypeOrder.IN_PLACE && (
                <>

                  <Grid item xs={6}>
                    <TableOrder />
                  </Grid>



                </>
              )
            }


            <Grid item xs={12} >


              <ComboBoxClient client={client} handleChangeClient={handleChangeClient} />

              <Box display='flex' flexDirection='row-reverse' mt={1}>

                <Button
                  size="small"
                  onClick={openModalAddClient}
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
            <Typography variant='h4' fontWeight='bold'>${details.reduce((acc, detail) => acc + detail.product.price * detail.quantity, 0)}</Typography>
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