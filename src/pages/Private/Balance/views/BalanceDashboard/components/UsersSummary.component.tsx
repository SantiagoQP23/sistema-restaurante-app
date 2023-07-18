import { useEffect } from 'react';

import { Card, CardContent, Button, CardHeader, Typography, ListItem, ListItemSecondaryAction, ListItemText, List, ListItemIcon, Chip, Stack, Box, ListItemAvatar, Avatar, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useUsers } from '../../../../Users/hooks/useUsers';
import { NavLink as RouterLink } from 'react-router-dom';
import { Person } from '@mui/icons-material';
import { Pie } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDateFilter } from '../../../../../../hooks/useDateFilter';
import { Period } from '../../../../../../models/period.model';
import { generate, groupBy } from 'rxjs';
import { GroupBy } from '../../../../Reports/hooks/useFilterSoldProducts';
import { DesktopDatePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { ResponseIncomesByUser, getIncomesByUser } from '../../../../Reports/services/dashboard.service';
import { useQuery } from '@tanstack/react-query';
import { Roles, ValidRoles } from '../../../../../../models';
import { generateRandomColor } from '../../../../Common/helpers/randomColor.helpert';
import { eachMonthOfInterval } from 'date-fns';



ChartJS.register(ArcElement, Tooltip, Legend);


export const UsersSummary = () => {

  const {
    period,
    startDate,
    endDate,
    endDateChecked,
    handleChangeEndDate,
    handleChangeEndDateChecked,
    handleChangePeriod,
    handleChangeStartDate,


  } = useDateFilter(Period.TODAY);

  const { data, refetch, isLoading, isFetching } = useQuery<ResponseIncomesByUser[]>(['best-selling-products', { period, startDate, endDate }],
    () => {
      return getIncomesByUser({ period, startDate, endDate: endDateChecked ? endDate : null, })
    }, {
    onSuccess: (data) => {
      console.log(data)
    }
  })



  const dataChart = {
    labels: data?.map(user => user.firstName + ' ' + user.lastName),
    datasets: [
      {
        data: data?.map(user => Number(user.total)),
        backgroundColor: data?.map(user => generateRandomColor()),
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
    x: {
      display: false,

    }

  };


  useEffect(() => {
    refetch();

  }, [period, endDateChecked, startDate, endDate, groupBy])





  return (
    <>
      <Card>

        <CardHeader
          title='Usuarios'
          subheader='Ingresos de usuarios en el día'
          action={
            <Button
              variant='outlined'

              size='small'
              onClick={() => window.print()}

            >
              Imprimir
            </Button>
          }
        />

        <Grid container spacing={2} p={1}>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="select-period-label">Periodo</InputLabel>
              <Select
                labelId="select-period-label"

                value={period}
                onChange={handleChangePeriod}
                fullWidth

                label="Periodo"
                size='medium'
              >
                <MenuItem value={Period.TODAY}>Diario</MenuItem>
                <MenuItem value={Period.MONTH}>Mensual</MenuItem>
                <MenuItem value={Period.YEAR}>Anual</MenuItem>

                <MenuItem value={Period.CUSTOM}>Personalizado</MenuItem>




              </Select>
            </FormControl>

          </Grid>


          <Grid item xs={12} md={4} >
            <DesktopDatePicker
              label="Fecha de inicio"
              inputFormat={
                period === Period.MONTH ? 'yyyy MMMM' :
                  period === Period.YEAR ? 'yyyy' : 'yyyy-MM-dd'
              }
              value={startDate}
              onChange={handleChangeStartDate}
              renderInput={(params) => <TextField {...params} />}
              disableFuture
              maxDate={endDate ? endDate : undefined}
              views={
                period === Period.MONTH ? ['month', 'year'] :
                  period === Period.YEAR ? ['year'] : ['day']

              }

            />

          </Grid>

          {

            startDate && period === Period.CUSTOM &&

            <Grid item xs={12} md={4}>


              <DesktopDateTimePicker
                label="Fecha de fin"
                inputFormat="yyyy-MM-dd"
                value={endDate}
                onChange={handleChangeEndDate}
                renderInput={(params) => <TextField {...params} />}
                minDate={startDate}
                disableFuture

              />
            </Grid>
          }

        </Grid>


        <Box height={200} width={'100%'} display='flex' justifyContent='center'>

          {
            data && (
              <Pie data={dataChart} options={options} />

            )
          }

        </Box>

        <List>

          {
            data?.map((user, index) => (

              <ListItem>
                <ListItemAvatar>
                  <Avatar

                  >

                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText

                  primary={user.firstName + ' ' + user.lastName}
                  secondary={

                    <Stack spacing={1} direction='row'>
                      <Chip
                        label={Roles[`${user.roleName as ValidRoles}`]}
                        size='small'
                      />
                      <Chip
                        label={`${user.orderCount} pedidos`}
                        size='small'
                      />
                    </Stack>

                  }

                />

                <ListItemSecondaryAction>
                  <Typography variant='h4'>$ {user.total}</Typography>
                </ListItemSecondaryAction>


              </ListItem>



            ))
          }



          {/* <ListItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText

              primary='Santiago Quirumbay'
              secondary={

                <Stack spacing={1} direction='row'>
                  <Chip
                    label='Administrador'
                    size='small'
                  />
                  <Chip
                    label='10 pedidos'
                    size='small'
                  />
                </Stack>

              }

            // primaryTypographyProps={{
            //   color: 'success.main'
            // }}

            />

            <ListItemSecondaryAction>
              <Typography variant='h4' color='success.main'>$ 1000</Typography>
            </ListItemSecondaryAction>


          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText

              primary='Santiago Quirumbay'
              secondary={

                <Stack spacing={1} direction='row'>
                  <Chip
                    label='Mesero'
                    size='small'
                  />
                  <Chip
                    label='10 pedidos'
                    size='small'
                  />
                </Stack>

              }

            />

            <ListItemSecondaryAction>
              <Typography variant='h4'>$ 1000</Typography>
            </ListItemSecondaryAction>


          </ListItem>

        */}

        </List>





      </Card>
    </>
  )
}