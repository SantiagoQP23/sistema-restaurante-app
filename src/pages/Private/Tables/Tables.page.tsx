import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import { PageTitle, PageTitleWrapper } from "../../../components/ui"
import { useAsync, useFetchAndLoad } from "../../../hooks";
import { getTables } from './services/tables.service';
import { useDispatch } from 'react-redux';
import { loadTables } from "../../../redux/slices/tables";
import { ITable } from "../../../models";

const Table = () => {

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();

  const getTablesCall = async () => await callEndpoint(getTables());

  const loadTablesState = (data: ITable[]) => {
    dispatch(loadTables(data));
  }

  useAsync(getTablesCall, loadTablesState, () => {}, []);



  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading='Mesas'
          subHeading='Administre las mesas del restaurante'
        />
      </PageTitleWrapper>

      <Container maxWidth='lg'>
        <Outlet />

      </Container>
    </>
  )
}
export default Table