import { FC, useContext, } from 'react'
import { formatDistance } from 'date-fns';

import { Card, CardHeader, Grid, CardContent, Box, Divider, Typography, Button } from '@mui/material';
import { IOrder } from '../../../../models';
import { PendingDetail } from '../../Orders/components/ActiveOrders/PendingDetail.component';
import { Label } from '../../../../components/ui';
import { es } from 'date-fns/locale';
import CardActions from '@mui/material/CardActions';
import { SocketContext } from '../../../../context';
import { UpdateOrderDto } from '../../Orders/dto/update-order.dto';
import { OrderStatus } from '../../../../models/orders.model';
import { useSnackbar } from 'notistack';
import { EventsEmitSocket } from '../../Orders/interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../Orders/interfaces/responses-sockets.interface';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from '../../../../redux';
import { ArrowBack, EditOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


interface Props {
  order: IOrder;
  setStatusFilter: (status: OrderStatus) => void;
}




export const ActiveOrder: FC<Props> = ({ order, setStatusFilter }) => {

  const { details } = order;

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const changeStatusOrder = (status: OrderStatus) => {

    const data: UpdateOrderDto = {
      id: order.id,
      status
    }

    socket?.emit(EventsEmitSocket.updateOrder, data, (res: SocketResponseOrder) => {
      console.log(res);
      if (res.ok) {
        dispatch(setActiveOrder(res.order!));
      } else {
        enqueueSnackbar('No se pudo actualizar el cliente', { variant: 'error' })
      }
    });

  }






  return (
    <>


      <Card>
        <CardHeader
          title={
            <Box display='flex' justifyContent='space-between' alignItems='center'>

              <Typography variant="body1" fontWeight='bold'>Mesa {order.table?.name}</Typography>


              <Label color='success'>
                {formatDistance(new Date(order.createdAt), new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                  locale: es


                })}
              </Label>



            </Box>}
          subheader={'Santiago Quirumbay'}
        />
        <Divider />
        <CardContent>

          <Grid container spacing={1}>
            {
              order.status === OrderStatus.IN_PROGRESS
                ?
                details.map(detail => (
                  <Grid key={detail.id} item xs={12} >
                    <PendingDetail detail={detail} orderId={order.id} />
                  </Grid>
                ))
                :
                details.map(detail => (
                  <Grid key={detail.id} item xs={12} >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant='h4' color={detail.quantity === detail.qtyDelivered ? 'gray' : 'initial'}>
                          {`${detail.quantity - detail.qtyDelivered}`} - {`${detail.product.name}`}
                        </Typography>

                        <Typography variant="h6" color={detail.quantity === detail.qtyDelivered ? 'gray' : 'initial'}>
                          {detail.description}
                        </Typography>

                      </Box>
                    </Box>
                  </Grid>
                )
                )
            }


          </Grid>


        </CardContent>

        <Divider />

        <CardActions>
          {
            order.status === OrderStatus.PENDING
              ? <Button variant='contained' fullWidth onClick={() => {
                changeStatusOrder(OrderStatus.IN_PROGRESS)
                setStatusFilter(OrderStatus.IN_PROGRESS)

              }}>Iniciar</Button>
              : order.status === OrderStatus.IN_PROGRESS
              &&
              < >
                <Button
                  startIcon={<ArrowBack />}
                  variant='outlined'
                  onClick={() => {
                    changeStatusOrder(OrderStatus.PENDING)
                    setStatusFilter(OrderStatus.PENDING)

                  }}
                >
                  Pendiente
                </Button>
                <Button
                  startIcon={<EditOutlined />}
                  variant='contained'
                  onClick={() => {
                    navigate(`/orders/edit/${order.id}`)
                  }}
                >
                  Editar pedido
                </Button>
                {/* <Button variant='contained' onClick={() => changeStatusOrder(OrderStatus.DELIVERED)}>Entregar todo</Button> */}

              </ >




          }
        </CardActions>



      </Card>


    </>

  )
}
