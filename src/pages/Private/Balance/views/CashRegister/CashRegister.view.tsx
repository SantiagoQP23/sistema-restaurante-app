import { useState } from 'react';

import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useCashRegister } from '../../hooks/useCashRegister';
import { Button, Card, CardContent, CardHeader, Grid, Typography, Tabs, Tab, Box, InputLabel, Stack, Divider } from '@mui/material';
import { TitlePage } from "../../../components/TitlePage.component";
import { ArrowOutward, CallReceived, Print } from "@mui/icons-material";
import { ViewTransactionTabs } from "../BalanceDashboard/BalanceDashboard.component";
import { IncomesList, ExpensesList } from '../BalanceDashboard/components';
import { format } from 'date-fns';
import { TableIncomes } from './components/TableIncomes.component';
import { TableExpenses } from './components/TableExpenses.component';


export const CashRegister = () => {


  const { cashRegisterId } = useParams();

  const navigate = useNavigate();

  if (!cashRegisterId)
    return <Navigate to="/balance/cash-register" replace />;

  const [tabViewTransaction, setTabViewTransaction] = useState<ViewTransactionTabs>(ViewTransactionTabs.INCOMES);

  const { cashRegisterQuery } = useCashRegister(cashRegisterId);



  const { data, isLoading } = cashRegisterQuery;


  if (isLoading) return <div>Loading...</div>


  if (!data) return <div>Not found</div>



  return (


    <>
      <TitlePage
        title="Información de caja"
        action={
          <Button
            variant="contained"
            startIcon={<Print />}
          >
            Descargar reporte
          </Button>
        }
      />
      <Grid container spacing={2}>

        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              // backgroundColor: '#f44336',
              // color: '#fff'
            }}

          >

            <CardHeader title='Balance'

            />

            <CardContent
              sx={{
                display: 'flex',
                gap: 1,

                alignItems: 'center'
              }}
            >
              <Typography variant='h3' >$ {data.balance || 0}</Typography>
              {
                data.balance > 0
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

            />

            <CardContent
              sx={{
                display: 'flex',
                gap: 1,

                alignItems: 'center'
              }}
            >
              <Typography variant='h3' >$ {data.totalIncomes + data.totalInvoices}</Typography>
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

            />

            <CardContent
              sx={{
                display: 'flex',
                gap: 1,

                alignItems: 'center'
              }}
            >
              <Typography variant='h3' >$ {data.totalExpenses}</Typography>
              <ArrowOutward color='error' />
            </CardContent>

          </Card>


        </Grid>

        <Grid item xs={12} md={8} >

          <Card>
            <CardHeader title='Transacciones' />

            <Tabs
              value={tabViewTransaction}
              onChange={(e, value) => setTabViewTransaction(value)}
            >
              <Tab label='Ingresos' value={ViewTransactionTabs.INCOMES} />
              <Tab label='Gastos' value={ViewTransactionTabs.EXPENSES} />
              {/* <Tab label='Facturas' value={ViewTransactionTabs.INVOICES} /> */}

            </Tabs>
            
            {
              tabViewTransaction === ViewTransactionTabs.INCOMES
                ? <TableIncomes cashRegister={data} />
                : <TableExpenses cashRegister={data} />
            }

          </Card>

        </Grid>

        <Grid item xs={12} md={4}>

          <Card>
            <CardHeader title='Resumen' />

            <CardContent>

              <Stack spacing={2} direction='column'>


                <Box display='flex' justifyContent='space-between' alignItems='center'>

                  <InputLabel id="date">Creado por</InputLabel>
                  <Typography variant='h5'  >{data.user.person.firstName} {data.user.person.lastName}</Typography>

                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center'>

                  <InputLabel id="date">Fecha</InputLabel>
                  <Typography variant='h5'  >{format(new Date(data.createdAt), 'yyyy-MM-dd HH:mm')}</Typography>

                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center'>

                  <InputLabel id="date">Monto inicial</InputLabel>
                  <Typography variant='h5'  >$ {data.initialAmount}</Typography>

                </Box>

                <Box display='flex' justifyContent='space-between' alignItems='center'>

                  <InputLabel id="date">Ventas</InputLabel>
                  <Typography variant='h4' color='success.main' >$ {data.totalInvoicesCash}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center'>

                  <InputLabel id="date">Ingresos</InputLabel>
                  <Typography variant='h4' color='success.main'>$ {data.totalIncomesCash}</Typography>

                </Box>

                <Box display='flex' justifyContent='space-between' alignItems='center'>

                  <InputLabel id="date">Gastos</InputLabel>
                  <Typography variant='h4' color='error.main'>$ {data.totalExpensesCash}</Typography>

                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center'>

                  <InputLabel id="date">Monto final</InputLabel>
                  <Typography variant='h3' >$ {data.balance}</Typography>
                </Box>

                <Divider />

                <Typography variant='h6' >Transferencias</Typography>

                <Box display='flex' justifyContent='space-between' alignItems='center'>

                  <InputLabel id="date">Ventas</InputLabel>
                  <Typography variant='h4' color='success.main' >$ {data.totalInvoicesTransfer}</Typography>
                </Box>

                <Box display='flex' justifyContent='space-between' alignItems='center'>

                  <InputLabel id="date">Ingresos</InputLabel>

                  <Typography variant='h4' color='success.main'>$ {data.totalIncomesTransfer}</Typography>

                </Box>

                <Box display='flex' justifyContent='space-between' alignItems='center'>

                  <InputLabel id="date">Gastos</InputLabel>

                  <Typography variant='h4' color='error.main'>$ {data.totalExpensesTransfer}</Typography>

                </Box>


              </Stack>

              {/* <div>{
                JSON.stringify(data)
              }</div> */}


            </CardContent>

          </Card>

        </Grid>


      </Grid>

    </>
  )
}