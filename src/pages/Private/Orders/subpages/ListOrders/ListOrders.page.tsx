import { FC, useContext, useState, useEffect } from 'react';

import { format } from 'date-fns';

import { useSelector, useDispatch } from 'react-redux';

import { Grid, Button, Typography, useTheme, Card, CardContent, CardHeader, Accordion, AccordionSummary, AccordionDetails, ToggleButtonGroup, ToggleButton, Divider, Tabs, Tab, tabsClasses, Select, FormControl, InputLabel, MenuItem, Box, CardActionArea, List, ListItem, ListItemText, ListItemButton } from '@mui/material';

import { toast } from 'react-toastify';

// Componentes

import { loadOrders, resetActiveOrder, selectAuth, selectOrders } from '../../../../../redux';

import { SocketContext } from '../../../../../context';
import { Label, PageTitle, PageTitleWrapper } from '../../../../../components/ui';
import { Order } from '../../components';
import { FilterOrders } from '../../../Reports/components/FilterOrders';
import { IOrder, OrderStatus } from '../../../../../models';
import { useNavigate } from 'react-router-dom';
import { Cached, ExpandMore } from '@mui/icons-material';

import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { ModalDeleteOrder } from '../../components/EditOrder/ModalDeleteOrder.component';
import { es } from 'date-fns/locale';
import { OrderStatusSpanish, TypeOrder } from '../../../../../models/orders.model';
import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import { useFetchAndLoad } from '../../../../../hooks';
import { getOrdersToday } from '../../services/orders.service';
import { CardOrdersByStatus } from './components';
import { Scrollbar } from '../../../components';
import Scrollbars from 'react-custom-scrollbars-2';


interface resp {
  ok: boolean
}



export const Clock: FC = () => {

  const [date, setDate] = useState(new Date());


  function tick() {
    setDate(new Date());
  }


  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, [])


  return (
    <>

      {
        format(new Date(), 'EEEE dd MMMM yyyy HH:mm ',
          {
            locale: es
          })
      }

    </>
  )
}



export const ListOrders = () => {

  const [view, setView] = useState('list');

  const [statusOrderFilter, setStatusOrderFilter] = useState<string>('all');

  const { user } = useSelector(selectAuth);
  const [filterWaiter, setFilterWaiter] = useState(user?.id || 'all');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { callEndpoint, loading } = useFetchAndLoad();

  const { orders } = useSelector(selectOrders);


  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([])

  const theme = useTheme();



  const addOrder = () => {
    dispatch(resetActiveOrder());
    navigate('add');
  }

  const filterOrders = (waiter: string, status: string) => {

    let ordersF: IOrder[] = orders;


    if (waiter !== 'all') {
      ordersF = orders.filter(order => order.user.id === waiter)
    }


    if (status !== 'all') {

      if (status === 'unpaid') {
        ordersF = ordersF.filter(order => order.status === OrderStatus.DELIVERED && !order.isPaid)
      } else {
        const orderStatus = status as OrderStatus;
        ordersF = ordersF.filter(order => order.status === orderStatus)
      }


    }

    setFilteredOrders(ordersF)

  }

  const changeWaiter = (waiter: string) => {

    setFilterWaiter(waiter);

    filterOrders(waiter, statusOrderFilter);

  }

  const changeStatus = (status: string) => {

    setStatusOrderFilter(status);

    filterOrders(filterWaiter, status);

  }


  const refreshOrders = () => {

    callEndpoint(getOrdersToday())
      .then((resp) => {

        const { data } = resp;

        dispatch(loadOrders(data));
      })
  }




  useEffect(() => {

    filterOrders(filterWaiter, statusOrderFilter);


  }, [orders])



  return (

    <>

      <PageTitleWrapper>
        <PageTitle
          heading='Pedidos'
          docs={
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={refreshOrders}
            >
              <Cached />
            </LoadingButton>
          } />
        <Clock />
      </PageTitleWrapper>


      <Grid container item spacing={1} display='flex' justifyContent='space-between' alignItems='center' my={1}>

        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Mesero</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterWaiter}
              label="Mesa del pedido"
              onChange={(e) => changeWaiter(e.target.value)}
              size='small'
            >
              <MenuItem key={"all"} value={"all"}>Todos</MenuItem>
              {
                user &&
                <MenuItem key={user?.id} value={user?.id}>{user!.username}</MenuItem>
              }

            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={() => addOrder()}
          >Añadir Pedido</Button>
        </Grid>
      </Grid>




            {/* <Grid item xs={6} sm={4} lg={3}>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={statusOrderFilter}
                  label="Mesa del pedido"

                  onChange={(e) => changeStatus(e.target.value)}
                >
                  <MenuItem key={'all'} value={'all'}>Todos</MenuItem>
                  <MenuItem key={OrderStatus.PENDING} value={OrderStatus.PENDING}>Pendiente</MenuItem>
                  <MenuItem key={OrderStatus.IN_PROGRESS} value={OrderStatus.IN_PROGRESS}>Preparando</MenuItem>
                  <MenuItem key={OrderStatus.DELIVERED} value={OrderStatus.DELIVERED}>Entregado</MenuItem>
                  <MenuItem key={'unpaid'} value={'unpaid'}>Por pagar</MenuItem>
                  <MenuItem key={OrderStatus.CANCELLED} value={OrderStatus.CANCELLED}>Cancelado</MenuItem>


                </Select>
              </FormControl>


            </Grid>
 */}

      <Typography variant='h5' sx={{ my: 2, }} align='right'>
        {`${filteredOrders.length} pedidos`}
      </Typography>



      <Scrollbars
        style={{ width: '100%', height: '600px' }}
        autoHide
        renderThumbHorizontal={() => {
          return (
            <Box
              sx={{
                width: 5,
                background: `${theme.colors.alpha.black[10]}`,
                borderRadius: `${theme.general.borderRadiusLg}`,
                transition: `${theme.transitions.create(['background'])}`,

                '&:hover': {
                  background: `${theme.colors.alpha.black[30]}`
                }
              }}
            />
          );
        }}


      >
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
          }}

        >

          <Box

          >

            <CardOrdersByStatus

              orders={filteredOrders.filter(order => order.status === OrderStatus.PENDING)}
              title='PEDIDOS PENDIENTES'
              color='success'

            />
          </Box>

          <Box>

            <CardOrdersByStatus
              orders={filteredOrders.filter(order => order.status === OrderStatus.IN_PROGRESS)}
              title='PREPARANDO'
              color='primary'

            />
          </Box>
          <Box>

            <CardOrdersByStatus
              orders={filteredOrders.filter(order => order.status === OrderStatus.DELIVERED && !order.isPaid)}
              title='PEDIDOS POR PAGAR'
              color='warning'

            />
          </Box>
          <Box>

            <CardOrdersByStatus
              orders={filteredOrders.filter(order => order.status === OrderStatus.DELIVERED && order.isPaid)}
              title='PEDIDOS PAGADOS'
              color='info'

            />
          </Box>
          <Box>

            <CardOrdersByStatus
              orders={filteredOrders.filter(order => order.status === OrderStatus.CANCELLED)}
              title='PEDIDOS CANCELADOS'
              color='error'

            />
          </Box>

        </Box>
      </Scrollbars>








      {/* 
      <Grid container spacing={1}>

        {
          filteredOrders.length > 0
            ? filteredOrders.map(order => (
              <Grid key={order.id} item xs={12} md={6} lg={4}  >

                <Order order={order} />

              </Grid>
            ))
            :
            <Grid item xs={12} sx={{ my: 3 }}>

              <Typography align='center' variant='h4' >No se encontraron pedidos </Typography>

            </Grid>

        }

      </Grid>
 */}



    </>
  )

}
