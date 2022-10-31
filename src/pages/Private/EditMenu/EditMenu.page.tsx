import { Outlet } from "react-router-dom"
import { Container } from '@mui/material';

import { PageTitleWrapper, PageTitle } from "../../../components/ui"
import { MenuProvider } from "../../../context/MenuContext"


export const EditMenu = () => {
  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading='Menu'
          subHeading='Navege por los platos que ofrece el restaurante'
        />
      </PageTitleWrapper>


      <Container maxWidth="lg">
        <MenuProvider>
          <Outlet />
        </MenuProvider>
      </Container>
    </>
  )
}

export default EditMenu