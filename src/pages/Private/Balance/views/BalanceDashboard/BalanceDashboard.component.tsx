import { ArrowOutward, CallReceived } from '@mui/icons-material';
import { TitlePage } from '../../../components/TitlePage.component';
import { Grid, Card, CardHeader, CardContent, Typography, Button, Box, TableContainer, Stack, InputLabel, Input } from '@mui/material';
import { ExpensesList, IncomesList } from './components';
import { AddExpense } from '../Expenses/components/AddExpense.component';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { AddIncome } from '../Incomes/components/AddIncome.component';
import { CashRegisterSummary } from '../CashRegister/components/CashRegisterSummary.view';




export const BalanceDashboard = () => {


  const navigate = useNavigate();


  const navigateTo = (path: string) => {
    navigate(path)
  }





  return (
    <>
      <TitlePage title='Balance' />


      <Grid container spacing={2}>


        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              // backgroundColor: '#f44336',
              // color: '#fff'
            }}

          >

            <CardHeader title='Balance' />

            <CardContent
              sx={{
                display: 'flex',
                gap: 1,

                alignItems: 'center'
              }}
            >
              <Typography variant='h3' >$ 500.00</Typography>
              {
                true
                  ? <CallReceived color='success' />
                  : <ArrowOutward color='error' />
              }



            </CardContent>

          </Card>


        </Grid>


        <Grid item xs={12} md={6} lg={4}>

          <Card
            sx={{
              // backgroundColor: '#4caf50',
            }}

          >

            <CardHeader
              title='Ingresos'
              action={
                <Button
                  onClick={() => navigateTo('incomes')}
                  color='success'
                >
                  Ver todos
                </Button>
              }
            />

            <CardContent
              sx={{
                display: 'flex',
                gap: 1,

                alignItems: 'center'
              }}
            >
              <Typography variant='h3' >$ 823.00</Typography>
              <CallReceived color='success' />
            </CardContent>


          </Card>

        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              // backgroundColor: '#f44336',
              // color: '#fsff'
            }}

          >

            <CardHeader title='Gastos'
              action={
                <Button
                  onClick={() => navigateTo('expenses')}
                  color='warning'
                >
                  Ver todos
                </Button>
              }
            />

            <CardContent
              sx={{
                display: 'flex',
                gap: 1,

                alignItems: 'center'
              }}
            >
              <Typography variant='h3' >$ 300.00</Typography>
              <ArrowOutward color='error' />
            </CardContent>

          </Card>


        </Grid>



        <Grid item xs={12} md={6} lg={4} >
         <CashRegisterSummary />
        </Grid>
        <Grid item xs={12} md={6} lg={4} >

          <AddIncome />



        </Grid>

        <Grid item xs={12} md={6} lg={4} >

          <AddExpense />


        </Grid>


        {/* 
        <Grid item xs={12} md={6}  >


          <IncomesList />




        </Grid>

        <Grid item xs={12} md={6}>
          <ExpensesList />



        </Grid> */}
      </Grid>





    </>
  )
}