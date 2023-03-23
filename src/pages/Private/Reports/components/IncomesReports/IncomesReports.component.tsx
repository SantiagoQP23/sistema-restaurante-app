

import { useState } from 'react';


import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { getOrdersEachDate, getIncomes } from '../../services/dashboard.service';
import { DateIncome } from '../../models/date-orders.interface';
import { useAsync } from '../../../../../hooks/useAsync';
import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid, Box, Button, Typography, Stack, CardContent, Card, CardHeader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFIncomesReports } from './PDFIncomesReports.component';


export const IncomesReports = () => {


  const [datesIncome, setDatesIncome] = useState<DateIncome[]>([]);

  const { loading, callEndpoint } = useFetchAndLoad();

  const navigate = useNavigate();

  const getDatesIncomeCall = async () => await callEndpoint(getIncomes())



  const loadDatesIncomeState = (data: DateIncome[]) => { setDatesIncome(data); }

  useAsync(getDatesIncomeCall, loadDatesIncomeState, () => { }, []);

  const data = {
    labels: datesIncome.map(date => format(new Date(date.date), 'dd/MM/yyyy')),
    datasets: [
      {
        data: datesIncome.map(date => date.total),
        label: "Ingreso ($)",
        borderColor: "#3e95cd",
        fill: false,
        backgroundColor: "#3e95cd",

      },

    ]
  }

  const options = {
    plugins: {

      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pedidos por día'
      }
    }
  };



  return (
    <>
      <Grid container display='flex' justifyContent='space-between' mb={2} alignItems='center'>
        <Box sx={{ display: 'flex', }}>
          <Button onClick={() => { navigate('/reports') }}>
            <ArrowBack />
          </Button>
          <Typography variant="h3">Ingresos</Typography>

        </Box>

        <Box>

          <Stack direction="row" spacing={2}>
              <PDFDownloadLink
                document={<PDFIncomesReports dates={datesIncome} />}
                fileName="reporte-ingresos.pdf"
                >
                  <Button variant="contained" >
                    Descargar PDF
                  </Button>

                </PDFDownloadLink>
            </Stack>

          {/*

           
            <LoadingButton variant="contained" loading={loading} >
              Actualizar Predicción
            </LoadingButton>

            

           */}
        </Box>


      </Grid>

      <Grid container spacing={2}>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title={'Ingresos por día'} />
            
            <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Fecha</Typography>
                <Typography variant="h5" >
                  Total
                </Typography>
              </Box>
              {
                datesIncome.map(date => (
                  <Box key={date.date} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="h6">{format(new Date(date.date), 'EEEE dd/MM/yyyy', {locale: es})}</Typography>
                    <Typography variant="h5">$ {date.total}</Typography>
                  </Box>
                ))
              }
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Total</Typography>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                  ${datesIncome.reduce((acc, date) => acc + date.total, 0)}
                </Typography>
              </Box>
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={12} md={8}>

          <Card>
            <CardHeader title={'Ingresos por día'} />
            <CardContent>
              <Bar data={data} options={options} />

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}