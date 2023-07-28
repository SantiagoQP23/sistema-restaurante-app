import { Card, CardHeader, CardContent, Button, Stack, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography, ListItemButton, Chip, List } from '@mui/material';
import { CardActions } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import { NavLink as RouterLink } from 'react-router-dom';
import { ResultBestSellingProducts, getBestSellingProducts } from '../../../services/dashboard.service';
import { useQuery } from '@tanstack/react-query';
import { EditOutlined } from '@mui/icons-material';
import { CustomGroupBy, GroupBy, Period } from '../../../hooks/useFilterSoldProducts';


export const BestSellingProductsSummary = () => {


  const { data } = useQuery<ResultBestSellingProducts>(['best-selling-products', { period: Period.DAILY, offset: 0, limit: 5 }], () => {
    return getBestSellingProducts({ period: Period.MONTHLY, offset: 0, limit: 5, groupBy: GroupBy.DAY, customGroupBy: CustomGroupBy.PRODUCT, startDate: new Date(), endDate: new Date() })
  })



  return (
    <Card>
      <CardHeader
        title="Productos"
        subheader='Productos más vendidos del mes'
        // subheader={
        //   <Chip
        //     label='Este mes'
        //     variant='filled'
        //     size='small'
        //     color='default'
        //   />
        // }
        action={
          <Button
            variant='outlined'
            component={RouterLink}
            to="products"
            size='small'
          >
            Ver todo


          </Button>
        }
      />

      <CardContent>

        <List>

          {

            data?.products.length
              ? data.products?.map((product, index) => (
                <ListItem>
                  <ListItemText
                    primary={product.productName}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={
                      <Chip
                        sx={{ mt: 0.5 }}
                        label={product.categoryName}
                        size='small'
                      />
                    }
                  />
                  <ListItemSecondaryAction

                  >
                    <Typography variant='h6'>{product.totalSold}</Typography>
                    <Typography variant='h5' color='success'>$ {2 * product.totalSold}</Typography>

                  </ListItemSecondaryAction>


                </ListItem>
              ))
              : <>
                <Typography variant='h4' align='center'>No hay datos</Typography>
              </>
          }

        </List>
      </CardContent>

      {/* <CardActions
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

      </CardActions> */}

    </Card>


  )
}