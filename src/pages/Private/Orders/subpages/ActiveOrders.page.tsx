import { useEffect, useState, useContext } from 'react';
import { Container, Grid } from '@mui/material';
import { Outlet, useLocation, } from 'react-router-dom';
import { PageTitleWrapper, PageTitle } from '../../../../components/ui';
import { DespachoDetalle } from '../components';


export const ActiveOrders = () => {


  return (
    <>

      <PageTitleWrapper>
        <PageTitle heading='Pedidos Pendientes' />
      </PageTitleWrapper>

      <Container maxWidth='lg' >
        <Outlet />

      </Container>

      <DespachoDetalle />


    </>

  )
}

export default ActiveOrders;