import { Timeline } from '@mui/icons-material';
import { Card, CardHeader, CardContent, Button, Box, Typography, CardActions } from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';


export const PredictionAffluenceSummary = () => {
  return (
    <Card>

      <CardHeader
        avatar={<Timeline color='success' sx={{ fontSize: 40 }} />}
        title={
          <Typography variant="h4" >Predicción de afluencia</Typography>
        }
      />

      <CardActions
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
       
        <Button
          disableRipple
          to="prediction"
          component={RouterLink}
          variant="text"

        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  )
}