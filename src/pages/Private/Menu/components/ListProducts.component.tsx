import { FC, useContext } from 'react';

import { Grid, Box } from '@mui/material/';

import { Product } from './Product.component';
import { IProduct } from '../../../../models';
import { useProducts } from '../../../../hooks';
import { MenuContext } from '../../../../context/MenuContext';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../../redux';

interface Props {
  // products: IProduct[]
}

export const ListProducts: FC<Props> = () => {

  const { products } = useSelector(selectMenu);

  return (

    <>
      <Grid container spacing={1} mt={1}>

        {
          products.length === 0 
          ? <><h4>No se han añadido productos</h4></>
          : (

            products.map((p) => (
              <Grid key={p.id} item xs={12} md={12} lg={6} xl={4}>

                <Product key={p.id} product={p} />

              </Grid>
            ))

          )
        }
      </Grid>

    </>

  );
};
