import { Card, CardHeader, CardContent, Button } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';





export const StaffPlanningSummary = () => {






  return (
    <>
      <Card>
        <CardHeader title="Planificación del personal" />
        <CardContent>

          <Button
            disableRipple
            to="staff-planning"
            component={RouterLink}
            variant="outlined"

          >
            Ver más
          </Button>

        </CardContent>




      </Card>
    </>
  )
}