import { FC, useState, useEffect, useContext } from 'react';

import { AddOutlined, CheckCircle, Circle, DeleteOutline, Edit, EditOutlined, Notes, Paid, Pending, PointOfSaleOutlined, Print, Receipt, ShoppingCart, Visibility } from "@mui/icons-material";
import { Card, CardContent, Box, Typography, Button, IconButton, CardHeader, Stack, Divider, Tooltip, Grid, TextField, ListItem, ListItemText, List, ListItemSecondaryAction, ListItemAvatar, Avatar, ListItemButton, Chip } from '@mui/material';
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { IClient, IUser, OrderStatus, OrderStatusSpanish } from "../../../../../../models";
import { statusModalDeleteOrder, statusModalDiscountOrder } from "../../../services/orders.service";

import { IOrder, TypeOrder } from '../../../../../../models/orders.model';
import { Label } from "../../../../../../components/ui";
import { statusModalClientOrder } from "../../../services/sharing-information.service";
import { ComboBoxClient } from "../../../components";
import { useUpdateOrder } from "../../../hooks/useUpdateOrder";
import { LabelStatusOrder } from "../../OrdersList/components/LabelStatusOrder.component";

import { OrderTable, PeopleCounter, OrderTypeSelector } from "./";
import { ComboBoxUser } from "../../../components/ComboBoxUser.component";
import { OrderContext } from '../../../context/Order.context';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useInvoiceStore } from '../../../store/invoiceStore';
import { InvoicesList } from './InvoicesList.component';
import { useModal } from '../../../../../../hooks';
import { ModalEditOrder } from './ModalEditOrder.component';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { LabelStatusPaid } from '../../../components/LabelStatusPaid.component';

interface PropsOrder {
  order: IOrder,
}




export const OrderSummary: FC<PropsOrder> = ({ order }) => {

  const navigate = useNavigate();



  const { handleClose, handleOpen, isOpen } = useModal();


  const { step: activeStep, handleNextStep } = useInvoiceStore(state => state)

  const [orderDelivered, setOrderDelivered] = useState<boolean>(false);

  const { updateOrder, loading } = useUpdateOrder()

  // const [showClient, setShowClient] = useState<boolean>(!!order.client)

  const [showUser, setShowUser] = useState<boolean>(!!order.user);

  const [notes, setNotes] = useState<string>(order.notes || '');

  const [date, setDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    setDate(date)
  }

  const handleChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value)
  }





  // const handleShowClient = () => {
  //   setShowClient(!showClient)
  // }

  const handleShowUser = () => {
    setShowUser(!showUser)
  }

  useEffect(() => {
    if (order) {
      setOrderDelivered(!!(order.details?.find(detail => detail.qtyDelivered > 0)))
    }
  }, [order])


  const handleChangeClient = (client: IClient | null) => {
    updateOrder({
      id: order.id,
      clientId: client?.id || 'none'
    })
  }

  const handleChangeUser = (user: IUser | null) => {

    console.log(user);

    if (!user) return

    updateOrder({
      id: order.id,
      userId: user?.id || 'none'
    })


  }

  const editClient = () => {
    statusModalClientOrder.setSubject({ value: true });
  }



  const openModalDiscount = () => {
    statusModalDiscountOrder.setSubject(true, order!);
  }

  const eliminarPedido = () => {

    statusModalDeleteOrder.setSubject(true, order)
  }


  return (
    <>

      <ModalEditOrder open={isOpen} closeModal={handleClose} order={order} />


      <Stack
        spacing={2}
      >

        <Stack
          direction='row'
          justifyContent='right'
          alignItems='center'
          spacing={1}
        >

          <LabelStatusOrder status={order.status} />

          <LabelStatusPaid isPaid={order.isPaid} />


          {/* <LabelStatusOrder status={
            order.status === OrderStatus.DELIVERED && !order.isPaid
              ? "unpaid"
              : order.status

          } /> */}




        </Stack>

        <Card>
          <CardHeader
            title={
              <>
                <Stack direction='column' spacing={1}>

                  {/* <LabelStatusOrder status={
                    order.status

                  } /> */}
                  <Typography variant='h4' fontWeight='bold' >

                    {/* <Circle sx={{ fontSize: 10, mr: 1 }} color={!(order.isClosed) ? 'success' : 'error'} /> */}

                    Pedido N° {order.num}

                    {/* <Label color={order.isPaid ? 'success' : 'warning'}>
                    {
                      order.isPaid ? 'Pagado' : 'Por pagar'
                    }
                  </Label> */}

                  </Typography>
                </Stack>

              </>
            }


            action={
              <Button
                onClick={handleOpen}
                size='small'
                startIcon={<Edit />}
              >
                Editar
              </Button>
            }

          // subheader={
          //   <Typography variant='h5' color={order.isClosed ? 'secondary' : 'success.main'} textTransform='uppercase'>{order.isClosed ? 'cerrado' : 'Abierto'}</Typography>
          // }
          />

          <CardContent>


            <Grid container spacing={2} alignItems='center'>

              <Grid item xs={4}>
                <Typography variant='body2' color='secondary'>Creado</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography variant="body1" >
                  {format(new Date(order.createdAt), 'dd/MM/yyy HH:mm')}
                </Typography>
              </Grid>

              <Grid item xs={12}>


                <Typography variant='h5' >Información de entrega</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='subtitle1' >Tipo de orden</Typography>

              </Grid>

              <Grid item xs={8}>

                <Typography variant="h6" >
                  {order.type === TypeOrder.IN_PLACE ? 'Para servir' : 'Para llevar'}

                </Typography>

              </Grid>

              {
                order.type === TypeOrder.IN_PLACE && (
                  <>
                    <Grid item xs={4}>
                      <Typography variant='body2' color='secondary'>Mesa</Typography>

                    </Grid>

                    <Grid item xs={8}>

                      <Typography variant="h6" >
                        Mesa {order.table?.name || 'No seleccionada'}

                      </Typography>

                    </Grid>
                  </>

                )
              }

              <Grid item xs={4}>
                <Typography variant='body2' color='secondary'>Hora de entrega</Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography variant="body1" >
                  {format(new Date(order.deliveryTime), 'dd/MM/yyy HH:mm')}
                </Typography>

              </Grid>

              <Grid item xs={4}>
                <Typography variant='body2' color='secondary'>Personas</Typography>

              </Grid>


              <Grid item xs={8}>

                <Typography variant="h6" >
                  {order.people}

                </Typography>

              </Grid>

              {
                order.notes
                && (
                  <>
                    <Grid item xs={12}>
                      <CardHeader

                        sx={{
                          px: 1,
                          py: 0.5
                        }}


                        avatar={<Notes />}
                        title='Notas'
                        titleTypographyProps={{
                          variant: 'subtitle2'

                        }}

                        subheaderTypographyProps={{
                          variant: 'h5',
                          color: 'inherith'
                        }}
                        subheader={order.notes}
                      />



                    </Grid>
                  </>
                )
              }


              <Grid
                item
                xs={12}
                display='flex'
                flexDirection='row'
                gap={1}
                alignItems='center'
                justifyContent='flex-end'
              >

                <Typography variant="h3">
                  {formatMoney(order.total)}

                </Typography>


              </Grid>
            </Grid>




            <Stack

              justifyContent='center'
              alignItems='flex-start'
              mt={2}
              spacing={1}
              direction='column'
            >


            </Stack>


          </CardContent>
        </Card>

        <Card>

          <Stack
            spacing={1}
            divider={<Divider />}
          >



            {
              activeStep === 0 &&
              <Box
              >

                <CardHeader
                  title='Mesero'
                  action={
                    <IconButton
                      onClick={handleShowUser}
                      size='small'
                    >
                      {
                        !showUser && order.user
                          ? <Visibility />
                          : <Edit />
                      }
                    </IconButton>
                  }
                />

                <CardContent>


                  {
                    showUser && order.user
                      ? (
                        <Stack spacing={0.5}>
                          <Typography variant='h5' fontWeight='bold'>
                            {order.user?.person.firstName + " " + order.user?.person.lastName}
                          </Typography>
                          <Typography variant='body1'>
                            {order.user?.person.numPhone || 'Sin teléfono'}
                          </Typography>

                          <Typography variant='body1'>
                            {order.user?.person.email || 'Sin correo'}
                          </Typography>

                        </Stack>

                      )
                      : (
                        <ComboBoxUser user={null} handleChangeUser={handleChangeUser} />
                      )
                  }

                  {/* <ComboBoxUser user={null} handleChangeUser={() => { }} /> */}

                </CardContent>

              </Box>
            }





          </Stack>
        </Card>



        {
          order.invoices.length > 0 && (

            <InvoicesList invoices={order.invoices} />
          )
        }


      </Stack>

    </>
  )

}