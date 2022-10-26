import { PageTitle, PageTitleWrapper } from "../../../components/ui"
import { Container } from '@mui/material';
import { Outlet } from "react-router-dom";

const Clients = () => {
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