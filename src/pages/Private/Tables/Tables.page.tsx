import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import { PageTitle, PageTitleWrapper } from "../../../components/ui"


const Table = () => {

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