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
import { FootfallSummary } from './components/FootfallSummary.component';
import { ClientsSummary } from './components/ClientsSummary.component';


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
          <ClientsSummary />
        </Grid>

        <Grid item xs={12} md={3}>
         <FootfallSummary />
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