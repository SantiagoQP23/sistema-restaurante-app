import { Card, CardHeader, CardContent, Button, Stack, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { CardActions } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import { NavLink as RouterLink } from 'react-router-dom';
import { ResultBestSellingProducts, getBestSellingProducts } from '../../services/dashboard.service';
import { Period } from '../../../../../models/period.model';
import { useQuery } from '@tanstack/react-query';
import { EditOutlined } from '@mui/icons-material';


export const BestSellingProductsSummary = () => {


  const { data } = useQuery<ResultBestSellingProducts>(['best-selling-products', { period: Period.TODAY, offset: 0, limit: 5 }], () => {
    return getBestSellingProducts({ period: Period.TODAY, offset: 0, limit: 5 })
  })



  return (
    <Card>
      <CardHeader title="Productos más vendidos" />

      <CardContent>

        {
          data && data.products?.map((product, index) => (
            <ListItem>
              <ListItemAvatar

              >
                <Typography variant='h4'>{product.totalSold}</Typography>

              </ListItemAvatar>
              <ListItemText primary={product.name} />

              {/* <ListItemSecondaryAction>
                <IconButton
                >
                  <EditOutlined />
                </IconButton>
              </ListItemSecondaryAction> */}

            </ListItem>
          ))
        }

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