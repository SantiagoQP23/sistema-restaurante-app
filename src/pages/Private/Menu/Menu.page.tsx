
import { Card, CardContent, CardHeader, CircularProgress, Container, Divider, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import { InputSearch, PageTitle, PageTitleWrapper } from '../../../components/ui';
import { MenuContext, MenuProvider } from '../../../context/MenuContext';


// Componentes
import { ListProducts, Categories, Sections, Product } from './components/';
import { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenu, setActiveSection } from '../../../redux';
import { Search } from '@mui/icons-material';
import { Category } from './components/Category.component';
import { IProduct, ISection } from '../../../models';
import { findProductsByName, getAllProducts } from '../../../helpers';


interface ProductsListProps {
  products: IProduct[]
}
const ProductsList: FC<ProductsListProps> = ({ products }) => {

  return (
    <>
      <Grid container spacing={1}>
        {
          products.map(product => (
            <Grid key={product.id} item xs={12} sm={6} lg={4}>
              <Product product={product} />

            </Grid>
          ))
        }
      </Grid>
    </>
  )

}


const AllMenu: FC = () => {
  const { sections, activeSection, categories } = useSelector(selectMenu);


  return (
    <>
      <Grid item xs={12} >
        <Card>
          <CardContent>

            <Sections sections={sections} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item>

        {
          sections?.length === 0
            ? <>No se ha creado un menu</>
            : <>
              {
                categories.length > 0
                  ?
                  <>

                    <Grid container spacing={1} >

                      {
                        activeSection?.categories.map(category => (
                          <Grid item key={category.id} xs={12}>
                            <Category  category={category} />

                          </Grid>

                        ))
                      }

                    </Grid>

                  </>
                  : <><Typography variant='body1' textAlign='center'>Sin categorías</Typography></>
              }
            </>


        }
      </Grid>



    </>
  )

}



export const Menu = () => {

  const { sections, activeSection, categories } = useSelector(selectMenu);

  const [nameProduct, setNameProduct] = useState('');


  const [products, setProducts] = useState<IProduct[]>([]);


  const ListProducts = getAllProducts(sections);



  // const dispatch = useDispatch();
  // const {sections, activeSection} = useContext(MenuContext);

  // useEffect(() => {
  //   sections.length > 0 && dispatch(setActiveSection(sections[0]));
  // },[sections])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameProduct(event.target.value);

    setProducts(findProductsByName(event.target.value, ListProducts));

  
  };

  const searchProduct = () => {
    setProducts(findProductsByName(nameProduct, ListProducts));
  }

  return (
    < >




      <PageTitleWrapper>
        <PageTitle
          heading='Menu'
          subHeading='Navege por los platos que ofrece el restaurante'
        />
      </PageTitleWrapper>


      <Container maxWidth="lg">

        <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Grid item xs={12}>


            <InputSearch
              handleChange={handleChange}
              search={searchProduct}
              placeholder={'Nombre del producto'}
            />

          </Grid>

          {
            nameProduct.length > 0
              ? <ProductsList products={products} />
              : <AllMenu />
          }

        </Grid>
      </Container>


    </>
  )
}

export default Menu
