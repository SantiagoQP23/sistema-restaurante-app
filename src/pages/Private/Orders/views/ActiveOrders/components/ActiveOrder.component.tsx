import { FC, useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Card, CardHeader, Grid, CardContent, Box, Divider, Typography, Collapse, ToggleButton, ToggleButtonGroup, Radio, RadioGroup,
  Button, CardActions, IconButton, Tooltip, useTheme, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Avatar, Tab, Tabs, Chip
} from '@mui/material';

import { ArrowBack, Check, CheckCircleOutline, EditOutlined, EditTwoTone, ExpandLess, ExpandMoreOutlined, PlayArrow, ExpandMore, TableRestaurant, Numbers, Person, DoneAll, Restaurant, PendingOutlined, AccessTimeOutlined, Done, MoreVert, Edit, ArrowRight, ArrowForward, Undo, PlayCircleOutline } from '@mui/icons-material';

import { format, formatDistance, subHours } from 'date-fns';
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
import { statusModalEditOrderDetail, statusModalStartOrder } from '../../../services/orders.service';
import { Stack, ListItemButton, ListItemText, FormControlLabel } from '@mui/material';
import { BtnAddProduct } from './BtnAddProduct.component';
import { queryClient } from '../../../../../../main';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateOrder } from '../../../hooks/useUpdateOrder';
import { LabelStatusOrder } from '../../OrdersList/components/LabelStatusOrder.component';
import { useOrderHelper } from '../../../hooks/useOrders';

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

  const { getFirstPendingOrder } = useOrderHelper();


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

  const { updateOrder, loading } = useUpdateOrder()


  const handleStartOrder = (order: IOrder) => {

    // TODO
    // Obtener el primer pedido pendiente 
    const firstOrder = getFirstPendingOrder();

    if (firstOrder.id === order.id) {
      // Si el pedido es el primero en la lista de pedidos pendientes
      // se puede iniciar
      changeStatusOrder(OrderStatus.IN_PROGRESS);
      
      console.log('es el primero')
    } else {
      // Si el pedido no es el primero en la lista de pedidos pendientes
      console.log('hay un pedido pendiente')



      statusModalStartOrder.setSubject({ value: true, order });
    }

  }



  const changeStatusOrder = (status: OrderStatus) => {

    const data: UpdateOrderDto = {
      id: order.id,
      status
    }

    updateOrder(data);

  }

  return (
    <>

      {/* <Stack direction='row' spacing={1} alignItems='center'>

<AccessTimeOutlined color='secondary' fontSize='small' />
<Typography variant='body2'  >
  {'Creado ' +
    formatDistance(new Date(order.createdAt), new Date(), {
      addSuffix: true,
      includeSeconds: true,
      locale: es
    })}
</Typography>

</Stack> */}


      <Card

        sx={{

          // borderTop: (theme) => `1px solid ${theme.palette[color].main}`,
          // border: (theme) => `2px solid ${theme.palette[color].main}`,
          borderTop: (theme) => `5px solid ${theme.palette[color].main}`,
          backgroundColor: (theme) => `${theme.colors.alpha.black}`,
        }}
        variant='elevation'

      >

        <CardHeader
          title={
            <Stack spacing={1} direction='row' my={1} alignItems='flex-end' >

              <Typography variant='h3'>{`N° ${order.num}`}</Typography>


              {/* <Chip
                icon={<TableRestaurant />}
                label={
                  <Typography variant='h5'> {
                    order.type === TypeOrder.IN_PLACE

                      ?
                      `Mesa ${order.table?.name || ''}`
                      : 'Para llevar'

                  }</Typography>
                }

                variant={order.type === TypeOrder.IN_PLACE ? 'filled' : 'outlined'}

              /> */}

            </Stack>

          }

          subheader={
            <Stack direction='row' spacing={1} alignItems='center'>

              <AccessTimeOutlined color='secondary' fontSize='small' />
              <Typography variant='body2'  >
                {format(new Date(order.createdAt), 'dd/MM/yyy HH:mm')}

              </Typography>

            </Stack>

          }

          action={
            <Stack direction='row' spacing={1} alignItems='center'>

              <LabelStatusOrder status={order.status} />

              <IconButton

                onClick={() => {
                  navigate(`/orders/list/edit/${order.id}`)
                }}
              >
                <Edit />
              </IconButton>

            </Stack>

          }


        />




        <Grid container spacing={1} alignItems='center' px={1}>

          <Grid item xs={4}>
            <Typography variant='body2' color='secondary'>Hora de entrega</Typography>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="body1" >
              {'' +
                formatDistance(new Date(order.deliveryTime), new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                  locale: es
                })}
            </Typography>

          </Grid>
          <Grid item xs={4}>
            <Typography variant='body2' color='secondary'>Tipo de orden</Typography>

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
            <Typography variant='body2' color='secondary'>Personas</Typography>

          </Grid>

          <Grid item xs={8}>

            <Typography variant="h6" >
              {order.people}

            </Typography>

          </Grid>




          <Grid item xs={4}>
            <Typography variant='body2' color='secondary'>Mesero</Typography>
          </Grid>

          <Grid item xs={8}>
            <Stack direction='row' spacing={1} alignItems='center'>

              <Person color='secondary' fontSize='small' />
              <Typography variant='body1' >
                {order.user.person.firstName} {order.user.person.lastName}
              </Typography>
            </Stack>

          </Grid>

          {
            order.notes
            && (
              <>
                <Grid item xs={4}>
                  <Typography variant='body2' color='secondary'>Notas</Typography>

                </Grid>

                <Grid item xs={8}>
                  <Typography variant='body1' fontWeight='bold' >
                    {order.notes}
                    {/* {order.client?.person.firstName} {order.client?.person.lastName} */}
                  </Typography>

                </Grid>
              </>
            )
          }


        </Grid>


        {/* <Stack
          sx={{ p: 1 }}
          spacing={1.5}
        // divider={<Divider  />}
        >
                  
                  </Stack> */}

        <Divider sx={{ mb: 0.5, mt: 1, mx: 1 }} />

        <Stack
          spacing={1.5}
          sx={{ px: 1 }}
        >


          <Tabs
            value={expanded ? 1 : 0}
            onChange={handleExpanded}
            indicatorColor='primary'
            // allowScrollButtonsMobile
            variant='scrollable'
            scrollButtons='auto'

            sx={{

              zIndex: 1,



              '& .MuiTabs-indicator': {
                // backgroundColor: color + '.main',
                backgroundColor: 'transparent',

                // borderRadius: '10px 10px 0 0',
                borderColor: 'transparent',
                boxShadow: 'none',
                borderRadius: '0',
                color: 'text.primary',

                // border: '0 0 3px 0 solid' + color + '.main',
                // border: `2px solid ${color + '.main'}`,
                // color: color + '.main',

              },
              '& .MuiTab-indicatorSpan': {
                backgroundColor: color + '.main',
                borderRadius: '10px 10px 0 0',
                color: 'text.primary',


              },
              '& .Mui-selected': {
                borderRadius: '0',
                borderBottom: (theme) => `3px solid ${theme.palette[color].main}`,
                color: (theme) => 'text.primary',
                // color: (theme) => theme.colors[color].main,
              },
              '& .Mui-selected:hover': {
                color: (theme) => theme.palette[color].main,
              },

              // }, '& .MuiTab-root': {
              //   color: color === 'success' ? 'success.main' : color === 'error' ? 'error.main' : color === 'warning' ? 'warning.main' : color === 'info' ? 'info.main' : color === 'primary' ? 'primary.main' : 'secondary.main',

              //   border: `2px solid ${'color'+'.main'}`
              // }
            }}

          >
            <Tab
              disabled={order.status === OrderStatus.DELIVERED}
              label='Por entregar'
              icon={
                <Label color={color}>
                  {details?.filter(detail => detail.quantity !== detail.qtyDelivered).length}
                </Label>
              }

              iconPosition='end'

              sx={{
                '&.Mui-selected, &.Mui-selected:hover': {
                  color: (theme) => theme.colors.alpha.black[100]
                }
              }}

            />
            <Tab
              label={
                'Entregado'

              }
              icon={
                <Label color={color}>
                  {details?.filter(detail => detail.quantity === detail.qtyDelivered).length}
                </Label>
              }
              iconPosition='end'
              sx={{
                '&.Mui-selected, &.Mui-selected:hover': {
                  color: (theme) => theme.colors.alpha.black[100]
                }
              }}
            />
          </Tabs>


          {
            !expanded
              ? details?.filter(detail => detail.quantity !== detail.qtyDelivered)
                .map(detail => (

                  <DetailInProgress key={detail.id} detail={detail} orderId={order.id} />

                ))
              :
              details?.filter(detail => detail.quantity === detail.qtyDelivered).length >= 1
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


        <Divider sx={{ mt: 1, display: order.status === OrderStatus.DELIVERED ? 'none' : 'block' }} />

        <CardActions sx={{
          justifyContent: 'center',
        }}>




          {
            order.status === OrderStatus.PENDING
              ? <Button

                // variant='contained'
                startIcon={<PlayCircleOutline />}
                onClick={() => {
                  // changeStatusOrder(OrderStatus.IN_PROGRESS)
                  // setStatusFilter && setStatusFilter(OrderStatus.IN_PROGRESS)
                  handleStartOrder(order);

                }}
                // color={color}
                // size='small'
                variant='outlined'
                color='warning'


              >Iniciar</Button>
              : order.status === OrderStatus.IN_PROGRESS
              &&
              < >
                <Button
                  // variant='outlined'
                  onClick={() => {
                    changeStatusOrder(OrderStatus.PENDING)
                    setStatusFilter && setStatusFilter(OrderStatus.PENDING)
                  }}
                  color='warning'
                  startIcon={<Undo />}
                  variant='outlined'

                // color={color}
                >
                  Pendiente
                </Button>

                <Button
                  // variant='contained'
                  // color={color}
                  color='success'
                  startIcon={<Check />}
                  variant='outlined'

                  onClick={() => changeStatusOrder(OrderStatus.DELIVERED)}
                >Entregado</Button>

              </ >




          }

          {/* <Button
            onClick={() => {
              navigate(`/orders/list/edit/${order.id}`)
            }}
            // size='small'
            color='secondary'
            // variant='outlined'
            startIcon={<EditOutlined />}

          >
            Editar
          </Button> */}

        </CardActions>


      </Card>



    </>

  )
}
