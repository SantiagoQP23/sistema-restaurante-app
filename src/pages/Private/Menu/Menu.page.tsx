import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Container, Grid, Typography, Stack } from '@mui/material';
import { InputSearch, PageTitle, PageTitleWrapper } from '../../../components/ui';

import { selectMenu, selectOrders, setActiveCategory, setActiveOrder, setActiveSection } from '../../../redux';

import { IProduct } from '../../../models';

// Componentes
import { AllMenu } from './components/AllMenu.component';

import { ListProducts } from './components/ListProducts.component';

import { findProductsByName, getProducts } from '../../../helpers';
import { ProductSortByCategory } from './components/ProductSortByCategory.component';
import { ProductSortBySection } from './components/ProductSortBySection.components';
import { TitlePage } from '../components/TitlePage.component';
import { CartWidget } from './components/CartWidget.component';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../Orders/context/Order.context';


export const MenuAddProduct = () => {

  const { sections } = useSelector(selectMenu);

  const listProducts = getProducts(sections);

  const [nameProduct, setNameProduct] = useState('');

  const [products, setProducts] = useState<IProduct[]>([]);


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


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { sm: 'space-between' },

          flexDirection: { xs: 'column', sm: 'row' }

        }}
      >

        <Box
          sx={{
            width: '250px',
          }}
        >

          <InputSearch
            handleChange={handleChange}
            search={searchProduct}
            placeholder={'Buscar producto'}
          />

        </Box>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="right" >
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} flexShrink={0} sx={{ my: 1 }}>

            <ProductSortBySection />

            <ProductSortByCategory />

          </Stack>
        </Stack>
      </Box>



      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Grid item xs={12} mb={1}>



        </Grid>


        <Grid item xs={12} mb={1}>

          {
            searchingProduct()
              ? <ListProducts products={products} />
              : <AllMenu />
          }

        </Grid>
      </Grid>
    </>

  )
}


export const Menu = () => {

  const { sections } = useSelector(selectMenu);



  const [nameProduct, setNameProduct] = useState('');

  const [products, setProducts] = useState<IProduct[]>([]);

  const listProducts = getProducts(sections);

  const dispatch = useDispatch();

  const { getTotalProducts } = useContext(OrderContext);

  const navigate = useNavigate();

  const totalProducts = getTotalProducts();


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
    dispatch(setActiveOrder(null));


  }, [])

  return (
    < >




      <Container maxWidth="xl" >
        <TitlePage
          title="Menú"
        />
        <MenuAddProduct />
      </Container>

      <CartWidget
        badge={totalProducts}
        onClick={() => { navigate('/orders/add') }}

      />




    </>
  )
}

export default Menu
