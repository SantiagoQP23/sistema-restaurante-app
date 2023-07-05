import { FC, useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Card, CardHeader, Grid, CardContent, Box, Divider, Typography, Collapse, ToggleButton, ToggleButtonGroup, Radio, RadioGroup,
  Button, CardActions, IconButton, Tooltip, useTheme, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Avatar, Tab, Tabs, Chip
} from '@mui/material';

import { ArrowBack, Check, CheckCircleOutline, EditOutlined, EditTwoTone, ExpandLess, ExpandMoreOutlined, PlayArrow, ExpandMore, TableRestaurant, Numbers, Person, DoneAll, Restaurant, PendingOutlined, AccessTimeOutlined, Done, MoreVert, Edit, ArrowRight, ArrowForward } from '@mui/icons-material';

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
import { Stack, ListItemButton, ListItemText, FormControlLabel } from '@mui/material';
import { BtnAddProduct } from './BtnAddProduct.component';
import { queryClient } from '../../../../../../main';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateOrder } from '../../../hooks/useUpdateOrder';

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

  const { updateOrder, loading } = useUpdateOrder()



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
        <Stack direction='row' alignItems='center' justifyContent='space-between' px={1}>

          <Stack spacing={1} direction='row' my={1} alignItems='flex-end' >

            <Typography variant='h3'>{`N° ${order.num}`}</Typography>


            <Chip
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

            />

          </Stack>

          <IconButton

            onClick={() => {
              navigate(`/orders/list/edit/${order.id}`)
            }}
          >
            <Edit />
          </IconButton>

        </Stack>


        <Stack
          sx={{ p: 1 }}
          spacing={1.5}
        // divider={<Divider  />}
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

          {/* <Divider /> */}

          {order.notes && <Box>
            <Typography variant='subtitle2'>Notas</Typography>

            <Stack direction='row' spacing={1} alignItems='center'>

              {/* <Person color='secondary' fontSize='small' /> */}
              <Typography variant='body1' >
                {order.notes}
                {/* {order.client?.person.firstName} {order.client?.person.lastName} */}
              </Typography>
            </Stack>
          </Box>}



          <Box>

            <Typography variant='subtitle2'>Mesero</Typography>
            <Stack direction='row' spacing={1} alignItems='center'>

              <Person color='secondary' fontSize='small' />
              <Typography variant='body1' >
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

        <Divider sx={{ mb: 0.5, mx: 1 }} />

        <Stack
          spacing={1.5}
          sx={{ px: 1 }}
        >

          {/* <RadioGroup

            value={expanded ? 1 : 0}
            onChange={handleExpanded}

          >

            <Stack direction='row' justifyContent='center'>

              <FormControlLabel value={0} control={<Radio color={color} />}
                label={
                  <Box display='flex' alignItems='center'>
                    <Typography variant='h6' fontWeight={!expanded ? 'bold' : ''}>Por entregar</Typography>
                    <Label color={color}>
                      {details?.filter(detail => detail.quantity !== detail.qtyDelivered).length}
                    </Label>
                  </Box>
                }

              />
              <FormControlLabel value={1} control={<Radio color={color} />}
                label={
                  <Box display='flex' alignItems='center'>
                    <Done />
                    <Label color={color}>
                      {details?.filter(detail => detail.quantity === detail.qtyDelivered).length}
                    </Label>
                  </Box>
                }
              />
            </Stack>


          </RadioGroup> */}

          {/* <ToggleButtonGroup
            value={expanded ? 1 : 0}
            onChange={handleExpanded}
            exclusive
            size='small'
            color='success'
            
          >
            <ToggleButton
              onChange={handleExpanded}
              value={0}

            // sx={{
            //   '&.MuiToggleButton-root': {
            //     color: color + '.main',
            //     borderColor: color + '.main',
            //     '&.Mui-selected': {
            //       color: '#000',
            //       backgroundColor: color + '.main',
            //       '&:hover': {
            //         backgroundColor: color + '.main',
            //       }
            //     },
            //     '&:hover': {
            //       backgroundColor: color + '.main',
            //     }
            //   }
            // }}
            >
              Por entregar
              <Label color={color}>
                {details?.filter(detail => detail.quantity !== detail.qtyDelivered).length}
              </Label>
            </ToggleButton>

            <ToggleButton
              onChange={handleExpanded}
              value={1}
            // sx={{
            >
              <Done />
              <Label color={color}>
                {details?.filter(detail => detail.quantity === detail.qtyDelivered).length}
              </Label>
            </ToggleButton>

          </ToggleButtonGroup> */}

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
                startIcon={<PlayArrow />}
                onClick={() => {
                  changeStatusOrder(OrderStatus.IN_PROGRESS)
                  setStatusFilter && setStatusFilter(OrderStatus.IN_PROGRESS)

                }}
                // color={color}
                // size='small'
                color='success'



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
                  color='success'
                  startIcon={<ArrowBack />}

                // color={color}
                >
                  Pendiente
                </Button>

                <Button
                  // variant='contained'
                  // color={color}
                  color='warning'
                  endIcon={<ArrowForward />}

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
