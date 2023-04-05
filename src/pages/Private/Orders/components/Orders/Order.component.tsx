import { FC, } from 'react';
import { useNavigate } from 'react-router-dom';


import { format, formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

import { Box, IconButton, Typography, Card, CardContent, CardHeader, Divider } from '@mui/material';

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

import { DeleteOutline, EditOutlined } from '@mui/icons-material';


import { IOrder } from '../../../../../models';



import { Label } from '../../../../../components/ui';

import { CardActions } from '@mui/material/';

import { statusModalDeleteOrder } from '../../services/orders.service';
import { OrderStatus, OrderStatusSpanish } from '../../../../../models/orders.model';

interface Props {
  order: IOrder
}


export const Order: FC<Props> = ({ order }) => {


  const { client, user, table } = order;

  const orderDelivered = order.details.find(detail => detail.qtyDelivered > 0);


  let navigate = useNavigate();


  const eliminarPedido = () => {

    statusModalDeleteOrder.setSubject(true, order)

  }



  return (

    <>


      <Card>

        <CardContent>
          <Box display='flex' justifyContent='space-between' alignItems='center'>

            <Box>
              <Typography variant="body1" fontWeight='bold'>Mesa {table?.name}</Typography>
              <Typography variant="subtitle1">
                {
                  // formatDistance(new Date(order.createdAt), new Date(), {
                  //   addSuffix: true,
                  //   includeSeconds: true,
                  //   locale: es
                  // })
                  format(new Date(order.createdAt), 'dd MMMM HH:mm:ss', { locale: es })

                }
              </Typography>

            </Box>


            {
              <Label
                color={
                  order.status === OrderStatus.PENDING
                    ? 'success'
                    : order.status === OrderStatus.DELIVERED && !order.isPaid
                      ? 'warning'

                      : order.status === OrderStatus.CANCELLED
                        ? 'error'
                        : order.status === OrderStatus.DELIVERED && order.isPaid
                          ? 'info'
                          : 'primary'
                }
              >
                {
                  order.status === OrderStatus.DELIVERED && !order.isPaid
                  ? 'POR PAGAR'
                  : OrderStatusSpanish[order.status]}
              </Label>
            }


          </Box>



          {
            client &&
            <Typography variant="body1" >
              <b>Cliente: </b>{`${client.person.firstName} ${client.person.lastName}`}
            </Typography>
          }

          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" ><b>Mesero: </b>{`${user.person.firstName} ${user.person.lastName}`}</Typography>
          <Typography variant="body1" ><b>Total: </b> $ {order.total}</Typography>



        </CardContent>
        <CardActions
          sx={{ justifyContent: 'right' }}
        >

          <Box>


            {

              order.isPaid
                ?
                <IconButton
                  color='primary'
                  onClick={() => { navigate(`edit/${order.id}`) }}
                >
                  <AssignmentOutlinedIcon />

                </IconButton>
                :
                <IconButton
                  color='primary'
                  onClick={() => { navigate(`edit/${order.id}`) }}
                >
                  <EditOutlined />


                </IconButton>}

            {
              order.status === OrderStatus.PENDING && !orderDelivered && (
                <IconButton
                  onClick={eliminarPedido}
                  color='error'
                >

                  <DeleteOutline />
                </IconButton>

              )

            }
          </Box>
        </CardActions>


      </Card>





    </>
  )


}

