

import { Card, CardHeader, CardContent, Button, Typography, Box, CardActions } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import { useState } from 'react';
import { Paid } from '@mui/icons-material';
import { getIncomes } from '../../../services/dashboard.service';
import { useFetchAndLoad, useAsync } from '../../../../../../hooks';
import { DateIncome } from '../../../models/date-orders.interface';
import { useCashRegisterStore } from '../../../../Common/store/cashRegisterStore';


export const IncomesSummary = () => {

  const {activeCashRegister} = useCashRegisterStore();

  const [datesIncome, setDatesIncome] = useState<DateIncome[]>([]);

  const { loading, callEndpoint } = useFetchAndLoad();

  // const getDatesIncomeCall = async () => await callEndpoint(getIncomes())

  const loadDatesIncomeState = (data: DateIncome[]) => { setDatesIncome(data); }
// 
  // useAsync(getDatesIncomeCall, loadDatesIncomeState, () => { }, []);


  /* const getClientsCall = async () => await callEndpoint(getClients())

  const loadClientsState = (data: IClient[]) => { dispatch(loadClients(data)); }

  useAsync(getClientsCall, loadClientsState, () => { }, []);
 */

  return (
    <>
      <Card>

        <CardHeader
          avatar={<Paid color='success' sx={{ fontSize: 30 }} />}
          title={
            <Typography variant="h4" >Ingresos del día</Typography>
          }
        
          action={
          <Button
            disableRipple
            to="/balance"
            component={RouterLink}
            variant="outlined"
            color='success'
            size='small'


          >
            Ver más
          </Button>

          }
        />

        <CardContent>
         
          <Typography variant="h3" component="div" >
            $ {activeCashRegister? activeCashRegister.totalIncomesCash + activeCashRegister.totalIncomesTransfer : 0}
          </Typography>


        </CardContent>
       





      </Card>
    </>
  )
}