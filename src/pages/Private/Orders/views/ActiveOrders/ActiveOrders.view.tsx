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


export const ActiveOrders = () => {

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const refreshOrders = () => {

    callEndpoint(getOrdersToday())
      .then((resp) => {

        const { data } = resp;

        dispatch(loadOrders(data));

        dispatch(setLastUpdatedOrders(new Date().toISOString()));
      })
  }

  return (
    <>


      <Container maxWidth="lg" sx={{ mb: 4 }} >
        <TitlePage
          title='Pedidos activos'
          action={

            <Stack direction='row' spacing={1}>
              <LoadingButton
                variant="text"
                loading={loading}
                onClick={refreshOrders}
                size='small'
              >
                <Cached />
              </LoadingButton>

              <Button
               
                onClick={() => { navigate('/orders/add') }}
                color='primary'
                variant='contained'
                size='small'
              >
                <Add />
              </Button>
            </Stack>
          }
        />




        <Clock />

        <Divider sx={{mb: 1}}/>
        <BarActiveOrders />
        <Divider sx={{ mb: 1 }} />


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