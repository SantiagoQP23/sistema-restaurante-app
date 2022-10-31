import { PageTitle, PageTitleWrapper } from "../../../components/ui"
import { Container } from '@mui/material';
import { Outlet } from "react-router-dom";
import { IClient } from "../../../models";
import { useFetchAndLoad } from '../../../hooks/useFetchAndLoad';
import { getClients } from "./services";
import { useDispatch } from "react-redux";
import { loadClients } from "../../../redux/slices/clients";
import { useAsync } from "../../../hooks";

const Clients = () => {


  const {loading, callEndpoint} = useFetchAndLoad();
  
  const dispatch = useDispatch()

  const getClientsCall = async () => await callEndpoint(getClients())

  const loadClientsState = (data: IClient[]) => { dispatch(loadClients(data)); }

  useAsync(getClientsCall, loadClientsState, () => { }, []);

  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading='Clientes'
          subHeading='Administración de clientes del restaurante'
          docs="/menu"
        />
      </PageTitleWrapper>

      <Container maxWidth='lg'>
        <Outlet />
      </Container>
    </>



  )
}
export default Clients