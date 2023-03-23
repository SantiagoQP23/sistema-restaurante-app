import { Assessment, AssignmentInd } from '@mui/icons-material';
import { Card, CardHeader, CardContent, Button, Box, Typography } from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';

export const SimulatorAffluenceSummary = () => {
  return (
    <Card>

      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <Assessment color='primary' sx={{ fontSize: 40 }} />
          <Typography variant="h4" component="div" my={2}>Simulador de afluencia</Typography>
        </Box>
        <Button
          disableRipple
          to="simulation"
          component={RouterLink}
          variant="text"

        >
          Ver más
        </Button>
      </CardContent>
    </Card>
  )
}