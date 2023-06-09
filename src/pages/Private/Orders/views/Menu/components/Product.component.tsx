import { Card, CardContent, Typography, CardMedia, Box, Button, Grid, styled, Link } from '@mui/material/';
import { FC } from 'react';
import { Label } from '../../../../../../components/ui';
import { IProduct } from '../../../../../../models';
import { ProductStatus, ProductStatusSpanish } from '../../../../../../models/menu.model';
import { IconButton, Stack } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { sharingInformationService } from '../../../services/sharing-information.service';


interface Props {
  product: IProduct
}


const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  borderRadius: 8,
  objectFit: 'cover',
  position: 'absolute',
});


export const Product: FC<Props> = ({ product }) => {

  
  const addProductoToOrder = () => {

    sharingInformationService.setSubject(
      true,
      {
        product,
        quantity: 1
      }
    )
    }

  return (
    < >


      <Card
        sx={{
          
        }}
      >

        <Box sx={{ pt: '100%', position: 'relative' }}>
          {
            product.status && (
              <Label

                color={(product.status === ProductStatus.AVAILABLE && 'success') || 'info'}

                sx={{
                  zIndex: 9,
                  top: 16,
                  right: 16,
                  position: 'absolute',
                  textTransform: 'uppercase',
                }}
              >
                {ProductStatusSpanish[`${product.status as ProductStatus}`]}
              </Label>
            )
          }


          <StyledProductImg alt={product.name} src={product.images || "/static/images/products/no-image.png"} />
        </Box>

        <Stack spacing={1} sx={{ p: 2 }} >


          <Link color="inherit" underline='hover' sx={{
            '&:hover': {
              cursor: 'pointer',
            }
          }}>
            <Typography variant="h4" >
              {product.name}
            </Typography>
          </Link>



          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant="h5" >$ {product.price}</Typography>
            <IconButton
              color='primary'
              onClick={addProductoToOrder}
            >
              <AddShoppingCart />
            </IconButton>
          </Stack>

        </Stack>


      </Card>

    </>
  );
}