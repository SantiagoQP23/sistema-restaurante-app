import { Groups } from '@mui/icons-material';
import { Card, CardHeader, CardContent, Button, Box, Typography } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';


export const StaffPlanningSummary = () => {

  return (
    <>
      <Card>

        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Groups color='info' sx={{ fontSize: 40 }} />
            <Typography variant="h4" component="div" my={2}>Planificación del personal</Typography>
          </Box>

          <Button
            disableRipple
            to="staff-planning"
            component={RouterLink}
            variant="text"

          >
            Ver más
          </Button>

        </CardContent>




      </Card>
    </>
  )
}