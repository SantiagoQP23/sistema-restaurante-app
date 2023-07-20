import { ArrowOutward, CallReceived, Lock, Visibility } from '@mui/icons-material';
import { TitlePage } from '../../../components/TitlePage.component';
import { Grid, Card, CardHeader, CardContent, Typography, Button, Box, TableContainer, Stack, InputLabel, Input, Tabs, Tab } from '@mui/material';
import { ExpensesList, IncomesList } from './components';
import { AddExpense } from '../Expenses/components/AddExpense.component';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { AddIncome } from '../Incomes/components/AddIncome.component';
import { CashRegisterSummary } from '../CashRegister/components/CashRegisterSummary.view';
import { useCashRegisterStore } from '../../../Common/store/cashRegisterStore';
import { CardAddCashRegister } from './components/CardAddCashRegister.component';
import { useEffect, useState } from 'react';
import { useCashRegisterActive } from '../../hooks/useCashRegister';
// import { CloseCashRegister } from '../CashRegister/components/FormCloseCashRegister.component';


export enum AddTransactionTabs {
  INCOMES = 'incomes',
  EXPENSES = 'expenses',
}

export enum ViewTransactionTabs {
  INCOMES = 'incomes',
  EXPENSES = 'expenses',
  INVOICES = 'invoices'
}



export const BalanceDashboard = () => {


  const navigate = useNavigate();

  const { activeCashRegister } = useCashRegisterStore(state => state);

  const [tabAddTransaction, setTabAddTransaction] = useState<'income' | 'expense'>('income');

  const [tabViewTransaction, setTabViewTransaction] = useState<ViewTransactionTabs>(ViewTransactionTabs.INCOMES);


  const { cashRegisterQuery } = useCashRegisterActive();


  const handleChangeTabAddTransaction = (value: 'income' | 'expense') => {

    setTabAddTransaction(value)
  }

  const navigateTo = (path: string) => {
    navigate(path)
  }


  useEffect(() => {
    cashRegisterQuery.refetch()
  }, [])



  return (
    <>
      <TitlePage

        title='Balance'

        action={
          <Stack direction='row' spacing={1}>

            <Button
              variant='contained'
              startIcon={<Lock />}
              onClick={() => navigateTo('close')}
            >
              Cerrar caja
            </Button>

            <Button
              variant='outlined'
              startIcon={<Visibility />}
              onClick={() => navigateTo('cash-register')}

            >
              Cierres de caja

            </Button>

          </Stack>
        }


      />


      {
        activeCashRegister === null
          ?
          (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <CardAddCashRegister />

                </Grid>

                <Grid item xs={12} md={8}>

                </Grid>

              </Grid>
            </>
          ) : (


            <Grid container spacing={2}>


              <Grid item xs={12} md={6} lg={4}>
                <Card
                  sx={{
                    // backgroundColor: '#f44336',
                    // color: '#fff'
                  }}

                >

                  <CardHeader title='Balance'
                    action={
                      <Button
                        onClick={() => navigateTo('balance')}
                        color='info'
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
                    <Typography variant='h3' >$ {activeCashRegister.balance || 0}</Typography>
                    {
                      activeCashRegister.balance > 0
                        ? <ArrowOutward color='error' />
                        : <CallReceived color='success' />
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
                    <Typography variant='h3' >$ {activeCashRegister.totalIncomes + activeCashRegister.totalInvoices}</Typography>
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
                    <Typography variant='h3' >$ {activeCashRegister.totalExpenses}</Typography>
                    <ArrowOutward color='error' />
                  </CardContent>

                </Card>


              </Grid>


              <Grid item xs={12} md={6} lg={4} >
                <CardHeader
                  title='Añadir transacción'
                />
                <Tabs
                  value={tabAddTransaction}
                  onChange={(e, value) => handleChangeTabAddTransaction(value)}
                  sx={{
                    mb: 1
                  }}
                >
                  <Tab label='Ingreso' value={'income'} />
                  <Tab label='Gastos' value={'expense'} />

                </Tabs>

                {
                  tabAddTransaction === 'income'
                    ? <AddIncome />
                    : <AddExpense />
                }



              </Grid>




              <Grid item xs={12} md={6} lg={8} >
                <CardHeader
                  title='Transacciones'
                />
                <Tabs
                  value={tabViewTransaction}
                  onChange={(e, value) => setTabViewTransaction(value)}
                  sx={{
                    mb: 1
                  }}
                >
                  <Tab label='Ingresos' value={ViewTransactionTabs.INCOMES} />
                  <Tab label='Gastos' value={ViewTransactionTabs.EXPENSES} />

                </Tabs>

                {
                  tabViewTransaction === ViewTransactionTabs.INCOMES
                    ? <IncomesList />
                    : <ExpensesList />
                }

                {/* <Card>
                  <CardContent>


                  </CardContent>
                </Card> */}

              </Grid>



              {/* <Grid item xs={12} md={6} lg={4} >
                <CashRegisterSummary />



              </Grid> */}

              {/* <Grid item xs={12} md={4}>
                <CloseCashRegister cashRegister={activeCashRegister}/>
              </Grid> */}




            </Grid>
          )

      }








    </>
  )
}