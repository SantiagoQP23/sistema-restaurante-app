import { useEffect } from 'react';

import { Print } from '@mui/icons-material';
import { Card, CardContent, CardHeader, List, ListItem, ListItemText, Grid, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Bar, Line } from "react-chartjs-2";
import { Period, GroupBy } from '../../../../../../models/period.model';
import { useDateFilter } from '../../../../../../hooks/useDateFilter';
import { FinanceResponse, getFinances } from '../../../services/finances.service';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export const DailyFinances = () => {


  const {
    startDate,
    handleChangeStartDate

  } = useDateFilter(Period.CUSTOM);


  const { data, isLoading, refetch } = useQuery<FinanceResponse[]>(['financials'],
    () => {

      return getFinances({
        period: Period.MONTH,
        startDate,
        // endDate: new Date(), 
        groupBy: GroupBy.DAY,

      })

    }, {
    onSuccess: (data) => {
      console.log(data)
    }
  })


  const dataChart = {
    labels: data?.map(finance => format(new Date(finance.date), 'eeee dd/MM/yyyy', { locale: es })),
    datasets: [
      {
        label: 'Ventas Diarias',
        data: data?.map(finance => finance.income.total),
        // fill:false,
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        // tension: 0.4,
      }, {
        label: 'Gastos Diarios',
        data: data?.map(finance => finance.expense.total),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',

      }
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const balanceMonth = data?.reduce((acc, curr) => acc + curr.balance, 0);

  const totalIncomes = data?.reduce((acc, curr) => acc + Number(curr.income.total), 0);

  const totalExpenses = data?.reduce((acc, curr) => acc + Number(curr.expense.total), 0);

  const resumen = [
    { label: 'Total de Ventas', value: '$5,200' },
    { label: 'Promedio Diario', value: '$167' },
    { label: 'Ventas Máximas', value: '$220' },
    { label: 'Ventas Mínimas', value: '$90' },
  ];

  useEffect(() => {

    refetch()
  }, [startDate])



  return (
    <>

      <Stack direction='row' spacing={2} my={2}>
        <DatePicker
          views={['month', 'year']}
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>

          <Stack direction='column' spacing={2}>
          <Card>
            {
              data && (

                <Bar data={dataChart} options={options} />
              )
            }
          </Card>

          <Card>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Día</TableCell>
                    <TableCell>Gastos</TableCell>
                    <TableCell>Ingresos</TableCell>
                    <TableCell>Balance</TableCell>
                  </TableRow>

                </TableHead>

                <TableBody>
                  {
                    data?.map((day) => (
                      <TableRow>
                        <TableCell>{format(new Date(day.date), 'eeee dd/MM/yyyy', { locale: es })}</TableCell>
                        <TableCell>$ {day.expense.total}</TableCell>
                        <TableCell>$ {day.income.total}</TableCell>
                        <TableCell>$ {day.balance}</TableCell>
                      </TableRow>

                    ))
                  }

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
                <Typography variant='h3' color={balanceMonth && balanceMonth > 0 ? 'success.main' : 'error.main'}>$ {balanceMonth}</Typography>



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






          {/* <Card
          >

            <CardHeader
              title='Resumen del mes'
            />
            <CardContent>


              <List>

                <ListItem>
                  <ListItemText primary='Balance' secondary={`$ ${balanceMonth}`} />

                </ListItem>
                <ListItem>
                  <ListItemText primary='Ingresos' secondary={`$ ${incomesMonth}`} />

                </ListItem>
                <ListItem>
                  <ListItemText primary='Gastos' secondary={`$ ${expensesMonth}`} />

                </ListItem>

                {/* {resumen.map((item) => (
                  <ListItem key={item.label}>
                    <ListItemText primary={item.label} secondary={item.value} />
                  </ListItem>
                ))} 
              </List>


            </CardContent>
          </Card> */}
                

        </Grid>
      </Grid>




    </>
  )
}