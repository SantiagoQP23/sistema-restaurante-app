import { FC, useContext, } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Card, CardHeader, Grid, CardContent, Box, Divider, Typography,
  Button, CardActions, IconButton, Tooltip, useTheme, Accordion, AccordionSummary, AccordionDetails, AccordionActions
} from '@mui/material';

import { ArrowBack, EditOutlined, EditTwoTone, ExpandMoreOutlined } from '@mui/icons-material';

import { formatDistance, subHours } from 'date-fns';
import { es } from 'date-fns/locale';

import { useSnackbar } from 'notistack';

import { useDispatch } from 'react-redux';

import { DetailInProgress } from './';
import { Label } from '../../../../../../components/ui';
import { SocketContext } from '../../../../../../context';
import { UpdateOrderDto } from '../../../dto/update-order.dto';
import { OrderStatus, IOrderDetail, TypeOrder } from '../../../../../../models/orders.model';
import { EventsEmitSocket } from '../../../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../../interfaces/responses-sockets.interface';
import { setActiveOrder } from '../../../../../../redux';

import { IOrder } from '../../../../../../models';
import { statusModalEditOrderDetail } from '../../../services/orders.service';

interface Props {
  order: IOrder;
  setStatusFilter?: (status: OrderStatus) => void;
}


const PendingDetail: FC<{ detail: IOrderDetail }> = ({ detail }) => {

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant='h4' color={detail.quantity === detail.qtyDelivered ? 'gray' : 'initial'}>
            {`${detail.quantity - detail.qtyDelivered}`} - {`${detail.product.name}`}
          </Typography>

          <Typography
            variant="inherit"

            color={detail.quantity === detail.qtyDelivered ? 'gray' : 'initial'}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {detail.description}
          </Typography>

        </Box>
      </Box>

    </>
  )

}


const DetailDispatched: FC<{ detail: IOrderDetail, orderId: string }> = ({ detail, orderId }) => {

  const theme = useTheme();

  const editDetail = () => {

    statusModalEditOrderDetail.setSubject(true, detail, orderId);
  }



  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">

        <Typography variant='h4' color='gray'
          sx={{
            textDecoration: 'line-through'
          }}
        >
          {`${detail.quantity}`} - {`${detail.product.name}`}

        </Typography>
        <Tooltip title="Editar detalle" arrow>
          <IconButton
            sx={{
              '&:hover': {
                background: theme.colors.primary.lighter
              },
              color: theme.palette.primary.main
            }}
            color="inherit"
            size="small"
            onClick={() => editDetail()}
          >
            <EditTwoTone fontSize="small" />
          </IconButton>
        </Tooltip>


      </Box>
    </>
  )

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


      <Accordion>

        <AccordionSummary
          expandIcon={<ExpandMoreOutlined />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >

          <Box>
            <Typography
              variant="body1"
              fontWeight='bold'
              
            >
              
              Mesa {order.table?.name}
              </Typography>
            <Typography variant="body1">
              {
              
              // restar 5 horas con datefns
              
              formatDistance(subHours(new Date(order.createdAt), 5), new Date(), {
                addSuffix: true,
                includeSeconds: true,
                locale: es


              })}

            </Typography>

            <Typography variant="body1">
              <b>De: </b>
              {order.user.person.firstName + ' ' + order.user.person.lastName}
            </Typography>
          </Box>





        </AccordionSummary>

        <Divider />

        <AccordionDetails>

          {
            order.status === OrderStatus.IN_PROGRESS
              ?
              <>
                {
                  details.filter(detail => detail.quantity !== detail.qtyDelivered)
                    .map(detail => (
                      <Grid key={detail.id} item xs={12} mt={1} >
                        <DetailInProgress detail={detail} orderId={order.id} />
                      </Grid>
                    ))

                }
                {
                  details.filter(detail => detail.quantity === detail.qtyDelivered)
                    .map(detail => (
                      <Grid key={detail.id} item xs={12} >
                        <DetailDispatched detail={detail} orderId={order.id} />
                      </Grid>
                    ))

                }

              </>

              :
              details.map(detail => (
                <Grid key={detail.id} item xs={12} >
                  <PendingDetail detail={detail} />
                </Grid>
              )
              )
          }


        </AccordionDetails>

        <AccordionActions >
          {
            order.status === OrderStatus.PENDING
              ? <Button
                fullWidth
                variant='contained'
                onClick={() => {
                  changeStatusOrder(OrderStatus.IN_PROGRESS)
                  setStatusFilter && setStatusFilter(OrderStatus.IN_PROGRESS)

                }}
              >Iniciar</Button>
              : order.status === OrderStatus.IN_PROGRESS
              &&
              < >
                <Button
                  fullWidth
                  startIcon={<ArrowBack />}
                  variant='outlined'
                  onClick={() => {
                    changeStatusOrder(OrderStatus.PENDING)
                    setStatusFilter && setStatusFilter(OrderStatus.PENDING)

                  }}
                  color='success'
                >
                  Pendiente
                </Button>
                <Button
                  fullWidth
                  startIcon={<EditOutlined />}
                  variant='contained'
                  onClick={() => {
                    navigate(`/orders/edit/${order.id}`)
                  }}
                >
                  Editar
                </Button>
                {/* <Button variant='contained' onClick={() => changeStatusOrder(OrderStatus.DELIVERED)}>Entregar todo</Button> */}

              </ >




          }


        </AccordionActions>



      </Accordion>




      {/* 
      <Card

      >
        <CardHeader

          title={
            <Box display='flex' justifyContent='space-between' alignItems='center'>

              <Typography variant="body1" fontWeight='bold'>Mesa {order.table?.name}</Typography>

              <Typography variant="body1" fontWeight='bold'>
                {formatDistance(new Date(order.createdAt), new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                  locale: es


                })}

              </Typography>
           

            </Box>}
          subheader={'De: ' + order.user.person.firstName + ' ' + order.user.person.lastName}
        />
        <Divider />
        <CardContent>

          <Grid container spacing={1}>
            {
              order.status === OrderStatus.IN_PROGRESS
                ?
                <>
                  {
                    details.filter(detail => detail.quantity !== detail.qtyDelivered)
                      .map(detail => (
                        <Grid key={detail.id} item xs={12} mt={1} >
                          <DetailInProgress detail={detail} orderId={order.id} />
                        </Grid>
                      ))

                  }
                  {
                    details.filter(detail => detail.quantity === detail.qtyDelivered)
                      .map(detail => (
                        <Grid key={detail.id} item xs={12} >
                          <DetailDispatched detail={detail} orderId={order.id} />
                        </Grid>
                      ))

                  }

                </>

                :
                details.map(detail => (
                  <Grid key={detail.id} item xs={12} >
                    <PendingDetail detail={detail} />
                  </Grid>
                )
                )
            }

          </Grid>


        </CardContent>

        <Divider />

        <CardActions sx={{
          justifyContent: 'space-between'
        }}>
          {
            order.status === OrderStatus.PENDING
              ? <Button
                fullWidth
                variant='contained'
                onClick={() => {
                  changeStatusOrder(OrderStatus.IN_PROGRESS)
                  setStatusFilter(OrderStatus.IN_PROGRESS)

                }}
              >Iniciar</Button>
              : order.status === OrderStatus.IN_PROGRESS
              &&
              < >
                <Button
                  fullWidth
                  startIcon={<ArrowBack />}
                  variant='outlined'
                  onClick={() => {
                    changeStatusOrder(OrderStatus.PENDING)
                    setStatusFilter(OrderStatus.PENDING)

                  }}
                  color='success'
                >
                  Pendiente
                </Button>
                <Button
                  fullWidth
                  startIcon={<EditOutlined />}
                  variant='contained'
                  onClick={() => {
                    navigate(`/orders/edit/${order.id}`)
                  }}
                >
                  Editar pedido
                </Button>

              </ >




          }
        </CardActions>



      </Card> */}


    </>

  )
}
