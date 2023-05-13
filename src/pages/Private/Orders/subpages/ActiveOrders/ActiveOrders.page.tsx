import { Typography, Container, Divider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { DespachoDetalle } from './components';
import { Cached } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { PageTitleWrapper, PageTitle } from '../../../../../components/ui';
import { loadOrders, setLastUpdatedOrders } from '../../../../../redux';
import { getOrdersToday } from '../../services/orders.service';
import { useFetchAndLoad } from '../../../../../hooks';
import { useDispatch } from 'react-redux';
import { Clock } from '../ListOrders/components/Clock.component';
import { TitlePage } from '../../../components/TitlePage.component';
import { BarActiveOrders } from './components/BarActiveOrders.component';


export const ActiveOrders = () => {

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();


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
            <LoadingButton
              variant="text"
              loading={loading}
              onClick={refreshOrders}
            >
              <Cached />
            </LoadingButton>
          }
        />

        


        <Clock />

        <Divider sx={{mb: 1}}/>
        <BarActiveOrders />
        <Divider sx={{mb: 1}} />

        
        <Outlet />

      </Container>







      <DespachoDetalle />


    </>

  )
}

export default ActiveOrders;