

import { Card, CardHeader, CardContent, Button, Typography, Box } from '@mui/material';
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
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Paid color='success' sx={{fontSize: 40}}  />
            <Typography variant="h4" component="div" my={2}>Ingresos</Typography>
          </Box>
          <Typography variant="h3" component="div" my={2}>
            $ {datesIncome.reduce((acc, dateIncome) => acc + dateIncome.total, 0)}
          </Typography>

          <Button
            disableRipple
            to="incomes"
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