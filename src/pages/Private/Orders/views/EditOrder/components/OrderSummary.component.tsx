import { FC, useState, useEffect } from "react";

import { AddOutlined, DeleteOutline, EditOutlined, PointOfSaleOutlined, ShoppingCart } from "@mui/icons-material";
import { Card, CardContent, Box, Typography, Button, IconButton, CardHeader, Stack, Divider, Tooltip, Grid } from '@mui/material';
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { IClient, OrderStatus, OrderStatusSpanish } from "../../../../../../models";
import { statusModalDeleteOrder, statusModalDiscountOrder } from "../../../services/orders.service";

import { IOrder, TypeOrder } from '../../../../../../models/orders.model';
import { Label } from "../../../../../../components/ui";
import { statusModalClientOrder } from "../../../services/sharing-information.service";
import { ComboBoxClient } from "../../../components";
import { useUpdateOrder } from "../../../hooks/useUpdateOrder";
import { LabelStatusOrder } from "../../OrdersList/components/LabelStatusOrder.component";

import { OrderTable, PeopleCounter, OrderTypeSelector } from "./";

interface PropsOrder {
  order: IOrder
}




export const OrderSummary: FC<PropsOrder> = ({ order }) => {

  const navigate = useNavigate();

  const [orderDelivered, setOrderDelivered] = useState<boolean>(false);

  const { updateOrder, loading } = useUpdateOrder()



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

      <Stack
        spacing={1}
      >

        <Card>
          <CardHeader
            title='Información del pedido'
          />
          <CardContent>

            <Grid container spacing={2}>

              <Grid item xs={12} >
                <OrderTypeSelector />
              </Grid>

              <Grid item xs={6} >
                <PeopleCounter people={order.people} />
              </Grid>

              {
                order.type === "IN_PLACE" as TypeOrder &&
                (
                  <>
                    <Grid item xs={6} >
                      <OrderTable />
                    </Grid>
                  </>
                )

              }

              <Grid item xs={12} >
                <ComboBoxClient client={order.client || null} handleChangeClient={handleChangeClient} />
              </Grid>

            </Grid>

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


          </CardContent>
        </Card>


        <Card>
          <CardContent>

            <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
              <Box>
                <Typography variant='h4' fontWeight='bold'>Pedido N° {order.num}</Typography>

              </Box>

              <Box display='flex' gap={1}>
                <LabelStatusOrder status={
                  order.status === OrderStatus.DELIVERED && !order.isPaid
                    ? "unpaid"
                    : order.status

                } />



              </Box>

            </Box>


            <Divider sx={{ mb: 1 }} />

            <Stack spacing={1}>

              <Box display='flex' justifyContent='space-between' alignItems='center' >

                <Typography variant='h5'>Hora: </Typography>
                <Typography variant='body1'>{format(new Date(order.createdAt), 'dd/MM/yyy HH:mm')}</Typography>

              </Box>

              <Box display='flex' justifyContent='space-between' alignItems='center' >
                <Typography variant='body1' fontWeight='bold'>Mesero: </Typography>
                <Typography>
                  {order.user.person.firstName} {order.user.person.lastName}
                </Typography>



              </Box>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Box display='flex' justifyContent='space-between' alignItems='center' >

              <Typography variant='subtitle1' >Subtotal </Typography>
              <Typography variant='h5' fontWeight='bold'>$ {order.amount}</Typography>
            </Box>


            <Box display='flex' justifyContent='space-between' alignItems='center' >

              <Box display='flex' alignItems='center'>

                <Typography variant='subtitle1' >Descuento </Typography>
                <Button
                  onClick={openModalDiscount}
                  disabled={order.isPaid}
                  color="secondary"

                >
                  editar
                </Button>

              </Box>
              <Typography variant='h5' fontWeight='bold'>$ {order.discount}</Typography>
            </Box>



            <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

              <Typography variant='h4' fontWeight='bold'>Total </Typography>
              <Typography variant='h4' fontWeight='bold'>${order.amount}</Typography>
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='flex-start' mt={2}>

              <Box>

                <Tooltip
                  title={!orderDelivered
                    ? 'Eliminar pedido' :
                    'Este pedido no se puede eliminar porque ya tiene productos entregados'}
                >
                  <span>

                    <Button
                      startIcon={<DeleteOutline />}
                      color='error'
                      onClick={eliminarPedido}
                      disabled={orderDelivered}
                     
                    >
                      Eliminar
                    </Button>
                  </span>
                </Tooltip>

                {
                  orderDelivered &&
                  <Typography variant='subtitle1'></Typography>
                }
              </Box>
              <Button
                variant='contained'
                onClick={() => { navigate('receipt') }}

                startIcon={<PointOfSaleOutlined />}
                color="primary"

              >
                Pago
              </Button>
            </Box>


          </CardContent>
        </Card>
      </Stack>

    </>
  )

}