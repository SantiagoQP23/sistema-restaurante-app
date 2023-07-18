import { Card, CardHeader, CardContent, Stack, Typography, Box, Divider, Grid, Button } from '@mui/material';
import { Bar, Line } from "react-chartjs-2";
import { NavLink as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FinanceResponse, getFinances } from '../../../services/finances.service';
import { useDateFilter } from '../../../../../../hooks/useDateFilter';
import { GroupBy, Period } from '../../../../../../models/period.model';
import { format, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';



export const IncomesAndExpensesSummary = () => {


  const { } = useDateFilter(Period.CUSTOM);

  const { data, isLoading } = useQuery<FinanceResponse[]>(['financials'], 
  () => {

    return getFinances({ 
      period: Period.CUSTOM, 
      startDate: startOfWeek(new Date()), 
      endDate: new Date(), 
      groupBy: GroupBy.DAY,
      
     })

  },{
    onSuccess: (data) => {
      console.log(data)
    }
  })


  const dataChart = {
    labels: data?.map(finance => format(new Date(finance.date), 'eeee dd/MM/yyyy', { locale: es })),
    datasets: [
      {
        label: 'Ingresos',
        data: data?.map(finance => finance.income.total),
        backgroundColor: 'rgba(75, 192, 192, 1)', // Color sólido
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.4,
      },
      {
        label: 'Gastos',
        data: data?.map(finance => finance.expense.total),
        backgroundColor: 'rgba(255, 99, 132, 1)', // Color sólido
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };



  return (

    <Card>
      <CardHeader
        title='Finanzas'
        subheader='Ingresos y gastos de la semana'

        action={
          <Button
            variant='outlined'
            component={RouterLink}
            to="finances"
            size='small'
          >
            Ver todo
          </Button>
        }
      />
      <CardContent>

        <Box>

          {
            data && (
              <Bar data={dataChart} options={options} />

            )

          }
        </Box>


        <Grid container spacing={1} mt={2}>
          <Grid item xs={6} >


            <Typography variant='h3' textAlign='center' color='success.main'>
              $ {data?.reduce((acc, day) => Number(day.income.total) + acc, 0)}
              </Typography>
            <Typography variant='subtitle2' textAlign='center'>Ingresos</Typography>

          </Grid>

          <Grid item xs={6} >

            <Typography variant='h3' textAlign='center' color='error.main'>
              $ {data?.reduce((acc, day) => Number(day.expense.total) + acc, 0)}
              </Typography>
            <Typography variant='subtitle2' textAlign='center'>Gastos</Typography>

          </Grid>

          <Grid item xs={12} >

            {/* <Typography variant='subtitle1' textAlign='center'>Balance</Typography> */}

            <Typography variant='h3' textAlign='center' color={true ? 'success.main' : 'error.main'}>$ {data?.reduce((acc, day) => day.balance + acc, 0)}</Typography>



          </Grid>
        </Grid>

      </CardContent>
    </Card>
  )
}