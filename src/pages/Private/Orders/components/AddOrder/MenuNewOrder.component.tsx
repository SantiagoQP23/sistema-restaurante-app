import { FC, useContext, useState,  } from 'react'
import { useNavigate,  } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid, Typography, Button,  } from '@mui/material';


import { ShoppingCartOutlined, ArrowBack,  } from '@mui/icons-material';
import { MenuAddProduct } from '../EditOrder/MenuAddProduct.component';
import { OrderContext } from '../../context/Order.context';



export const MenuNewOrder: FC = () => {
  const navigate = useNavigate();

  const { amount, reset, getOrder, details } = useContext(OrderContext);





  return (
    <>

      <Grid container display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <Grid item display='flex' justifyContent='left' alignItems='center'>
          <Button onClick={() => navigate(-1)}>
            <ArrowBack />
          </Button>
          <Typography variant='h4'>Añadir Productos </Typography>

        </Grid>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
        >
          <ShoppingCartOutlined /> $ {amount}
        </Button>

      </Grid>



      <Grid container spacing={1}>

        <Grid item xs={12} >

          <MenuAddProduct />


        </Grid>

       

      </Grid>
   

    </>
  )
}


