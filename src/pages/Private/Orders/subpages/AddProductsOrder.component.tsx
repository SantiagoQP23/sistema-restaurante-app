import { FC, useState, } from 'react'
import { useNavigate, } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid, Typography, Button, Box, Container } from '@mui/material';


import { ShoppingCartOutlined, ArrowBack, } from '@mui/icons-material';
import { useModal } from '../../../../hooks';
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';
import { selectMenu } from '../../../../redux';

import { CartWidget } from '../../Menu/components/CartWidget.component';
import { MenuAddProduct } from '../../Menu';
import { TitlePage } from '../../components/TitlePage.component';






export const AddProductsOrder: FC = () => {
  const navigate = useNavigate();



  const { activeOrder } = useSelector(selectOrders);


  if (!activeOrder)
    return (<></>)

  return (
    <>

      <Container maxWidth='xl'>

        <TitlePage 
          title='Agregar productos'
        />
      


        <MenuAddProduct />
       


      </Container>

      <CartWidget 
        onClick={() => {navigate('/orders/edit/' + activeOrder.id )}}
        badge={activeOrder.details.length}
      />
    </>
  )
}


