import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, Grid, Typography, Tab, Tabs } from '@mui/material';
import { tabsClasses } from '@mui/material/Tabs';

import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { IOrder, OrderStatus, OrderStatusSpanish } from '../../../../../../models/orders.model';

import { ActiveOrder } from "./ActiveOrder.component";


export const ListActiveOrders = () => {


  const { orders } = useSelector(selectOrders);

  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]);
  const [statusOrderFilter, setStatusOrderFilter] = useState<OrderStatus>(OrderStatus.PENDING);

  const filterActiveOrder = (status: OrderStatus) => {
    setActiveOrders(orders.filter(order => order.status === status));
  }

  useEffect(() => {

    filterActiveOrder(statusOrderFilter);
  }, [orders])

  useEffect(() => {

    filterActiveOrder(OrderStatus.PENDING);
  }, [])


  return (
    <>


      <Card sx={{ my: 2, }}>

        <CardContent sx={{ overFlowX: 'auto' }}>
          <Typography variant="h5">Estados de pedidos</Typography>

          <Tabs
            onChange={(e, value) => {
              setStatusOrderFilter(value);
              filterActiveOrder(value);
            }}
            value={statusOrderFilter}
            variant="fullWidth"
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
              fontSize: '1rem',

            }}
          >
            <Tab key={OrderStatus.PENDING} label={OrderStatusSpanish[OrderStatus.PENDING]} value={OrderStatus.PENDING} />
            <Tab key={OrderStatus.IN_PROGRESS} label={'PREPARANDO'} value={OrderStatus.IN_PROGRESS} />

          </Tabs>


        </CardContent>
      </Card>

      <Grid container spacing={1}>
        {
          activeOrders.length === 0
            ? <Grid item xs={12}>
              <Typography variant='h4' align="center">No hay pedidos</Typography>

            </Grid>
            : activeOrders.map(order => (
              <Grid key={order.id} item xs={12} sm={4}>
                <ActiveOrder order={order} setStatusFilter={setStatusOrderFilter} />
              </Grid>

            ))
        }

      </Grid>





    </>
  )
}