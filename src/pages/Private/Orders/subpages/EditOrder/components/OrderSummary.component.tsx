import { AddOutlined, DeleteOutline, PointOfSaleOutlined, ShoppingCart } from "@mui/icons-material";
import { Card, CardContent, Box, Typography, Button, IconButton } from '@mui/material';
import { format } from "date-fns";
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IClient, OrderStatus, OrderStatusSpanish } from "../../../../../../models";
import { statusModalDeleteOrder } from "../../../services/orders.service";
import { OrderDetails } from "./OrderDetails.component";
import { OrderTable } from "./OrderTable.component";
import { PeopleOrder } from "./PeopleOrder.component";
import { SelectTypeOrder } from "./SelectTypeOrder.component";
import { IOrder, TypeOrder } from '../../../../../../models/orders.model';
import { Label } from "../../../../../../components/ui";
import { statusModalClientOrder } from "../../../services/sharing-information.service";
import { ComboBoxClient } from "../../../components";
import { useUpdateOrder } from "../../../hooks/useUpdateOrder";


interface PropsOrder {
  order: IOrder
}




export const OrderSummary: FC<PropsOrder> = ({ order }) => {

  const navigate = useNavigate();

  const [orderDelivered, setOrderDelivered] = useState<boolean>(false);

  const {updateOrder, loading} = useUpdateOrder()



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

            </Box>

            <Box display='flex' gap={1}>
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

          </Box>

          <SelectTypeOrder />




          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
            <Box>

              <Typography variant='h5'>Hora: </Typography>
              <Typography variant='body1'>{format(new Date(order.createdAt), 'HH:mm')}</Typography>
            </Box>
            {
              order.type === "IN_PLACE" as TypeOrder &&
              <OrderTable />

            }
          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
            <Box>
              <Typography variant='body1' fontWeight='bold'>Mesero: </Typography>
              <Typography>
                {order.user.person.firstName} {order.user.person.lastName}
              </Typography>

            </Box>
            <Box sx={{ width: '100px' }}>
              <PeopleOrder people={order.people} />

            </Box>

          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
            <ComboBoxClient client={order.client || null} handleChangeClient={handleChangeClient}/>
            <IconButton
              size="small"
              onClick={editClient}

            >
              <AddOutlined />
            </IconButton>
          </Box>

          {/* <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

            <DataClient client={order?.client} />
          </Box> */}
          {/*  <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
            <Typography variant='h5' fontWeight='bold'>Personas</Typography>

            <People />
          </Box> */}


          <OrderDetails details={order.details} />



          <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

            <Typography variant='h4' fontWeight='bold'>Total </Typography>
            <Typography variant='h4' fontWeight='bold'>${order.amount}</Typography>
          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>
            <Button
              variant='outlined'
              color='error'
              onClick={eliminarPedido}
              disabled={orderDelivered}
              size='small'
            >
              <DeleteOutline />
            </Button>

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
    </>
  )

}