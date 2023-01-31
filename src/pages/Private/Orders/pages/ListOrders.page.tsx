import { FC, useContext, useState, useEffect } from 'react';

import { format } from 'date-fns';

import { useSelector, useDispatch } from 'react-redux';

import { Grid, Button, Typography, useTheme, Card, CardContent, CardHeader, Accordion, AccordionSummary, AccordionDetails, ToggleButtonGroup, ToggleButton, Divider, Tabs, Tab, tabsClasses } from '@mui/material';

import { toast } from 'react-toastify';

// Componentes

import { resetActiveOrder, selectOrders } from '../../../../redux';

import { SocketContext } from '../../../../context/';
import { PageTitle, PageTitleWrapper } from '../../../../components/ui';
import { Order } from '../components';
import { FilterOrders } from '../../Reports/components/FilterOrders';
import { IOrder } from '../../../../models';
import { useNavigate } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';

import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { ModalDeleteOrder } from '../components/EditOrder/ModalDeleteOrder.component';
import { es } from 'date-fns/locale';



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

const statusOrdersList = [
  {

    value: 1000,
    label: 'Todos'
  },
  {
    value: 1001,
    label: 'Pendientes'
  },
  {
    value: 1002,
    label: 'Entregados'

  },
  {
    value: 1003,
    label: 'Pagados'
  }
]



export const ListOrders = () => {

  const [view, setView] = useState('list');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  const [statusOrders, setStatusOrders] = useState(statusOrdersList[1])

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders } = useSelector(selectOrders);

  const [ordersFiltered, setOrdersFiltered] = useState<IOrder[]>([])

  const addOrder = () => {
    dispatch(resetActiveOrder())

    navigate('add');

  }

  const filterOrders = () => {

    if (statusOrders.value === 1000) { // Todos
      console.log('Todos')
      setOrdersFiltered(orders)
    } else if (statusOrders.value === 1001) { // Pendientes
      setOrdersFiltered(orders.filter(order => !order.isDelivered))
    } else if (statusOrders.value === 1002) { // Entregados
      setOrdersFiltered(orders.filter(order => order.isDelivered && !order.isPaid))
    } else if (statusOrders.value === 1003) { // Pagados
      setOrdersFiltered(orders.filter(order => order.isPaid))
    }




  }

  useEffect(() => {

    filterOrders()

  }, [orders, statusOrders])




  return (

    <>

      <Grid container >
        <Grid container item spacing={1} display='flex' justifyContent='space-between' alignItems='center' my={1}>

         {/*  <Grid item>

            <Card >
              <CardHeader title='Pedidos' />
              <CardContent>

                <Typography variant="h6"> {orders.length}</Typography>

              </CardContent>
            </Card>
          </Grid> */}
          <Grid item>
            <Card >
              <CardContent>
                <Typography variant="body1"><Clock /></Typography>

              </CardContent>

            </Card>

          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addOrder()}
            >Añadir Pedido</Button>
          </Grid>
        </Grid>


      </Grid>

      <Card sx={{my: 2}}>

        <CardContent>


          <Tabs
            onChange={(e, value) => setStatusOrders(value)}
            value={statusOrders}
            variant="scrollable"
            textColor='primary'
            scrollButtons
            indicatorColor='primary'
            allowScrollButtonsMobile
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
              width: '100%',
              my: 1,
              fontSize: '1rem'
            }}
          >

            {
              statusOrdersList.map((status) => (
                <Tab key={status.value} label={status.label} value={status} />
              ))
            }


          </Tabs>

        </CardContent>
      </Card>

      <Grid container spacing={1}>

        {
          ordersFiltered.length > 0
            ? ordersFiltered.map(order => (
              <Grid key={order.id} item xs={12} md={6} lg={4}  >

                <Order order={order} />

              </Grid>
            ))
            :
            <Grid item xs={12} sx={{ my: 3 }}>

              <Typography align='center' variant='body1' >No se encontraron pedidos </Typography>

            </Grid>

        }

      </Grid>




      {/* <Grid  mt={2} container spacing={1}>
        {
          orders.length > 0 &&
          orders.map(p => (
            <Order key={p.id} pedido={p} />
            )
            )
          }
      </Grid> */}


    </>
  )

}
