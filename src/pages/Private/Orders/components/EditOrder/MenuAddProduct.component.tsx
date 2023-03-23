import { FC, useState, useEffect, } from "react";

import { Box, Grid, Typography, Button, Card } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { InputSearch } from "../../../../../components/ui";
import { IProduct, ICategory } from "../../../../../models";
import { selectMenu, setActiveCategory, setActiveSection } from "../../../../../redux";
import { Sections } from "../../../Menu/components";

import { findProductsByName, getProducts } from "../../../../../helpers";
import { useModal } from "../../../../../hooks";
import { ICreateOrderDetail } from '../../../../../models/orders.model';
import { ModalAddDetail } from './ModalAddDetail.component';

import { ProductListAddToOrder } from './MenuAddProduct/ProductListAddToOrder.component';


interface Props {
  categories: ICategory[]
}



export const Categories: FC<Props> = ({ categories }) => {

  const { activeSection, activeCategory } = useSelector(selectMenu);

  const dispatch = useDispatch();

  const changeCategory = (category: ICategory) => {
    dispatch(setActiveCategory(category));
  }

  if (!activeCategory) {

    return (
      <Typography variant='body1' textAlign='center'>Seleccione una sección</Typography>
    );
  }

  return (
    <>
      <Card>

        <Box sx={{ display: 'flex', overflowX: 'auto', p: 1 }}>        {
          categories.map((category, index) => {

            if (category.isActive)
              return (


                <Button
                  variant={activeCategory.id === category.id ? "contained" : "outlined"}
                  key={category.id}
                  sx={{
                    mr: 3,

                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white'
                    }

                  }}
                  onClick={() => changeCategory(category)}

                >
                  {category.name}
                </Button>

              )
          })

        }
        </Box>
      </Card>




    </>
  )
}







const AllMenu: FC = () => {

  const { sections, activeSection, categories, activeCategory } = useSelector(selectMenu);

  const { isOpen, handleClose, handleOpen } = useModal();

  const [detail, setDetail] = useState<ICreateOrderDetail | null>(null);

  const newDetail = (detail: ICreateOrderDetail) => {

    setDetail(detail);
    handleOpen();



  }

  return (
    <>
      <Grid container xs={12} spacing={2} >

        <Grid item xs={12} >



          <Sections sections={sections} />

        </Grid>

        <Grid item xs={12}>
          {
            activeSection &&
            <Categories categories={activeSection?.categories} />

          }
        </Grid>

        <Grid item xs={12} >

          {
            activeCategory &&
            <ProductListAddToOrder products={activeCategory.products} />
          }
        </Grid>
      </Grid>



    </>
  )

}




export const MenuAddProduct = () => {

  const { sections } = useSelector(selectMenu);

  const [nameProduct, setNameProduct] = useState('')

  const [products, setProducts] = useState<IProduct[]>([]);


  const ListProducts = getProducts(sections);

  const dispatch = useDispatch();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameProduct(event.target.value);

    setProducts(findProductsByName(event.target.value, ListProducts));


  };

  const searchProduct = () => {
    setProducts(findProductsByName(nameProduct, ListProducts));
  }

  useEffect(() => {
    dispatch(setActiveSection(sections[0]));
    dispatch(setActiveCategory(sections[0].categories[0]));

  }, [])



  return (
    <>

      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Grid item xs={12} mb={1}>


          <InputSearch
            handleChange={handleChange}
            search={searchProduct}
            placeholder={'Nombre del producto'}
          />

        </Grid>
        <Grid item xs={12} mb={1}>
          {
            nameProduct.length > 0
              ? <ProductListAddToOrder products={products} />
              : <AllMenu />
          }

          <ModalAddDetail />

        </Grid>
      </Grid>
    </>

  )
}