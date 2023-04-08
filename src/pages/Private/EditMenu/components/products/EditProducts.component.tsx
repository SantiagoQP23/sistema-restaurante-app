import { useState, useEffect, FC, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Material UI
import { Typography, Grid, Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent, Card, CardContent, CardHeader } from '@mui/material/'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';


import { MenuContext } from '../../../../../context/MenuContext';
import { IProduct, PrivateRoutes } from '../../../../../models';
import { Product } from './Product.component';
import { resetActiveProduct, selectMenu, setActiveCategory, setActiveProduct, setActiveProducts } from '../../../../../redux';
import { DeleteProduct } from './DeleteProduct.component';
import { useModal } from '../../../../../hooks';

interface Props {

}

export const EditProducts: FC<Props> = () => {

  const navigate = useNavigate();



  //const { products, activeCategory, categories, changeCategory } = useContext(MenuContext)

  const { activeProduct, activeCategory, activeSection } = useSelector(selectMenu);

  const dispatch = useDispatch()

  const { isOpen, handleOpen, handleClose } = useModal();


  // El producto que se va a mostrar en el modal
  const [producto, setProducto] = useState<IProduct | null>(null);


  // Abrir el modal de editar
  const createProduct = (producto: IProduct | null) => {

    dispatch(resetActiveProduct())
    navigate('../product');

  }

  // Abrir el modal de eliminar
  const eliminarProducto = (product: IProduct) => {
    dispatch(setActiveProduct(product))
    handleOpen();

  }

  const backRoute = () => {
    navigate(-1);
  }

  const changeCategory = (categoryId: string) => {
    const category = activeSection!.categories.find(s => s.id === categoryId);
    dispatch(setActiveCategory(category!))
    dispatch(setActiveProducts(category!.products))


  }

  const onChange = (e: SelectChangeEvent) => {
    changeCategory(e.target.value)
  }

  useEffect(() => {

    if (!activeCategory)
      navigate(`/${PrivateRoutes.MENU_EDIT}`)

  }, [])


  return (
    <>


      <Grid container display='flex' justifyContent='space-between' >
        <Grid item display='flex' alignItems='center'>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={backRoute}
          >
          </Button>

          <Box>
            <Typography variant="h4" >{activeCategory && activeCategory!.name}</Typography>
            <Typography>
              {activeCategory?.products.length} productos

            </Typography>
          </Box>

        </Grid>

        <Grid item>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => createProduct(null)} >
            Añadir
          </Button>


        </Grid>

      </Grid>





     

{/*        
        <Box>
          <InputLabel id='select-categoria'>Categoria</InputLabel>
          <Select
            label="select-categoria"
            margin='dense'
            fullWidth
            value={activeCategory?.id}
            onChange={onChange}

          >
            {
              activeSection!.categories.map(categoria => (
                <MenuItem key={categoria.id!} value={categoria.id!}>{categoria.name}</MenuItem>

              ))
            }
          </Select>


        </Box> */}





      <Box mt={1}>

        <Grid container rowSpacing={1} spacing={1}>
          {
            activeCategory!.products.length === 0 && (
              <Typography align="center" variant='subtitle1'>No se han registrado productos</Typography>
            )
          }

          {
            activeCategory!.products.length > 0 && activeCategory!.products.map(producto => (
              <Grid key={producto.id!}
                item xs={12} sm={6} lg={4}>

                <Product

                  producto={producto}

                  eliminarProducto={eliminarProducto}
                />

              </Grid>
            )
            )
          }



        </Grid>
      </Box>

      {
        activeProduct &&
        <DeleteProduct isOpen={isOpen} closeModal={handleClose} />
      }


    </>
  )
}
