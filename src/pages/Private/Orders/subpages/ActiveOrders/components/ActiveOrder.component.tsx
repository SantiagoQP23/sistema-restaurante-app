import { FC, useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Card, CardHeader, Grid, CardContent, Box, Divider, Typography, Collapse,
  Button, CardActions, IconButton, Tooltip, useTheme, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Avatar, Tab, Tabs
} from '@mui/material';

import { ArrowBack, Check, CheckCircleOutline, EditOutlined, EditTwoTone, ExpandLess, ExpandMoreOutlined, PlayArrow, ExpandMore } from '@mui/icons-material';

import { formatDistance, subHours } from 'date-fns';
import { es } from 'date-fns/locale';

import { useSnackbar } from 'notistack';

import { useDispatch, useSelector } from 'react-redux';

import { DetailInProgress } from './';
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



      <Card

        sx={{

          // borderTop: (theme) => `1px solid ${theme.palette[color].main}`,
          // borderBottom: (theme) => `1px solid ${theme.palette[color].main}`,
          border: (theme) => `1px solid ${theme.palette[color].main}`,
          // bgcolor: (theme) => theme.colors[color].lighter,
        }}
        variant='elevation'

      >



        <Stack
          sx={{ p: 1 }}
          spacing={1}
        >
          <Stack
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
            </Box>

            <Box flexBasis='50%' >
              <Typography variant='body1' fontWeight='bold'>N° {order.num}</Typography>

            </Box>

          </Stack>

          <Box>
            <Typography variant='caption'>Cliente</Typography>
            <Typography variant='body1' fontWeight='bold'>
              {order.client?.person.firstName} {order.client?.person.lastName}
            </Typography>
          </Box>
          <Box>

            <Typography variant='caption'>Mesero</Typography>
            <Typography variant='body1' fontWeight='bold'>
              {order.user.person.firstName} {order.user.person.lastName}
            </Typography>
          </Box>
          <Typography variant='body2'  >
            {'Creado ' +
              formatDistance(new Date(order.createdAt), new Date(), {
                addSuffix: true,
                includeSeconds: true,
                locale: es
              })}
          </Typography>

        </Stack>



        <Stack
          spacing={1}
          sx={{ px: 1 }}
        >

          <Tabs
            value={expanded ? 1 : 0}
            onChange={handleExpanded}
            indicatorColor='primary'

            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: color === 'success' ? 'success.main' : color === 'error' ? 'error.main' : color === 'warning' ? 'warning.main' : color === 'info' ? 'info.main' : color === 'primary' ? 'primary.main' : 'secondary.main',
                borderRadius: '10px 10px 0 0',
                borderColor: 'transparent',
                borderBottom:  `2px solid ${color}`
              }
            }}
            
          >
            <Tab label='Por entregar' disabled={order.status === OrderStatus.DELIVERED}/>
            <Tab label='Entregado'/>
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
                <Typography variant='body1' color='gray' my={5} textAlign='center'>
                  No hay productos entregados
                </Typography>
              )
              

          }


          <BtnAddProduct order={order} />



          {/* {
            details.filter(detail => detail.quantity === detail.qtyDelivered).length > 0 &&
            <>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                onClick={handleExpanded}
              >
                <ListItemText>
                  <Typography variant='body1' >Productos entregados</Typography>
                </ListItemText>

                {expanded ? <ExpandLess /> : <ExpandMore />}

              </Stack>

              <Collapse
                in={expanded}
              >
                <Stack
                  spacing={1}

                >


                  {
                    details.filter(detail => detail.quantity === detail.qtyDelivered)
                      .map(detail => (

                        <DetailInProgress key={detail.id} detail={detail} orderId={order.id} />

                      ))

                  }
                </Stack>

              </Collapse>

            </>



          } */}

        </Stack>


        <CardActions>




          {
            order.status === OrderStatus.PENDING
              ? <Button
                fullWidth
                variant='contained'
                startIcon={<PlayArrow />}
                onClick={() => {
                  changeStatusOrder(OrderStatus.IN_PROGRESS)
                  setStatusFilter && setStatusFilter(OrderStatus.IN_PROGRESS)

                }}
                color={color}
                size='small'


              >Iniciar</Button>
              : order.status === OrderStatus.IN_PROGRESS
              &&
              < >
                <Button
                  fullWidth

                  variant='outlined'
                  startIcon={<ArrowBack />}
                  onClick={() => {
                    changeStatusOrder(OrderStatus.PENDING)
                    setStatusFilter && setStatusFilter(OrderStatus.PENDING)

                  }}
                  color={color}
                  size='small'


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
            variant='outlined'
            fullWidth
          >
            {/* <EditOutlined /> */}
            Editar
          </Button>

        </CardActions>


      </Card>



    </>

  )
}
