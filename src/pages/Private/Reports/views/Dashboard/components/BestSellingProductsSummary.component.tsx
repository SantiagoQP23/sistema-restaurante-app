import { Card, CardHeader, CardContent, Button, Stack, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography, ListItemButton } from '@mui/material';
import { CardActions } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import { NavLink as RouterLink } from 'react-router-dom';
import { ResultBestSellingProducts, getBestSellingProducts } from '../../../services/dashboard.service';
import { useQuery } from '@tanstack/react-query';
import { EditOutlined } from '@mui/icons-material';
import { CustomGroupBy, GroupBy, Period } from '../../../hooks/useFilterSoldProducts';


export const BestSellingProductsSummary = () => {


  const { data } = useQuery<ResultBestSellingProducts>(['best-selling-products', { period: Period.DAILY, offset: 0, limit: 5 }], () => {
    return getBestSellingProducts({ period: Period.DAILY, offset: 0, limit: 5, groupBy: GroupBy.DAY, customGroupBy: CustomGroupBy.PRODUCT})
  })



  return (
    <Card>
      <CardHeader title="Productos más vendidos" />

      <CardContent>

        {
          data && data.products?.map((product, index) => (
            <ListItemButton>
              <ListItemText primary={product.name}  />
              <ListItemSecondaryAction

              >
                <Typography variant='h4'>{product.totalSold}</Typography>

              </ListItemSecondaryAction>

              {/* <ListItemSecondaryAction>
                <IconButton
                >
                  <EditOutlined />
                </IconButton>
              </ListItemSecondaryAction> */}

            </ListItemButton>
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