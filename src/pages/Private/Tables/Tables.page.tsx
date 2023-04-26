import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import { PageTitle, PageTitleWrapper } from "../../../components/ui"
import { TitlePage } from "../components/TitlePage.component"


const Table = () => {

  return (
    <>

      <Container maxWidth='lg'>
        <TitlePage
          title='Mesas'
        />
        <Outlet />

      </Container>
    </>
  )
}
export default Table