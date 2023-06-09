import { FC, useState, } from 'react'
import { useNavigate, } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid, Typography, Button, Box, Container } from '@mui/material';


import { ShoppingCartOutlined, ArrowBack, } from '@mui/icons-material';
import { useModal } from '../../../../../hooks';
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';
import { selectMenu } from '../../../../../redux';

import { CartWidget } from './components/CartWidget.component';
import { TitlePage } from '../../../components/TitlePage.component';
import { MenuAddProduct } from '../../components/EditOrder';
import { AddProductsMenu } from './components';






export const MenuAddProductsOrder: FC = () => {
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
        <AddProductsMenu />



      </Container>

      <CartWidget
        onClick={() => { navigate('/orders/list/edit/' + activeOrder.id) }}
        badge={activeOrder.details.length}
      />
    </>
  )
}


