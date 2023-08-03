import { useState, useEffect } from 'react';

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
import { SummaryCash } from '../BalanceDashboard/components/SummaryCash.component';
import { SummaryTransfer } from '../BalanceDashboard/components/SummaryTransfer.component';
import { formatMoney } from '../../../Common/helpers/format-money.helper';
import { generatePdfCashReport } from '../../helpers/pdf-cash-report';
import { useIncomes } from '../../hooks/useIncomes';
import { useExpenses } from '../../hooks/useExpenses';


export const CashRegister = () => {


  const { cashRegisterId } = useParams();

  const navigate = useNavigate();

  if (!cashRegisterId)
    return <Navigate to="/balance/cash-register" replace />;

  const [tabViewTransaction, setTabViewTransaction] = useState<ViewTransactionTabs>(ViewTransactionTabs.INCOMES);

  const { cashRegisterQuery } = useCashRegister(cashRegisterId);

  const {incomesQuery, ...filterIncomes} = useIncomes();

  const {expensesQuery, ...filterExpenses} = useExpenses();

  const handlePrint = async () => {
    if( cashRegisterQuery.data ){
      const pdf =  await generatePdfCashReport(cashRegisterQuery.data, incomesQuery.data?.incomes || [], expensesQuery.data?.expenses  || [])
      pdf.open();
    }
  }

  const { data, isLoading } = cashRegisterQuery;

  useEffect(() => {
    if (data) {
      filterIncomes.handleChangeCashRegister(data);
      filterExpenses.handleChangeCashRegister(data);
    }
  }, [data])


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
            onClick={handlePrint}
          >
            Descargar reporte
          </Button>
        }
      />
      <Grid container spacing={2}>

        <Grid item xs={12} md={6} lg={4}>
          <SummaryCash cashRegister={data} />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <SummaryTransfer cashRegister={data} />
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
                  <Typography variant='h5'  >{formatMoney(data.initialAmount)}</Typography>

                </Box>

                {
                  data.isClosed && (
                    <>

                      <Divider />

                      <Typography variant='h5'  >Cierre de caja</Typography>
                      <Box display='flex' justifyContent='space-between' alignItems='center'>

                        <InputLabel id="date">Fecha de cierre</InputLabel>
                        <Typography variant='h5'  >{format(new Date(data.closingDate), 'yyyy-MM-dd HH:mm')}</Typography>

                      </Box>
                      <Box display='flex' justifyContent='space-between' alignItems='center'>

                        <InputLabel id="date">Balance</InputLabel>
                        <Typography variant='h4'  >{formatMoney(data.balance)}</Typography>

                      </Box>
                      <Box display='flex' justifyContent='space-between' alignItems='center'>

                        <InputLabel id="date">Monto final</InputLabel>
                        <Typography variant='h4'  >{formatMoney(data.finalAmount)}</Typography>

                      </Box>

                      <Box display='flex' justifyContent='space-between' alignItems='center'>

                        <InputLabel id="date">Discrepancia</InputLabel>
                        <Typography variant='h4' color={data.discrepancy ? 'warning.main' : 'inherit'}>{formatMoney(data.discrepancy)}</Typography>

                      </Box>
                    </>
                  )
                }



              </Stack>




            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={6} >
          {
            incomesQuery.data && (
              <IncomesList cashRegister={data} data={incomesQuery.data} filterIncomes={filterIncomes}/>
            )
          }

        </Grid>
        <Grid item xs={12} md={6} >
          <ExpensesList cashRegister={data} />


        </Grid>


      </Grid>

    </>
  )
}