import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { DespachoDetalle } from './components';
import { Cached } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { PageTitleWrapper, PageTitle } from '../../../../../components/ui';
import { loadOrders, setLastUpdatedOrders } from '../../../../../redux';
import { getOrdersToday } from '../../services/orders.service';
import { Clock } from '../ListOrders/ListOrders.page';
import { useFetchAndLoad } from '../../../../../hooks';
import { useDispatch } from 'react-redux';


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

      <PageTitleWrapper>
        <PageTitle
          heading='Pedidos'
          docs={
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={refreshOrders}
            >
              <Cached />
            </LoadingButton>
          } />
        <Clock />
      </PageTitleWrapper>



      <Typography variant="h4" color="initial" mb={1}>Pedidos activos</Typography>
      <Outlet />


      <DespachoDetalle />


    </>

  )
}

export default ActiveOrders;