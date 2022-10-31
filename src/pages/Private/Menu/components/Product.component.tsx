import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Card, CardContent, Typography, CardMedia, Box, Button } from '@mui/material/';
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

          <CardContent  sx={{ flex: '1 0 auto' }} >

            <Typography variant="h6" color='primary' >{product.name}</Typography>
            <Typography variant="h6" color='white' >$ {product.price}</Typography>
            <Typography variant="h6" color='white' >Descripcion: {product.description}</Typography>

           

          </CardContent>
        </Box>
      </Card>

    </>
  );
}