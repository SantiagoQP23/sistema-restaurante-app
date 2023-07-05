import { Typography, Grid, Card, CardContent, Button, CardHeader } from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';
import { MuiDateRangePicker, Day } from './';
import { StaffPlanningSummary } from './StaffPlanningSummary.component';
import { OrdersSummary } from './OrdersSummary.component';
import { IncomesSummary } from './IncomesSummary.component';
import { SimulatorAffluenceSummary } from './SimulatorAffluenceSummary.component';
import { PredictionAffluenceSummary } from './PredictionAffluenceSummary.component';
import { BestSellingProductsSummary } from './BestSellingProductsSummary.component';
import { TitlePage } from '../../components/TitlePage.component';


export const DashboardReports = () => {
  return (
    <>
    
      <TitlePage 
      title='Dashboard'
      />

      <Grid container spacing={1} my={1}>

        <Grid item xs={12} md={3}>
          <Day />

        </Grid>
       

        <Grid container item xs={12} md={9} spacing={1}>
          <Grid item xs={12} md={4} >
            <SimulatorAffluenceSummary />

          </Grid>
          <Grid item xs={12} md={4}>
            <PredictionAffluenceSummary />
          </Grid>


          <Grid item xs={12} md={4}>
            <StaffPlanningSummary />
          </Grid>


          <Grid item xs={12} md={4}>
            <OrdersSummary />
          </Grid>

          <Grid item xs={12} md={4}>
            <IncomesSummary />
          </Grid>

          <Grid item xs={12} md={4}>
          <BestSellingProductsSummary />


          </Grid>


          </Grid>
        </Grid>


      </>
      )
}