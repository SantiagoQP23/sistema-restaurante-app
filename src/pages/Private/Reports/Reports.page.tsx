import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import { PageTitleWrapper, PageTitle } from "../../../components/ui"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SimulationProvider } from "./context/SimulationContext";
import { TitlePage } from "../components/TitlePage.component";

const Reports = () => {
  return (
    <>


      <Container maxWidth='lg'>

      
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SimulationProvider >

            <Outlet />
          </SimulationProvider>
        </LocalizationProvider>
      </Container>
    </>


  )
}
export default Reports