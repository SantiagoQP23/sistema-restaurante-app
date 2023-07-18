import { Timeline } from '@mui/icons-material';
import { Card, CardHeader, CardContent, Button, Box, Typography, CardActions, List, ListItem, ListItemText, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';

import { NavLink as RouterLink } from 'react-router-dom';


export const PredictionAffluenceSummary = () => {


  const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Afluencia',
        data: [100, 150, 200, 180, 220, 250, 210],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false
      },
    ],
  };

  const options = {
    scales: {
      // x: {
      //   display: false,
      // }
      // ,

      y: {
        display: false,
        beginAtZero: true,
      },
    },
  };



  return (
    <Card>

      <CardHeader
        // avatar={<Timeline color='success' sx={{ fontSize: 40 }} />}
        title={
          <Typography variant="h4" >Predicción de afluencia</Typography>
        }
        subheader='Asistencia de clientes en la semana'
        action={
          <Button
            disableRipple
            to="prediction"
            component={RouterLink}
            variant="outlined"
            color='success'
            size='small'

          >
            Ver más
          </Button>

        }
      />

      <CardContent>
        <Line data={data} options={options} />

      </CardContent>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Typography variant='h4' align='center'>100</Typography>
          <Typography variant='h6' align='center'>Lunes</Typography>

        </Grid>

        <Grid item xs={3}>
          <Typography variant='h4' align='center'>150</Typography>
          <Typography variant='h6' align='center'>Martes</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant='h4' align='center'>250</Typography>
          <Typography variant='h6' align='center'>Domingo</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h4' align='center'>100</Typography>
          <Typography variant='h6' align='center'>Lunes</Typography>

        </Grid>

        <Grid item xs={3}>
          <Typography variant='h4' align='center'>150</Typography>
          <Typography variant='h6' align='center'>Martes</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant='h4' align='center'>250</Typography>
          <Typography variant='h6' align='center'>Domingo</Typography>
        </Grid>


      </Grid>

     



      <CardActions
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >


      </CardActions>
    </Card>
  )
}