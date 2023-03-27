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
        <CardHeader
          title={
            <Box display='flex' justifyContent='space-between' alignItems='center'>

              <Typography variant="body1" fontWeight='bold'>Mesa {table?.name}</Typography>



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


            </Box>}


          subheader={
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
          }

        />
        <Divider />
        <CardContent>

          {
            client &&
            <Typography variant="body1" >
              <b>Cliente: </b>{`${client.person.firstName} ${client.person.lastName}`}
            </Typography>
          }

          <Typography variant="body2" ><b>Mesero: </b>{`${user.person.firstName} ${user.person.lastName}`}</Typography>

        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>


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

          <Typography variant="body1" >$ {order.total}</Typography>

        </CardActions>
      </Card>





    </>
  )


}

