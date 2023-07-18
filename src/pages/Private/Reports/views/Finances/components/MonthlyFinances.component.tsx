import { useEffect } from 'react';

import { Print } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Stack, Button, Typography } from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from '@tanstack/react-query';
import { startOfWeek } from 'date-fns';
import { Bar } from "react-chartjs-2";
import { useDateFilter } from '../../../../../../hooks/useDateFilter';
import { FinanceResponse, getFinances } from '../../../services/finances.service';
import { Period, GroupBy } from '../../../../../../models/period.model';


export const MonthlyFinances = () => {


  const {
    startDate,
    handleChangeStartDate

  } = useDateFilter(Period.CUSTOM);

  const { data, isLoading, refetch } = useQuery<FinanceResponse[]>(['financials'],
    () => {

      return getFinances({
        period: Period.YEAR,
        startDate,
        // endDate: new Date(), 
        groupBy: GroupBy.MONTH,

      })

    }, {
    onSuccess: (data) => {
      console.log(data)
    }
  })

  const dataChart = {
    labels: data?.map(finance => finance.date),
    datasets: [
      {
        label: 'Ingresos',
        data: data?.map(finance => finance.income.total),
        backgroundColor: 'rgba(75, 192, 192, 0.8)', // Color para los ingresos
      },
      {
        label: 'Gastos',
        data: data?.map(finance => finance.expense.total),
        backgroundColor: 'rgba(255, 99, 132, 0.8)', // Color para los gastos
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

  const resumen = [
    { label: 'Total Gastos', value: '$6,800' },
    { label: 'Total Ingresos', value: '$12,500' },
    { label: 'Balance', value: '$5,700' },
  ];

  const resumenPorMes = [
    { mes: 'Enero', gastos: 1000, ingresos: 2000 },
    { mes: 'Febrero', gastos: 1500, ingresos: 2500 },
    { mes: 'Marzo', gastos: 1200, ingresos: 2200 },
    { mes: 'Abril', gastos: 900, ingresos: 1800 },
    { mes: 'Mayo', gastos: 1100, ingresos: 1900 },
    { mes: 'Junio', gastos: 1300, ingresos: 2300 },
    { mes: 'Julio', gastos: 1000, ingresos: 2000 },
    { mes: 'Agosto', gastos: 1500, ingresos: 2500 },
    { mes: 'Septiembre', gastos: 1200, ingresos: 2200 },
    { mes: 'Octubre', gastos: 900, ingresos: 1800 },

  ];

  const balanceYear = data?.reduce((acc, month) => acc + month.balance, 0)

  const totalIncomes = data?.reduce((acc, month) => acc + Number(month.income.total), 0)

  const totalExpenses = data?.reduce((acc, month) => acc + Number(month.expense.total), 0)

  useEffect(() => {

    refetch()
  }, [startDate])


  return (

    <>

      <Stack direction='row' spacing={2} my={2}>
        <DatePicker
          views={['year']}
          label="Año"
          value={startDate}
          onChange={handleChangeStartDate}
          renderInput={(params) => <TextField  {...params} />}

        />

        <Button
          variant='contained'
          startIcon={<Print />}
        >

          Imprimir

        </Button>

      </Stack>
      <Grid container spacing={2} >
        <Grid item xs={12} md={8}>

          <Stack spacing={2}>

            <Card>
              <Box height={300} display='flex' justifyContent='center'>

                {
                  data && (
                    <Bar data={dataChart} options={options} />

                  )
                }

              </Box>


            </Card>

            <Card>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mes</TableCell>
                      <TableCell>Gastos</TableCell>
                      <TableCell>Ingresos</TableCell>
                      <TableCell>Balance</TableCell>
                    </TableRow>

                  </TableHead>
                  <TableBody>
                    {data?.map((month) => (
                      <TableRow>
                        <TableCell>{month.date}</TableCell>
                        <TableCell>$ {month.expense.total}</TableCell>
                        <TableCell>$ {month.income.total}</TableCell>
                        <TableCell>$ {month.balance}</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>

                </Table>

              </TableContainer>



            </Card>
          </Stack>

        </Grid>

        <Grid item xs={12} md={4}>
          <Stack direction='column' spacing={2} >

            <Card>

              <CardHeader title='Balance' />

              <CardContent
                sx={{
                  display: 'flex',
                  gap: 1,

                  alignItems: 'center'
                }}
              >
                <Typography variant='h3' color={balanceYear && balanceYear > 0 ? 'success.main' : 'error.main'}>$ {balanceYear}</Typography>



              </CardContent>


            </Card>

            <Card>

              <CardHeader title='Ingresos' />

              <CardContent
                sx={{
                  display: 'flex',
                  gap: 1,

                  alignItems: 'center'
                }}
              >
                <Typography variant='h3' color='success.main'>$ {totalIncomes}</Typography>


              </CardContent>

            </Card>

            <Card>

              <CardHeader title='Gastos' />

              <CardContent
                sx={{
                  display: 'flex',
                  gap: 1,

                  alignItems: 'center'
                }}
              >
                <Typography variant='h3' color='error.main'  >$ {totalExpenses}</Typography>


              </CardContent>

            </Card>




          </Stack>





        </Grid>
      </Grid>

    </>




  )
}