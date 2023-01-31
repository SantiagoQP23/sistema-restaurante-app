import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import { PageTitleWrapper, PageTitle } from "../../../components/ui"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Reports = () => {
  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading='Reportes'
          subHeading='Información de su restaurante'
          docs="/menu"
        />
      </PageTitleWrapper>

      <Container maxWidth='lg'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>


          <Outlet />
        </LocalizationProvider>
      </Container>
    </>


  )
}
export default Reports