import { Routes, Route } from "react-router-dom"
import { PageTitleWrapper, PageTitle } from "../../../components/ui"
import { MenuProvider } from "../../../context/MenuContext"
import { EditSections, EditCategories, EditProducts } from "./components/";


export const EditMenu = () => {
  return (
    <>
      <PageTitleWrapper>
        <PageTitle
          heading='Menu'
          subHeading='Navege por los platos que ofrece el restaurante'
        />
      </PageTitleWrapper>

      <MenuProvider>
        <Routes>
          <Route path="/" element={<EditSections />} />
          <Route path="/:nombreSeccion" element={<EditCategories />} />
          <Route path="/:nombreSeccion/:nombreCategoria" element={<EditProducts />} />
        </Routes>
      </MenuProvider>
    </>
  )
}

export default EditMenu