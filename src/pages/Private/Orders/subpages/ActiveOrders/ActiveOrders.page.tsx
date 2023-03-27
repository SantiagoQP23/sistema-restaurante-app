import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { DespachoDetalle } from './components';


export const ActiveOrders = () => {


  return (
    <>

      <Typography variant="h4" color="initial">Pedidos pendientes</Typography>
      <Outlet />


      <DespachoDetalle />


    </>

  )
}

export default ActiveOrders;