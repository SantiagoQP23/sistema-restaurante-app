import {  useState } from 'react';
import {  useSelector } from 'react-redux';

import {  Container, Grid} from '@mui/material';
import { InputSearch, PageTitle, PageTitleWrapper } from '../../../components/ui';

import { selectMenu } from '../../../redux';

import { IProduct } from '../../../models';

// Componentes
import { AllMenu } from './components/AllMenu.component';

import { ListProductsFounded } from './components/ListProductsFounded.component';

import { findProductsByName,  getProducts } from '../../../helpers';


export const Menu = () => {

  const { sections } = useSelector(selectMenu);

  const [nameProduct, setNameProduct] = useState('');

  const [products, setProducts] = useState<IProduct[]>([]);

  const ListProducts = getProducts(sections);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameProduct(event.target.value);

    setProducts(findProductsByName(nameProduct, ListProducts));

  
  };

  const searchProduct = () => {
    setProducts(findProductsByName(nameProduct, ListProducts));
  }

  const searchingProduct = () => {
    return nameProduct.length > 0;
  }

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
          <Grid item xs={12}>


            <InputSearch
              handleChange={handleChange}
              search={searchProduct}
              placeholder={'Nombre del producto'}
            />

          </Grid>

          {
            searchingProduct()
              ? <ListProductsFounded products={products} />
              : <AllMenu />
          }

        </Grid>
      </Container>


    </>
  )
}

export default Menu
