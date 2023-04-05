
import { useNavigate } from 'react-router-dom';

import { Button, Grid, Typography} from '@mui/material';

import { MenuAddProduct } from '../../components/EditOrder/MenuAddProduct.component';


import { useContext } from 'react';
import { Add, ArrowBack, Clear, ClearAll, EditOutlined } from '@mui/icons-material';
import { OrderContext } from '../../context/Order.context';

import { NewOrderSummary } from './components/NewOrderSummary.component';



export const AddOrder = () => {

  const navigate = useNavigate();


  const {  reset } = useContext(OrderContext);

  



  return (
    <>
      <Grid container spacing={1} pt={2}>
        <Grid container item xs={12} md={7} spacing={1} justifyContent='space-between' alignContent='start'>

          <Grid item display='flex' xs={12} alignItems='center' justifyContent='space-between'>

            <Button onClick={() => { navigate('/orders') }}>
              <ArrowBack />
            </Button>
            <Typography variant='h3'>Nuevo pedido</Typography>

            <Button
              
              onClick={() => { reset() }}

            >
              <Clear />
            </Button>
            
          </Grid>

          <Grid item xs={12} sx={{
            display: { xs: 'none', md: 'flex' },
          }}>
            <MenuAddProduct />

          </Grid>


        </Grid>

        <Grid container item xs={12} md={5} spacing={1} >

          <Grid item xs={12}>

            <NewOrderSummary />
          </Grid>

        </Grid>


      </Grid>






    </>
  )
}