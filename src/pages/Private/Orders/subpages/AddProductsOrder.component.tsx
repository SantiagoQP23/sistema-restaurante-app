import { FC, useState,  } from 'react'
import { useNavigate,  } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid, Typography, Button,  } from '@mui/material';


import { ShoppingCartOutlined, ArrowBack,  } from '@mui/icons-material';
import { useModal } from '../../../../hooks';
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';
import { selectMenu } from '../../../../redux';

import { MenuAddProduct } from '../components/EditOrder/MenuAddProduct.component';






export const AddProductsOrder: FC = () => {
  const navigate = useNavigate();



  const { activeOrder } = useSelector(selectOrders);
  

  if(!activeOrder)
    return (<></>)

  return (
    <>

      <Grid container display='flex' justifyContent='space-between' alignItems='center' mb={2} mt={1}>
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
          <ShoppingCartOutlined /> $ {activeOrder.amount}
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


