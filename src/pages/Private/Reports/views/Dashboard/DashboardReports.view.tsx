import { Typography, Grid, Card, CardContent, Button, CardHeader, Box } from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';
import { MuiDateRangePicker, Day } from '../../components';

import { TitlePage } from '../../../components/TitlePage.component';
import {
  BestSellingProductsSummary, IncomesSummary, OrdersSummary,
  PredictionAffluenceSummary, SimulatorAffluenceSummary, StaffPlanningSummary
} from './components';
import { People } from '@mui/icons-material';
import { IncomesAndExpensesSummary } from './components/IncomesAndExpensesSummary.component';
import { UsersSummary } from '../../../Balance/views/BalanceDashboard/components/UsersSummary.component';


export const DashboardReports = () => {
  return (
    <>

      <TitlePage
        title='Dashboard'
      />

      <Grid container spacing={2} my={1}>
        {/* 
        <Grid item xs={12} md={3}>
          <Day />

        </Grid> */}

        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader
              title='Clientes'
              subheader='Cliente registrados'
              action={
                <Button
                  variant='outlined'
                  component={RouterLink}
                  to="/clients"
                  size='small'
                >
                  Ver todo
                </Button>
              }
            />

            <CardContent sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center'

            }}>

              <People />
              <Typography variant='h3'>0</Typography>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader
              title='Afluencia de clientes'
              action={
                <Button
                  variant='outlined'
                  component={RouterLink}
                  to="/clients"
                  size='small'
                >
                  Ver todo
                </Button>
              }
            />

            <CardContent sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center'

            }}>

              <People />
              <Box 
              display='flex'
              alignItems='flex-end'
              >
              <Typography variant='h3'>50</Typography>
              <Typography variant='h6'>/159</Typography>

              </Box>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <IncomesSummary />
        </Grid>


        <Grid item xs={12} md={3}>
            <OrdersSummary />
          </Grid>



        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={6} >

            <IncomesAndExpensesSummary />
            {/* <SimulatorAffluenceSummary /> */}

          </Grid>
          <Grid item xs={12} md={6}>
            <PredictionAffluenceSummary />
          </Grid>

          {/* 
          <Grid item xs={12} md={4}>
            <StaffPlanningSummary />
          </Grid> */}

          <Grid item xs={12} md={6}>
            <BestSellingProductsSummary />
          </Grid>

          <Grid item xs={12} md={6}>
            <UsersSummary />

            </Grid>





        </Grid>
      </Grid>


    </>
  )
}