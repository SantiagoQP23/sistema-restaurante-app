
import { useNavigate } from 'react-router-dom';

import { Button, Grid, Typography, Container, Stack, Box } from '@mui/material';

import { MenuAddProduct } from '../../components/EditOrder/MenuAddProduct.component';


import { useContext } from 'react';
import { Add, ArrowBack, ArrowBackIos, ChevronLeft, Clear, ClearAll, EditOutlined } from '@mui/icons-material';
import { OrderContext } from '../../context/Order.context';

import { NewOrderSummary, OrderDetails } from './components/NewOrderSummary.component';
import { TitlePage } from '../../../components/TitlePage.component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export const AddOrder = () => {

  const navigate = useNavigate();


  const { reset } = useContext(OrderContext);





  return (
    <>
      <Container maxWidth='xl'  sx={{pb: 5}}>
        <TitlePage
          title='Nuevo pedido'
        />
        <Stack
          spacing={1}
          direction={{ sx: 'column', md: 'row' }}

        >

          <Box 
            sx={{
              flexBasis: '120%',
            }}
          >

            <OrderDetails />

            <Stack direction='row' spacing={1} justifyContent='space-between' my={2}>

              <Button
                startIcon={<ChevronLeft />}
                fullWidth={false}
                onClick={() => { navigate('/orders/menu') }}
              >
                Continuar
              </Button>
              <Button

                onClick={() => { reset() }}
                color='error'
              >
                Limpiar
              </Button>

            </Stack>

          </Box>



          <NewOrderSummary />
        </Stack>


      </Container>



    </>
  )
}