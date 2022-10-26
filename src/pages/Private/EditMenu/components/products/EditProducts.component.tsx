import { useState, useEffect, FC, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// import { useModal } from '../../hooks/useModal';

// Material UI
import { Typography, Grid, Box, Button } from '@mui/material/'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

// servicios
/* import { getCategoriasByIdSeccion } from '../../selectors/getCategoriasByIdSeccion';
import { getProductosByIdCategoria } from '../../selectors/getProductosByIdCategoria';

// Components
import { Modal, ModalEliminarProducto, ModalcreateProduct, Producto } from '.';
import { CategoriasState, ProductosState, SeccionesState, selectCategorias } from '../../reducers';
import { ICategoria, IProduct, ISeccion } from '../../interfaces';
import { useProductos } from '../../hooks';
import { selectSecciones } from '../../reducers/seccionesSlice'; */
import { MenuContext } from '../../../../../context/MenuContext';
import { IProduct, PrivateRoutes } from '../../../../../models';
import { Product } from './Product.component';
import { resetActiveProduct } from '../../../../../redux';

interface Props {

}

export const EditProducts: FC<Props> = () => {

  const navigate = useNavigate();

  /* let { nombreSeccion, nombreCategoria } = useParams(); */

  // TODO Valiaar si el nombre de la seccion y la categoria son validos


  const { products, activeCategory } = useContext(MenuContext)

  const dispatch = useDispatch()
 

  /*  const { categorias, categoriaActiva } = useSelector(selectCategorias);
   const { seccionActiva } = useSelector(selectSecciones); */

  // El producto que se va a mostrar en el modal
  const [producto, setProducto] = useState<IProduct | null>(null);
  /* 
    const { isOpen: isOpenEditar, handleClickOpen: openModalEditar, handleClose: closeModalEditar } = useModal(false);
    const { isOpen: isOpenEliminar, handleClickOpen: openModalEliminar, handleClose: closeModalEliminar } = useModal(false);
   */
  /* const {
    categoriasSeccion,
    productosCategoria,
    cambiarCategoria,
    categoria
  } = useProductos(seccionActiva?.idSeccion!, categoriaActiva?.idCategoria!); */

  // Abrir el modal de editar
  const createProduct = (producto: IProduct | null) => {

    dispatch(resetActiveProduct())
    navigate('../product');
    /*  setProducto(producto);
     openModalEditar(); */
  }

  // Abrir el modal de eliminar
  const eliminarProducto = (producto: IProduct) => {
    /*  setProducto(producto);
     openModalEliminar(); */
  }

  const backRoute = () => {
    navigate(-1);
  }

  useEffect(() => {

    if(!activeCategory)
      navigate(`/${PrivateRoutes.MENU_EDIT}` )

  }, [])


  return (
    <>


      <Box mb={2} display='flex' justifyContent='space-between'>


        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />} 
          onClick={backRoute}
          >
        </Button>

        <Typography align="center" variant="h6" color="initial">{activeCategory && activeCategory!.name}</Typography>


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

              <Product
                key={producto.id!}
                producto={producto}
               
                eliminarProducto={eliminarProducto}
              />

            )
            )
          }


        </Grid>
      </Box>

  {/*     <Link to={rutaAtras}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} >Atras
        </Button>
      </Link> */}

      {/*   <Modal open={isOpenEditar} closeModal={closeModalEditar}>
        <ModalcreateProduct
          producto={producto}
          closeModal={closeModalEditar}
          categorias={categoriasSeccion}
          idCategoria={categoria}


        />
      </Modal>

      <Modal open={isOpenEliminar} closeModal={closeModalEliminar}>
        <ModalEliminarProducto
          producto={producto!}
          closeModal={closeModalEliminar}
        />
      </Modal> */}

    </>
  )
}
