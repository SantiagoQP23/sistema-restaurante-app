import { Routes, Route, Outlet } from "react-router-dom"
import { PageTitleWrapper, PageTitle } from "../../../components/ui"
import { MenuProvider } from "../../../context/MenuContext"
import { EditSections, EditCategories, EditProducts } from "./components/";
import { Container } from '@mui/material';


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
         {/*  <Routes>
            <Route path="/" element={<EditSections />} />
            <Route path="/section" element={<h1>Editar seccion</h1>} />
            <Route path="/category" element={<h1>Editar Category</h1>} />
            <Route path="/product" element={<h1>Editar product</h1>} />
            <Route path="/:nombreSeccion/*" element={<EditCategories />} />
            <Route path="/:nombreSeccion/:nombreCategoria" element={<EditProducts />} />
          </Routes> */}
        </MenuProvider>
      </Container>
    </>
  )
}

export default EditMenu