import { Timeline } from '@mui/icons-material';
import { Card, CardHeader, CardContent, Button, Box, Typography } from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';


export const PredictionAffluenceSummary = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <Timeline color='success' sx={{ fontSize: 40 }} />
          <Typography variant="h4" component="div" my={2}>Predicción de afluencia</Typography>
        </Box>
        <Button
          disableRipple
          to="prediction"
          component={RouterLink}
          variant="text"

        >
          Ver más
        </Button>
      </CardContent>
    </Card>
  )
}