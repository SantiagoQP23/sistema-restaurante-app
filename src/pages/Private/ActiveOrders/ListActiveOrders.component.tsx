import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

import { ActiveOrder } from "./components/ActiveOrder.component"
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../redux/slices/orders/orders.slice';
import { IOrder, OrderStatus } from '../../../models/orders.model';

export const ListActiveOrders = () => {


  const { orders } = useSelector(selectOrders);

  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]);

  const filterActiveOrder = () => {
    setActiveOrders(orders.filter(order => order.status === OrderStatus.PENDING));
  }
  
  useEffect(() => {

    filterActiveOrder();
  }, [orders])

  useEffect(() => {

    filterActiveOrder();
  }, [])


  return (
    <>
      <Card >
        <CardHeader title={
          <>
            Ordenes activas
          </>} />
        <CardContent>
          <Grid container spacing={1}>
            {
              activeOrders.length === 0
                ? <Typography variant='h5'>No hay pedidos</Typography>
                : activeOrders.map(order => (
                  <Grid key={order.id} item xs={12} sm={4}>
                    <ActiveOrder order={order}/>
                  </Grid>

                ))
            }

          </Grid>


        </CardContent>
      </Card>

    </>
  )
}