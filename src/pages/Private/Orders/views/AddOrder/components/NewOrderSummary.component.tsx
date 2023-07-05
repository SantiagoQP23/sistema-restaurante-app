import { FC, useContext, useState } from "react";


import { Card, CardHeader, CardContent, Box, Button, Typography, Grid, ToggleButtonGroup, ToggleButton, IconButton, List, ListItemButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack, Divider, TextField } from '@mui/material';
import { IClient, TypeOrder } from "../../../../../../models";
import { ModalClientOrder } from "../../../components";
import { TableOrder } from "../../../components/TableOrder.component";
import { OrderActionType, OrderContext } from "../../../context/Order.context";
import { CreateOrderDetailDto, CreateOrderDto } from "../../../dto/create-order.dto";

import { Add, AddOutlined, AddShoppingCartOutlined, DeliveryDining, EditOutlined, LocalDining, Visibility } from "@mui/icons-material";
import { useCreateOrder } from "../../../hooks/useCreateOrder";
import { LoadingButton } from "@mui/lab";
import { statusModalClientOrder } from "../../../services/sharing-information.service";
import { ComboBoxClient } from "../../../components/ComboBoxClient.component";
import { PeopleCounter } from "./PeopleCounter.component";
import { DesktopDatePicker, DesktopTimePicker, MobileDateTimePicker } from "@mui/x-date-pickers";


interface Props {
  step: number;
}



export const NewOrderSummary: FC<Props> = ({ step }) => {


  const { state, dispatch } = useContext(OrderContext);

  const { amount, table, people, details, typeOrder, client, deliveryTime, notes } = state;

  const [showClient, setShowClient] = useState<boolean>(!!client);

  const { createOrder, loading } = useCreateOrder();

  const [date, setDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    dispatch({ type: OrderActionType.SET_DELIVERY_TIME, payload: date })
  }

  const handleChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: OrderActionType.SET_NOTES, payload: e.target.value })
  }

  const submitAddOrder = () => {

    const order: CreateOrderDto = {

      clientId: client?.id || '',
      tableId: table?.id || '',
      details: details.map(detail => {


        const orderDetail: CreateOrderDetailDto = {
          productId: detail.product.id,
          quantity: detail.quantity,
          description: detail.description,
          price: detail.product.price

        }
        return orderDetail;
      }),
      notes,


      people,
      typeOrder

    };

    createOrder(order)


  }

  const openModalAddClient = () => {
    statusModalClientOrder.setSubject({ value: true });
  }

  return (
    <Box>


      <Card
        sx={{ mb: 2 }}
      >
        <Stack
          spacing={1}
          divider={<Divider />}
        >

          <Box>

            <CardHeader title='Información del pedido' />
            <CardContent>

              <Stack direction='column' spacing={2}>

                <TextField
                  id="descripcion-pedido"
                  label="Notas"
                  margin="dense"
                  multiline
                  rows={4}

                  // defaultValue={detail?.description}
                  fullWidth

                  value={notes}
                  onChange={handleChangeNotes}


                />


                <PeopleCounter />

              </ Stack>

            </CardContent>
          </Box>

          {/* <Box>

            <CardHeader title='Información del cliente'
              action={
                <IconButton
                  size='small'
                  onClick={() => setShowClient(!showClient)}
                >
                  {
                    !showClient && client
                      ? <Visibility />
                      : <EditOutlined />
                  }
                </IconButton>
              }
            />
            <CardContent>

              {
                showClient && client
                  ? (
                    <Box>
                      <Typography variant='h5' fontWeight='bold'>
                        {client.person.firstName + client?.person.lastName}
                      </Typography>
                      <Typography variant='body1'>
                        {client?.person.numPhone || 'Sin teléfono'}
                      </Typography>

                      <Typography variant='body1'>
                        {client?.person.email || 'Sin correo'}
                      </Typography>


                    </Box>)

                  : (
                    <>
                      <ComboBoxClient client={null} handleChangeClient={handleChangeClient} />

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

                    </>
                  )

              }


            </CardContent>
          </Box> */}

          <Box display='flex' justifyContent='space-between' alignItems='center' p={2}>

            <Typography variant='h4' fontWeight='bold'>Total </Typography>
            <Typography variant='h4' fontWeight='bold'>${details.reduce((acc, detail) => acc + detail.product.price * detail.quantity, 0)}</Typography>
          </Box>

        </Stack>




      </Card>

      {<LoadingButton
        variant='contained'
        disabled={details.length <= 0 || !(step === 1) || (!table && typeOrder === TypeOrder.IN_PLACE)}
        onClick={submitAddOrder}
        fullWidth
        loading={loading}
      >
        Crear pedido
      </LoadingButton>}

    </ Box>

  )
}