import { Typography, Grid, Card, CardContent, Button, CardHeader } from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';
import { Day } from '../Day.component';
import { MuiDateRangePicker } from '../MuiDateRangePicker.component';
import {  StaffPlanningSummary } from './StaffPlanningSummary.component';


export const DashboardReports = () => {
  return (
    <>
      <Typography variant="h4" >Dashboard</Typography>

      <Grid container spacing={2} my={1}>
        <Grid item xs={12} md={3} >
          <Card>
          <CardHeader title="Simulador de afluencia" />

            <CardContent>
              <Button
                disableRipple
                to="simulator" 
                component={RouterLink}
                variant="outlined"

              >
                Ver más
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader title="Predicción de afluencia" />
            <CardContent>
              <Button
                disableRipple
                to="prediction" 
                component={RouterLink}
                variant="outlined"

              >
                Ver más
              </Button>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} md={3}>
          <StaffPlanningSummary />
        </Grid>

        <Grid item xs={12} md={3}>
          <Day />

        </Grid>

        {/* <Grid item>
          <MuiDateRangePicker />
          </Grid> */}
      </Grid>
    </>
  )
}