import { Card, CardHeader, CardContent, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { DateOrders } from '../../models/date-orders.interface';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { getOrdersEachDate } from '../../services/dashboard.service';
import { useAsync } from '../../../../../hooks/useAsync';
import { Paid, Assignment } from '@mui/icons-material';


export const OrdersSummary = () => {

  const [datesOrders, setDatesOrders] = useState<DateOrders[]>([]);

  const { loading, callEndpoint } = useFetchAndLoad();

  const getDatesOrdersCall = async () => await callEndpoint(getOrdersEachDate())

  const loadDatesOrdersState = (data: DateOrders[]) => { setDatesOrders(data); }

  useAsync(getDatesOrdersCall, loadDatesOrdersState, () => { }, []);

  return (
    <>
      <Card>

        <CardContent>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Assignment color='info' sx={{fontSize: 40}} />
            <Typography variant="h4" component="div" my={2}>Pedidos</Typography>
          </Box>

          <Typography variant="h3" component="div" my={2}>
            {datesOrders.reduce((acc, dateOrders) => acc + dateOrders.count, 0)}
          </Typography>

          <Button
            disableRipple
            to="orders"
            component={RouterLink}
            variant="text"


          >
            Ver más
          </Button>

        </CardContent>




      </Card>
    </>
  )
}