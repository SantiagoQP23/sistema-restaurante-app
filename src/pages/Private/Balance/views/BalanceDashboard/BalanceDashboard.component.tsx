import { ArrowOutward, CallReceived, CreditCard, Lock, Paid, Visibility } from '@mui/icons-material';
import { TitlePage } from '../../../components/TitlePage.component';
import { Grid, Card, CardHeader, CardContent, Typography, Button, Box, TableContainer, Stack, InputLabel, Input, Tabs, Tab, Divider, CircularProgress } from '@mui/material';
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
import { TabPanel } from '@mui/lab';
import { TableIncomes } from '../CashRegister/components/TableIncomes.component';
import { TableExpenses } from '../CashRegister/components/TableExpenses.component';
import { Label } from '../../../../../components/ui';
import { formatMoney } from '../../../Common/helpers/format-money.helper';
import { useIncomes } from '../../hooks/useIncomes';
import { useExpenses } from '../../hooks/useExpenses';
// import { CloseCashRegister } from '../CashRegister/components/FormCloseCashRegister.component';


export enum AddTransactionTabs {
  INCOMES = 'add-incomes',
  EXPENSES = 'add-expenses',
}

export enum ViewTransactionTabs {
  INCOMES = 'incomes',
  EXPENSES = 'expenses',
  INVOICES = 'invoices'
}



export const BalanceDashboard = () => {


  const navigate = useNavigate();

  const { activeCashRegister } = useCashRegisterStore(state => state);
  
  const [tabAddTransaction, setTabAddTransaction] = useState<AddTransactionTabs>(AddTransactionTabs.EXPENSES);
  
  const [tabViewTransaction, setTabViewTransaction] = useState<ViewTransactionTabs>(ViewTransactionTabs.INCOMES);
  
  
  
  const {incomesQuery, ...filterIncomes} = useIncomes();

  const {expensesQuery, ...filterExpenses} = useExpenses();



  const { cashRegisterQuery } = useCashRegisterActive();


  const handleChangeTabAddTransaction = (value: AddTransactionTabs) => {

    setTabAddTransaction(value)
  }  

  const navigateTo = (path: string) => {
    navigate(path)
  }  


  const balanceTransfer = activeCashRegister ? activeCashRegister.totalIncomesTransfer + activeCashRegister.totalInvoicesTransfer - activeCashRegister.totalExpensesTransfer : 0;
  const balanceCash = activeCashRegister ? activeCashRegister.totalIncomesCash + activeCashRegister.totalInvoicesCash - activeCashRegister.totalExpensesCash : 0;




  useEffect(() => {
    cashRegisterQuery.refetch()

    if (activeCashRegister) {
      filterIncomes.handleChangeCashRegister(activeCashRegister);
      filterExpenses.handleChangeCashRegister(activeCashRegister);
    }

  }, [])



  return (
    <>
      <TitlePage

        title='Balance'

        action={
          <Stack direction='row' spacing={1}>

            <Button
              variant='outlined'
              startIcon={<Visibility />}
              onClick={() => navigateTo('cash-register')}

            >
              Cierres de caja

            </Button>
            {
              activeCashRegister && (
                <Button
                  variant='contained'
                  startIcon={<Lock />}
                  onClick={() => navigateTo('close')}
                >
                  Cerrar caja
                </Button>

              )
            }


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

                  <CardAddCashRegister  />

                </Grid>

              </Grid>
            </>
          ) : (


            <Grid container spacing={2}>


              <Grid item xs={12} md={7} >

                <Card>

                  <CardHeader
                    title='Efectivo'
                    titleTypographyProps={{
                      variant: 'h5',
                      textAlign: 'center'

                    }}

                  />
                  <CardContent

                  >

                    <Box display='flex' justifyContent='center'>

                      <Paid color='success' fontSize='large' />
                    </Box>

                    <Typography variant='h3'
                      // color={balanceTranfer > 0 ? 'success.main' : 'error.main'}
                      textAlign='center'
                      my={2}
                    >
                      {formatMoney(activeCashRegister.balance)}
                    </Typography>

                    <Stack
                      spacing={2}
                      // divider={<Divider orientation='vertical'/>} 
                      direction='row'
                      justifyContent='space-between'
                    >


                      <Box>
                        <Typography variant='caption' >Monto inicial</Typography>
                        <Typography variant='h4' color='success.main' >{formatMoney(activeCashRegister.initialAmount)}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='caption' >Ingresos</Typography>
                        <Typography variant='h4' color='success.main' >{formatMoney(activeCashRegister.totalIncomesCash)}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='caption' >Ventas</Typography>
                        <Typography variant='h4' color='success.main' >{formatMoney(activeCashRegister.totalInvoicesCash)}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='caption' >Gastos</Typography>
                        <Typography variant='h4' color='error.main' >{formatMoney(activeCashRegister.totalExpensesCash)}</Typography>
                      </Box>

                    </Stack>


                  </CardContent>

                </Card>

              </Grid>


              <Grid item xs={12} md={5} >

                <Card>

                  <CardHeader
                    title='Transferencias'
                    titleTypographyProps={{
                      variant: 'h5',
                      textAlign: 'center'

                    }}

                  />
                  <CardContent

                  >

                    <Box display='flex' justifyContent='center'>

                      <CreditCard color='warning' fontSize='large' />
                    </Box>

                    <Typography variant='h3'
                      // color={balanceTransfer > 0 ? 'success.main' : 'error.main'}
                      textAlign='center'
                      my={2}
                    >
                      {formatMoney(balanceTransfer)}
                    </Typography>

                    <Stack
                      spacing={2}
                      // divider={<Divider orientation='vertical'/>} 
                      direction='row'
                      justifyContent='space-between'
                    >


                      <Box>
                        <Typography variant='caption' >Ingresos</Typography>
                        <Typography variant='h4' color='success.main' >{formatMoney(activeCashRegister.totalIncomesTransfer)}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='caption' >Ventas</Typography>
                        <Typography variant='h4' color='success.main' >{formatMoney(activeCashRegister.totalInvoicesTransfer)}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='caption' >Gastos</Typography>
                        <Typography variant='h4' color='error.main' >{formatMoney(activeCashRegister.totalExpensesTransfer)}</Typography>
                      </Box>

                    </Stack>


                  </CardContent>

                </Card>

              </Grid>

              <Grid item xs={12}>
                <Tabs
                  value={tabAddTransaction}
                  onChange={(e, value) => handleChangeTabAddTransaction(value)}
                  sx={{
                    mb: 1
                  }}
                >
                  <Tab label='Ingresos' value={AddTransactionTabs.INCOMES} />
                  <Tab label='Gastos' value={AddTransactionTabs.EXPENSES} />

                </Tabs>

              </Grid>


              <Grid item xs={12} md={6} lg={4} >

                <Typography variant='h4' mb={2}>Añadir transacción</Typography>

                {
                  tabAddTransaction === AddTransactionTabs.INCOMES
                    ? (
                      <>
                        {/* <Typography>Ingresssso</Typography> */}
                        <AddIncome />

                      </>
                    )
                    : (
                      // <Typography>Gasto</Typography>
                      <AddExpense />
                    )
                }




              </Grid>

              <Grid item xs={12} md={8}  >

                <Typography variant='h4' mb={2}>Transacciones {incomesQuery.isLoading && <CircularProgress size={12} />} </Typography>


                {
                  tabAddTransaction === AddTransactionTabs.INCOMES
                    ? <>{ incomesQuery.data &&  <IncomesList cashRegister={activeCashRegister} editable data={incomesQuery.data} filterIncomes={filterIncomes}/>}</>
                    : <ExpensesList cashRegister={activeCashRegister} editable/>
                }

                {/* <Card>
                  <CardContent>


                  </CardContent>
                </Card> */}

              </Grid>


            </Grid>
          )

      }








    </>
  )
}