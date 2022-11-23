
import { Card, CardContent, CardHeader, Container, Divider } from '@mui/material';
import { PageTitle, PageTitleWrapper } from '../../../components/ui';
import { MenuContext, MenuProvider } from '../../../context/MenuContext';


// Componentes
import { ListProducts, Categories, Sections } from './components/';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenu, setActiveSection } from '../../../redux';



export const Menu = () => {

  const { sections, activeSection, categories } = useSelector(selectMenu)

  // const dispatch = useDispatch();
  // const { sections, activeSection} = useContext(MenuContext);

  // useEffect(() => {
  //   sections.length > 0 && dispatch(setActiveSection(sections[0]));
  // },[sections])

  return (
    < >


      <PageTitleWrapper>
        <PageTitle
          heading='Menu'
          subHeading='Navege por los platos que ofrece el restaurante'
        />
      </PageTitleWrapper>

      <Container maxWidth="lg">

        {
          sections?.length === 0
            ? <>No se ha creado un menu</>
            : <>
              <Card>
                <CardHeader
                  title={
                    <Sections sections={sections} />

                  }
                />
                <Divider />
                <CardContent>{
                  categories.length > 0

                    ? <Categories />
                    : <><h6>Sin categorias</h6></>
                }

                </CardContent>
              </Card>
              <ListProducts />
            </>
        }
      </Container>


    </>
  )
}

export default Menu
