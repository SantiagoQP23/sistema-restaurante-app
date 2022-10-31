
import { Card, CardContent, CardHeader, Container, Divider } from '@mui/material';
import { PageTitle, PageTitleWrapper } from '../../../components/ui';
import { MenuProvider } from '../../../context/MenuContext';


// Componentes
import { ListProducts, Categories, Sections } from './components/';



export const Menu = () => {

  return (
    < >
      <MenuProvider>

        <PageTitleWrapper>
          <PageTitle
            heading='Menu'
            subHeading='Navege por los platos que ofrece el restaurante'
          />
        </PageTitleWrapper>

        <Container maxWidth="lg">

          <Card>
            <CardHeader
              title={
                <Sections />

              }
            />
          <Divider />
            <CardContent>
              <Categories />

             

              <ListProducts />
            </CardContent>






          </Card>
        </Container>

      </MenuProvider>
    </>
  )
}

export default Menu
