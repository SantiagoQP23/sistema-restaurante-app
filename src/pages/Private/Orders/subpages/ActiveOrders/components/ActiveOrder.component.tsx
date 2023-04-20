import { FC, useContext, } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Card, CardHeader, Grid, CardContent, Box, Divider, Typography,
  Button, CardActions, IconButton, Tooltip, useTheme, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Avatar
} from '@mui/material';

import { ArrowBack, Check, CheckCircleOutline, EditOutlined, EditTwoTone, ExpandMoreOutlined, PlayArrow } from '@mui/icons-material';

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
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary',
}


const PendingDetail: FC<{ detail: IOrderDetail }> = ({ detail }) => {

  return (
    <>
      {
        detail.quantity !== detail.qtyDelivered &&
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant='h5' color={detail.quantity === detail.qtyDelivered ? 'gray' : 'initial'}>
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

      }
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

        <Typography variant='h5' color='gray'
        // sx={{
        //   textDecoration: 'line-through'
        // }}
        >
          {`${detail.quantity}`} - {`${detail.product.name}`}

        </Typography>
        <Tooltip title="Editar detalle" arrow>
          <IconButton
            sx={{
              '&:hover': {
                background: theme.colors.primary.lighter
              },
              color: theme.palette.success.main
            }}
            color='success'
            size="small"
            onClick={() => editDetail()}

          >
            <CheckCircleOutline fontSize="small" />
          </IconButton>
        </Tooltip>


      </Box>
    </>
  )

}


function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}



function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}







export const ActiveOrder: FC<Props> = ({ order, setStatusFilter, color }) => {

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

      <Card

        sx={{
          m: 1,
          border: (theme) => `2px solid ${theme.palette[color].main}`,
        }}

      >

        <CardHeader
          title={
            <Typography
              variant="body1"
              fontWeight='bold'


            >
              {
                order.type === TypeOrder.IN_PLACE

                  ?
                  `Mesa ${order.table?.name}`
                  : 'Para llevar'

              }
              {
                order.client &&
                ` - ${order.client.person.firstName} ${order.client.person.lastName}`
              }
            </Typography>
          }

          subheader={
            <>
              {
                formatDistance(subHours(new Date(order.createdAt), 5), new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                  locale: es
                })}
            </>
          }

          avatar={
            <>
              <Avatar
                {...stringAvatar(order.user.person.firstName + ' ' + order.user.person.lastName)}
              />

            </>
          }
          sx={{
            mb: 1
          }}

        />



        <Box
        mx={1}
        display='flex'
        flexDirection='column'
        gap={1}
        >

          {
            order.status === OrderStatus.IN_PROGRESS || order.status === OrderStatus.DELIVERED
              ?
              <>
                {
                  details.filter(detail => detail.quantity !== detail.qtyDelivered)
                    .map(detail => (
                      
                        <DetailInProgress key={detail.id} detail={detail} orderId={order.id} />
                     
                    ))

                }
                <Divider sx={{ my: 1 }} />
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
        </Box>




        <CardActions>




          {
            order.status === OrderStatus.PENDING
              ? <Button
                fullWidth
                variant='text'
                startIcon={<PlayArrow />}
                onClick={() => {
                  changeStatusOrder(OrderStatus.IN_PROGRESS)
                  setStatusFilter && setStatusFilter(OrderStatus.IN_PROGRESS)

                }}
                color={color}

              >Iniciar</Button>
              : order.status === OrderStatus.IN_PROGRESS
              &&
              < >
                <Button
                  fullWidth
                  startIcon={<ArrowBack />}
                  variant='text'
                  onClick={() => {
                    changeStatusOrder(OrderStatus.PENDING)
                    setStatusFilter && setStatusFilter(OrderStatus.PENDING)

                  }}
                  color={color}

                >
                  Pendiente
                </Button>

                {/* <Button variant='contained' onClick={() => changeStatusOrder(OrderStatus.DELIVERED)}>Entregar todo</Button> */}

              </ >




          }
          <Button
            onClick={() => {
              navigate(`/orders/edit/${order.id}`)
            }}
            size='small'
            color={color}
          >
            <EditOutlined />
          </Button>

        </CardActions>
      </Card>

    </>

  )
}
