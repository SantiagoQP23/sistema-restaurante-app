
import { Card, CardContent, Container, Divider } from '@mui/material';
import { PageTitle, PageTitleWrapper } from '../../../components/ui';
import { useProducts } from '../../../hooks';

// Componentes
import { ListProductos, Categories, Sections } from './components/';


export const Menu = () => {

  /* const {
    sections,

    changeSection,
    idSection,
  } = useProducts(); */

  return (
    < >

      <PageTitleWrapper>
        <PageTitle
          heading='Menu'
          subHeading='Navege por los platos que ofrece el restaurante'
        />
      </PageTitleWrapper>

      <Container maxWidth="lg">

       {/*  {
          sections.length === 0 && (
            <h6>No se encontraron sections</h6>
          )
        }
 */}

        <Card>


          {/* sections */}
          {/* <Sections /> */}

          <Divider />
          {/* <CardContent>

         

            <Categorias
              categorias={categoriasSeccion}
              categoria={categoria}
              cambiarCategoria={cambiarCategoria}
            />

            <ListProductos
              productos={productosCategoria}
            /> 
          </CardContent>
            */}
        </Card>
      </Container>

    </>
  )
}

export default Menu
