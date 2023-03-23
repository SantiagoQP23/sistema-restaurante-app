import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Grid } from '@mui/material';
import { InputSearch, PageTitle, PageTitleWrapper } from '../../../components/ui';

import { selectMenu, setActiveCategory, setActiveSection } from '../../../redux';

import { IProduct } from '../../../models';

// Componentes
import { AllMenu } from './components/AllMenu.component';

import { ListProducts } from './components/ListProducts.component';

import { findProductsByName, getProducts } from '../../../helpers';


export const Menu = () => {

  const { sections } = useSelector(selectMenu);

  const [nameProduct, setNameProduct] = useState('');

  const [products, setProducts] = useState<IProduct[]>([]);

  const listProducts = getProducts(sections);

  const dispatch = useDispatch();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameProduct(event.target.value);

    setProducts(findProductsByName(nameProduct, listProducts));


  };

  const searchProduct = () => {
    setProducts(findProductsByName(nameProduct, listProducts));
  }

  const searchingProduct = () => {
    return nameProduct.length > 0;
  }

  useEffect(() => {
    dispatch(setActiveSection(sections[0]));
    dispatch(setActiveCategory(sections[0]?.categories[0]));

  }, [])

  return (
    < >

      <PageTitleWrapper>
        <PageTitle
          heading='Menu'
          subHeading='Navege por los platos que ofrece el restaurante'
        />
      </PageTitleWrapper>


      <Container maxWidth="lg">

        <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Grid item xs={12} mb={1}>


            <InputSearch
              handleChange={handleChange}
              search={searchProduct}
              placeholder={'Nombre del producto'}
            />

          </Grid>
          <Grid item xs={12} mb={1}>

            {
              searchingProduct()
                ? <ListProducts products={products} />
                : <AllMenu />
            }

          </Grid>
        </Grid>
      </Container>


    </>
  )
}

export default Menu
