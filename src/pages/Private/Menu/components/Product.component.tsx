import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Card, CardContent, Typography, CardMedia, Box, Button, Grid } from '@mui/material/';
import { FC } from 'react';
import { IProduct } from '../../../../models';


interface Props {
  product: IProduct
}


export const Product: FC<Props> = ({ product }) => {
  return (
    < >


      <Card sx={{ display: 'flex' }} >
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/static/images/products/no-image.png"
          alt="Product"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

          <CardContent sx={{ flex: '1 0 auto' }} >

            <Grid container spacing={1}>


              <Grid item xs={12}>
                <Typography variant="h3" >{product.name}</Typography>

              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" >

                  {
                    product.description ? product.description : 'Sin descripción'
                  }
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" color='orangered' >$ {product.price}</Typography>

              </Grid>

            </Grid>


          </CardContent>
        </Box>
      </Card>

    </>
  );
}