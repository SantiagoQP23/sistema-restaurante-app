

import { Card, CardHeader, CardContent, Button, Typography, Box, CardActions } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { getIncomes } from '../../services/dashboard.service';
import { DateIncome } from '../../models/date-orders.interface';
import { useAsync } from '../../../../../hooks/useAsync';
import { useState } from 'react';
import { Paid } from '@mui/icons-material';


export const IncomesSummary = () => {


  const [datesIncome, setDatesIncome] = useState<DateIncome[]>([]);

  const { loading, callEndpoint } = useFetchAndLoad();

  const getDatesIncomeCall = async () => await callEndpoint(getIncomes())

  const loadDatesIncomeState = (data: DateIncome[]) => { setDatesIncome(data); }

  useAsync(getDatesIncomeCall, loadDatesIncomeState, () => { }, []);


  /* const getClientsCall = async () => await callEndpoint(getClients())

  const loadClientsState = (data: IClient[]) => { dispatch(loadClients(data)); }

  useAsync(getClientsCall, loadClientsState, () => { }, []);
 */

  return (
    <>
      <Card>

        <CardHeader
          avatar={<Paid color='success' sx={{ fontSize: 40 }} />}
          title={
            <Typography variant="h4" >Ingresos</Typography>
          }
        />

        <CardContent>
         
          <Typography variant="h3" component="div" textAlign='center'>
            $ {datesIncome.reduce((acc, dateIncome) => acc + dateIncome.total, 0)}
          </Typography>


        </CardContent>
        <CardActions 
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Button
            disableRipple
            to="incomes"
            component={RouterLink}
            variant="text"

          >
            Ver más
          </Button>

        </CardActions>





      </Card>
    </>
  )
}