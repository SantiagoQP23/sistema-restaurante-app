import { FC, useContext, } from 'react'
import { useNavigate, } from 'react-router-dom';

import { Grid, Typography, Button, Box, useTheme, } from '@mui/material';


import { ShoppingCartOutlined, ArrowBack, } from '@mui/icons-material';
import { MenuAddProduct } from '../../../components/EditOrder/MenuAddProduct.component';
import { OrderContext } from '../../../context/Order.context';



export const MenuNewOrder: FC = () => {
  const navigate = useNavigate();

  const { state: {amount, details} } = useContext(OrderContext);



  const theme = useTheme();

  return (
    <>

      <Box

        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          mt: 1,
          p: 1,
          border: `1px solid #000`,
          borderRadius: 1,
         
          '&:hover': {
            border: `1px solid #fff`,
            bgcolor: '#48e',
            color: '#fff',
            
          
            cursor: 'pointer',
          }


        }}

        onClick={() => navigate(-1)}
        
      >
        <Box display='flex' gap={1} alignItems='center'>

          <ShoppingCartOutlined />


          <Box>
            <Typography variant='h4' >Carrito</Typography>
            <Typography variant='body1' >Productos: {details.length}</Typography>
          </Box>
        </Box>


        <Typography variant='h4' >$ {amount}</Typography>



      </Box>
{/* 
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
          <ShoppingCartOutlined /> $ {amount}
        </Button>

      </Grid> */}



      <Grid container spacing={1}>

        <Grid item xs={12} >

          <MenuAddProduct />


        </Grid>



      </Grid>


    </>
  )
}


