import { Card, CardHeader, CardContent, Button, Stack } from '@mui/material';
import { CardActions } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import { NavLink as RouterLink } from 'react-router-dom';


export const BestSellingProductsSummary = () => {


  return (
    <Card>
      <CardHeader title="Productos más vendidos" />

      <CardContent>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: 'center',
        }}
       >
          <Button
            component={RouterLink}
            to="products"
          >
            Ver más
          </Button>

      </CardActions>

    </Card>


  )
}