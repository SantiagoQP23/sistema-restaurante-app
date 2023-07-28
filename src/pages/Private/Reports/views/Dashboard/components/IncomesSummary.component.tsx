

import { Card, CardHeader, CardContent, Button, Typography, Box, CardActions } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import { useState } from 'react';
import { MonetizationOn, Paid } from '@mui/icons-material';
import { getIncomes } from '../../../services/dashboard.service';
import { useFetchAndLoad, useAsync } from '../../../../../../hooks';
import { DateIncome } from '../../../models/date-orders.interface';
import { useCashRegisterStore } from '../../../../Common/store/cashRegisterStore';
import { Label } from '../../../../../../components/ui';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';


export const IncomesSummary = () => {

  const {activeCashRegister} = useCashRegisterStore();

  const [datesIncome, setDatesIncome] = useState<DateIncome[]>([]);


  return (
    <>
      <Card>

        <CardHeader
          avatar={<MonetizationOn color='success' sx={{ fontSize: 30 }} />}
          title={
            <Typography variant="h4" >Caja</Typography>
          }
          subheader={
            <Typography variant="subtitle1" >Balance</Typography>
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
         
         {
          activeCashRegister && (
          <Typography variant="h3" component="div" >
            {activeCashRegister && formatMoney(activeCashRegister.balance) }
            <Label
              sx={{ ml: 1 }}
              
              color='success'
            >
              + {formatMoney(activeCashRegister.totalIncomes + activeCashRegister.totalInvoices + activeCashRegister.initialAmount)}
            </Label>

            <Label
              sx={{ ml: 1 }}
              
              color='error'
            >
              - {formatMoney(activeCashRegister.totalExpenses)}
            </Label>


          </Typography>

          )
         }


        </CardContent>
       





      </Card>
    </>
  )
}