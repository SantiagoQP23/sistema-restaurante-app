import { FC, useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Card, CardHeader, Grid, CardContent, Box, Divider, Typography, Collapse,
  Button, CardActions, IconButton, Tooltip, useTheme, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Avatar, Tab, Tabs, Chip
} from '@mui/material';

import { ArrowBack, Check, CheckCircleOutline, EditOutlined, EditTwoTone, ExpandLess, ExpandMoreOutlined, PlayArrow, ExpandMore, TableRestaurant, Numbers, Person, DoneAll, Restaurant, PendingOutlined, AccessTimeOutlined, Done } from '@mui/icons-material';

import { formatDistance, subHours } from 'date-fns';
import { es } from 'date-fns/locale';

import { useSnackbar } from 'notistack';

import { useDispatch, useSelector } from 'react-redux';

import { DetailInProgress } from '.';
import { Label } from '../../../../../../components/ui';
import { SocketContext } from '../../../../../../context';
import { UpdateOrderDto } from '../../../dto/update-order.dto';
import { OrderStatus, IOrderDetail, TypeOrder } from '../../../../../../models/orders.model';
import { EventsEmitSocket } from '../../../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../../interfaces/responses-sockets.interface';
import { selectMenu, setActiveOrder } from '../../../../../../redux';

import { IOrder } from '../../../../../../models';
import { statusModalEditOrderDetail } from '../../../services/orders.service';
import { Stack, ListItemButton, ListItemText } from '@mui/material';
import { BtnAddProduct } from './BtnAddProduct.component';
import { queryClient } from '../../../../../../main';
import { useQueryClient } from '@tanstack/react-query';

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

enum StatusDetail {
  NOT_DELIVERED = 'NOT_DELIVERED',
  DELIVERED = 'DELIVERED'

}

export const ActiveOrder: FC<Props> = ({ order, setStatusFilter, color }) => {

  // const color= "primary";

  const { details } = order;


  const queryClient = useQueryClient();

  queryClient.prefetchQuery(['order', order.id], () => order)

  const { sections } = useSelector(selectMenu);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<boolean>(order.status === OrderStatus.DELIVERED ? true : false);

  const handleExpanded = () => {
    setExpanded(!expanded);
  };


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
      <Stack spacing={1} direction='row' my={1}>

        <Chip
          label={`N° ${order.num}`}

          icon={<Numbers />}

        />
        <Chip
          icon={<TableRestaurant />}
          label={
            order.type === TypeOrder.IN_PLACE

              ?
              `Mesa ${order.table?.name}`
              : 'Para llevar'

          }

        />

      </Stack>

      <Card

        sx={{

          // borderTop: (theme) => `1px solid ${theme.palette[color].main}`,
          border: (theme) => `1px solid ${theme.palette[color].main}`,
          borderBottom: (theme) => `5px solid ${theme.palette[color].main}`,
          // bgcolor: (theme) => theme.colors[color].lighter,
        }}
        variant='elevation'

      >



        <Stack
          sx={{ p: 1 }}
          spacing={1.5}
        >
          {/* <Stack
            direction='row'
            justifyContent='space-between'
          >



            <Box flexBasis='50%'   >
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

              </Typography>
            </Box> */}

          {/* <Box flexBasis='50%' >
              <Typography variant='body1' fontWeight='bold'>N° {order.num}</Typography>

            </Box> */}

          {/* </Stack> */}

          {
            order.client && (
              <Box>
                <Typography variant='caption'>Cliente</Typography>

                <Stack direction='row' spacing={1} alignItems='center'>

                  <Person color='secondary' fontSize='small' />
                  <Typography variant='body1' fontWeight='bold'>
                    {order.client?.person.firstName} {order.client?.person.lastName}
                  </Typography>
                </Stack>
              </Box>

            )
          }

          <Box>

            <Typography variant='caption'>Mesero</Typography>
            <Stack direction='row' spacing={1} alignItems='center'>

              <Person color='secondary' fontSize='small' />
              <Typography variant='body1' fontWeight='bold'>
                {order.user.person.firstName} {order.user.person.lastName}
              </Typography>
            </Stack>
          </Box>

          <Stack direction='row' spacing={1} alignItems='center'>

            <AccessTimeOutlined color='secondary' fontSize='small' />
            <Typography variant='body2'  >
              {'Creado ' +
                formatDistance(new Date(order.createdAt), new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                  locale: es
                })}
            </Typography>

          </Stack>

        </Stack>

        <Divider sx={{ mb: 0.5 }} />

        <Stack
          spacing={1.5}
          sx={{ px: 1 }}
        >

          <Tabs
            value={expanded ? 1 : 0}
            onChange={handleExpanded}
            indicatorColor='primary'

            sx={{
              '& .MuiTabs-indicator': {
                // backgroundColor: color + '.main',
                backgroundColor: 'transparent',

                // borderRadius: '10px 10px 0 0',
                borderColor: 'transparent',
                boxShadow: 'none',
                borderRadius: '0',

                // border: '0 0 3px 0 solid' + color + '.main',
                // border: `2px solid ${color + '.main'}`,
                color: color + '.main',

              },
              '& .MuiTab-indicatorSpan': {
                backgroundColor: color + '.main',
                borderRadius: '10px 10px 0 0',
                color: color + '.main',


              },
              '& .Mui-selected': {
                color: color + '.main',
                borderRadius: '0',
                borderBottom: (theme) => `4px solid ${theme.palette[color].main}`,
              },
              '& .Mui-selected:hover': {
                color: color + '.main',
              },

              // }, '& .MuiTab-root': {
              //   color: color === 'success' ? 'success.main' : color === 'error' ? 'error.main' : color === 'warning' ? 'warning.main' : color === 'info' ? 'info.main' : color === 'primary' ? 'primary.main' : 'secondary.main',

              //   border: `2px solid ${'color'+'.main'}`
              // }
            }}

          >
            <Tab disabled={order.status === OrderStatus.DELIVERED} label='Por entregar' />
            <Tab icon={<Done />} />
          </Tabs>


          {
            !expanded
              ? details.filter(detail => detail.quantity !== detail.qtyDelivered)
                .map(detail => (

                  <DetailInProgress key={detail.id} detail={detail} orderId={order.id} />

                ))
              :
              details.filter(detail => detail.quantity === detail.qtyDelivered).length >= 1
                ?
                details.filter(detail => detail.quantity === detail.qtyDelivered)
                  .map(detail => (

                    <DetailInProgress key={detail.id} detail={detail} orderId={order.id} />

                  ))
                : (
                  <Box>

                    <Typography variant='body1' color='gray' my={5} textAlign='center'>
                      No hay productos entregados
                    </Typography>
                  </Box>
                )


          }


          <BtnAddProduct order={order} />


        </Stack>


        <Divider sx={{ mt: 1 }} />

        <CardActions sx={{
          justifyContent: 'center',
        }}>




          {
            order.status === OrderStatus.PENDING
              ? <Button

                variant='contained'
                startIcon={<PlayArrow />}
                onClick={() => {
                  changeStatusOrder(OrderStatus.IN_PROGRESS)
                  setStatusFilter && setStatusFilter(OrderStatus.IN_PROGRESS)

                }}
                color={color}
              // size='small'


              >Iniciar</Button>
              : order.status === OrderStatus.IN_PROGRESS
              &&
              < >
                <Button
                  variant='outlined'
                  onClick={() => {
                    changeStatusOrder(OrderStatus.PENDING)
                    setStatusFilter && setStatusFilter(OrderStatus.PENDING)
                  }}
                  color={color}
                >
                  <ArrowBack />
                </Button>

                <Tooltip title="Entregar pedido. Próximamente." arrow>
                  <Button
                    variant='contained'
                    color={color}
                    // onClick={() => changeStatusOrder(OrderStatus.DELIVERED)}
                  ><DoneAll /></Button>
                </Tooltip>

              </ >




          }

          <Button
            onClick={() => {
              navigate(`/orders/list/edit/${order.id}`)
            }}
            // size='small'
            color={color}
            variant='outlined'
            startIcon={<EditOutlined />}

          >
            {/* <EditOutlined /> */}
            Editar
          </Button>

        </CardActions>


      </Card>



    </>

  )
}
