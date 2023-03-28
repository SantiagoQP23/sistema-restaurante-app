import { DeleteOutline, ShoppingCart } from "@mui/icons-material";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { format } from "date-fns";
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderStatus, OrderStatusSpanish } from "../../../../../../models";
import { DataClient } from "../../../components";
import { statusModalDeleteOrder } from "../../../services/orders.service";
import { OrderDetails } from "./OrderDetails.component";
import { OrderTable } from "./OrderTable.component";
import { PeopleOrder } from "./PeopleOrder.component";
import { SelectTypeOrder } from "./SelectTypeOrder.component";
import { IOrder } from '../../../../../../models/orders.model';
import { Label } from "../../../../../../components/ui";


interface PropsOrder {
  order: IOrder
}




export const OrderSummary: FC<PropsOrder> = ({ order }) => {

  const navigate = useNavigate();

  const [orderDelivered, setOrderDelivered] = useState<boolean>(false);



  useEffect(() => {
    if (order) {
      setOrderDelivered(!!(order.details?.find(detail => detail.qtyDelivered > 0)))
    }
  }, [order])


  const eliminarPedido = () => {

    statusModalDeleteOrder.setSubject(true, order)
  }


  return (
    <>
      <Card>
        <CardContent>

          <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
            <Box>
              <Typography variant='h4' fontWeight='bold'>Pedido N° {order.num}</Typography>
              {
              !order.isPaid && order.status === OrderStatus.DELIVERED
                ? <Label color='warning'>Por pagar</Label>
                :
                <Label color='info'>

                  {
                    order.isPaid
                      ? 'PAGADO'
                      : OrderStatusSpanish[`${order.status as OrderStatus}`]

                  }
                </Label>
                }
            </Box>

            <Box>
              <Button
                variant='contained'
                color='error'
                onClick={eliminarPedido}
                disabled={orderDelivered}
              >
                <DeleteOutline />
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('products')}
              >
                <ShoppingCart />

              </Button>

            </Box>

          </Box>

          <SelectTypeOrder />




          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

            <Typography variant='h5'>Hora: {format(new Date(order?.createdAt), 'HH:mm')}</Typography>
            <OrderTable />
          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
            <Typography variant='body1'>Mesero: <b>{order.user.person.firstName} {order.user.person.lastName} </b></Typography>
            <Box sx={{ width: '100px' }}>
              <PeopleOrder people={order.people} />

            </Box>

          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

            <DataClient client={order?.client} />
          </Box>
          {/*  <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
            <Typography variant='h5' fontWeight='bold'>Personas</Typography>

            <People />
          </Box> */}


          <OrderDetails details={order.details} />



          <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

            <Typography variant='h4' fontWeight='bold'>Total </Typography>
            <Typography variant='h4' fontWeight='bold'>${order.amount}</Typography>
          </Box>
          <Box display='flex' justifyContent='center' alignItems='center'>

            <Button
              variant='contained'
              onClick={() => { navigate('receipt') }}

              sx={{ mt: 2 }}
            >
              Comprobante
            </Button>
          </Box>

        </CardContent>
      </Card>
    </>
  )

}