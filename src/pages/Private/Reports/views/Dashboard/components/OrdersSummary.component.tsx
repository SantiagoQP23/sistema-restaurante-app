import { Card, CardHeader, CardContent, Button, Typography, Box, CardActions } from '@mui/material';
import { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { DateOrders } from '../../../models/date-orders.interface';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { getOrdersEachDate } from '../../../services/dashboard.service';
import { useAsync } from '../../../../../../hooks/useAsync';
import { Paid, Assignment } from '@mui/icons-material';


export const OrdersSummary = () => {

  const [datesOrders, setDatesOrders] = useState<DateOrders[]>([]);

  const { loading, callEndpoint } = useFetchAndLoad();

  // const getDatesOrdersCall = async () => await callEndpoint(getOrdersEachDate())

  const loadDatesOrdersState = (data: DateOrders[]) => { setDatesOrders(data); }

  // useAsync(getDatesOrdersCall, loadDatesOrdersState, () => { }, []);

  return (
    <>
      <Card>

        <CardHeader
          avatar={<Assignment color='info' sx={{ fontSize: 30 }} />}
          title={
            <Typography variant="h4" >Pedidos</Typography>
          }
          action={
            <Button
              disableRipple
              to="/orders/list"
              component={RouterLink}
              variant="text"

            >
              Ver más
            </Button>

          }
        />

        <CardContent>

          <Typography variant="h3" component="div" textAlign='center'>
            {datesOrders.reduce((acc, dateOrders) => acc + dateOrders.count, 0)}
          </Typography>


        </CardContent>

        {/* <CardActions
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}

        >

        </CardActions> */}




      </Card>
    </>
  )
}