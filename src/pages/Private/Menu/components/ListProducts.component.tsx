import { FC, useContext } from 'react';

import { Grid, Box } from '@mui/material/';

import { Product } from './Product.component';
import { IProduct } from '../../../../models';
import { useProducts } from '../../../../hooks';
import { MenuContext } from '../../../../context/MenuContext';

interface Props {
  // products: IProduct[]
}

export const ListProducts: FC<Props> = () => {

  const { products } = useContext(MenuContext);

  return (

    <>
      <Grid container spacing={1} mt={1}>

        {
          products.length > 0 && (

            products.map((p) => (
              <Grid key={p.id} item xs={12} md={12} lg={4} xl={3}>

                <Product key={p.id} product={p} />

              </Grid>
            ))

          )
        }
      </Grid>

    </>

  );
};
