import { Typography, Grid, Card, CardContent, Button, CardHeader } from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';
import { MuiDateRangePicker, Day } from '../../components';

import { TitlePage } from '../../../components/TitlePage.component';
import { BestSellingProductsSummary, IncomesSummary, OrdersSummary, 
  PredictionAffluenceSummary, SimulatorAffluenceSummary, StaffPlanningSummary } from './components';


export const DashboardReports = () => {
  return (
    <>
    
      <TitlePage 
      title='Dashboard'
      />

      <Grid container spacing={1} my={1}>
{/* 
        <Grid item xs={12} md={3}>
          <Day />

        </Grid> */}
       

        <Grid container item xs={12}  spacing={1}>
          <Grid item xs={12} md={4} >
            <SimulatorAffluenceSummary />

          </Grid>
          <Grid item xs={12} md={4}>
            <PredictionAffluenceSummary />
          </Grid>

{/* 
          <Grid item xs={12} md={4}>
            <StaffPlanningSummary />
          </Grid> */}


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