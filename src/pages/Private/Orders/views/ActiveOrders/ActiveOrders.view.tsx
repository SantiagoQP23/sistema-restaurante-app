import { Typography, Container, Divider, Button, IconButton, Stack } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { DespachoDetalle } from './components';
import { Add, Cached } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { PageTitleWrapper, PageTitle } from '../../../../../components/ui';
import { loadOrders, setLastUpdatedOrders } from '../../../../../redux';
import { getOrdersToday } from '../../services/orders.service';
import { useFetchAndLoad } from '../../../../../hooks';
import { useDispatch } from 'react-redux';
import { Clock } from '../OrdersList/components/Clock.component';
import { TitlePage } from '../../../components/TitlePage.component';
import { BarActiveOrders } from './components/BarActiveOrders.component';
import { useActiveOrders } from '../../hooks';
import { Box } from '@mui/material/';


export const ActiveOrders = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {activeOrdersQuery} = useActiveOrders();




  return (
    <>


      <Container maxWidth="xl" sx={{ mb: 4 }} >
        <TitlePage
          title='Pedidos activos'
          action={

            <Stack direction='row' spacing={1}>
              <LoadingButton
                variant="text"
                loading={activeOrdersQuery.isFetching}
                onClick={() => activeOrdersQuery.refetch()}
                size='small'
                startIcon={<Cached />}
              >
                Actualizar
              </LoadingButton>

              <Button
               
                onClick={() => { navigate('/orders/tables') }}
                color='primary'
                variant='contained'
                size='small'
                startIcon={<Add />}
              >
                Nuevo pedido
              </Button>
            </Stack>
          }
        />




        <Clock />

        {/* <Divider sx={{mb: 1}}/> */}
       

       


        <Outlet />

        <Divider sx={{mt:1}} />

        <Typography variant='h5' py={3} textAlign='center' >
          Santiago Quirumbay Pozo
        </Typography>

      </Container>

      <DespachoDetalle />


    </>

  )
}

export default ActiveOrders;