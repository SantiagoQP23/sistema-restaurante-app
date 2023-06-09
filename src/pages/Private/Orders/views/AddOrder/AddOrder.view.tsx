
import { useNavigate } from 'react-router-dom';

import { Button, Grid, Typography, Container, Stack, Box } from '@mui/material';

import { MenuAddProduct } from '../../components/EditOrder/MenuAddProduct.component';


import { useContext } from 'react';
import { Add, ArrowBack, ArrowBackIos, ChevronLeft, Clear, ClearAll, EditOutlined, ShoppingCart } from '@mui/icons-material';
import { OrderActionType, OrderContext } from '../../context/Order.context';

import { TitlePage } from '../../../components/TitlePage.component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { OrderDetails, NewOrderSummary } from './components';



export const AddOrder = () => {

  const navigate = useNavigate();


  const { dispatch } = useContext(OrderContext);





  return (
    <>
      <Container maxWidth='xl' sx={{ pb: 5 }}>
        <TitlePage
          title='Nuevo pedido'
        />

        <Grid container spacing={1}>

          <Grid item xs={12} md={8}>

            <OrderDetails />

            <Stack direction='row' spacing={1} justifyContent='space-between' my={2}>

              <Button
                startIcon={<ShoppingCart />}
                fullWidth={false}
                onClick={() => { navigate('/orders/menu') }}
              >
                Añadir productos
              </Button>
              <Button

                onClick={() => {
                  dispatch({ type: OrderActionType.RESET })
                  navigate('/orders')
                }}
                color='error'
              >
                Limpiar
              </Button>
            </Stack>

          </Grid>

          <Grid item xs={12} md={4}>

            <NewOrderSummary />

          </Grid>

        </Grid>
       
      </Container >



    </>
  )
}