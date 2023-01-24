import { FC } from 'react';

import { Grid } from '@mui/material';
import { IProduct } from '../../../../models/menu.model';
import { Product } from './Product.component';

interface ProductsListProps {
  products: IProduct[]
}

export const ListProductsFounded: FC<ProductsListProps> = ({ products }) => {

  return (
    <>
      <Grid container spacing={1}>
        {
          products.map(product => (
            <Grid key={product.id} item xs={12} sm={6} lg={4}>
              <Product product={product} />

            </Grid>
          ))
        }
      </Grid>
    </>
  )

}