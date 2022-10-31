import { useState, useEffect, FC, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Material UI
import { Typography, Grid, Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';


import { MenuContext } from '../../../../../context/MenuContext';
import { IProduct, PrivateRoutes } from '../../../../../models';
import { Product } from './Product.component';
import { resetActiveProduct, selectProducts, setActiveProduct } from '../../../../../redux';
import { DeleteProduct } from './DeleteProduct.component';
import { useModal } from '../../../../../hooks';

interface Props {

}

export const EditProducts: FC<Props> = () => {

  const navigate = useNavigate();

  const { products, activeCategory, categories, changeCategory } = useContext(MenuContext)

  const { activeProduct } = useSelector(selectProducts);

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


          <Typography align="center" variant="h5" color="initial">{activeCategory && activeCategory!.name}</Typography>

        </Grid>

        <Grid item>

          <InputLabel id='select-categoria'>Categoria</InputLabel>
          <Select
            label="select-categoria"
            margin='dense'
            fullWidth
            value={activeCategory?.id}
            onChange={onChange}
           
          >
            {
              categories.map(categoria => (
                <MenuItem key={categoria.id!} value={categoria.id!}>{categoria.name}</MenuItem>

              ))
            }
          </Select>


        </Grid>

      </Grid>




      <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>

        <Typography variant='h6'>Total productos: {products.length}</Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => createProduct(null)} >
          Añadir
        </Button>

      </Box>

      <Box minHeight={"70vh"}>

        <Grid container rowSpacing={1} spacing={1}>
          {
            products.length === 0 && (
              <Typography align="center" variant='subtitle1'>No se han registrado productos</Typography>
            )
          }

          {
            products.length > 0 && products.map(producto => (
              <Grid key={producto.id!}
                item xs={12} sm={6} >

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
