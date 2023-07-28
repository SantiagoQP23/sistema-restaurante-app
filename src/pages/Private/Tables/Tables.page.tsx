import { Container, Stack } from '@mui/material';
import { Outlet, useNavigate } from "react-router-dom"
import { PageTitle, PageTitleWrapper } from "../../../components/ui"
import { TitlePage } from "../components/TitlePage.component"
import { Button } from '@mui/material/';
import { Add } from '@mui/icons-material';


const Table = () => {

  const navigate = useNavigate();

  return (
    <>

      <Container maxWidth='lg'>
        

        <Outlet />

      </Container>
    </>
  )
}
export default Table