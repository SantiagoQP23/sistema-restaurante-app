import { useState, useEffect, FC } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useModal } from '../../hooks/useModal';

// Material UI
import { Typography, Grid, Box, Button } from '@mui/material/'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

// servicios
import { getCategoriasByIdSeccion } from '../../selectors/getCategoriasByIdSeccion';
import { getProductosByIdCategoria } from '../../selectors/getProductosByIdCategoria';

// Components
import { Modal, ModalEliminarProducto, ModalEditarProducto, Producto } from '.';
import { CategoriasState, ProductosState, SeccionesState, selectCategorias } from '../../reducers';
import { ICategoria, IProducto, ISeccion } from '../../interfaces';
import { useProductos } from '../../hooks';
import { selectSecciones } from '../../reducers/seccionesSlice';

interface Props {

}

export const EditProducts: FC<Props> = () => {

  let { nombreSeccion, nombreCategoria } = useParams();

  // TODO Valiaar si el nombre de la seccion y la categoria son validos

  let rutaAtras = `/menu/editar/${nombreSeccion}`;
  const { categorias, categoriaActiva } = useSelector(selectCategorias);
  const { seccionActiva } = useSelector(selectSecciones);

  // El producto que se va a mostrar en el modal
  const [producto, setProducto] = useState<IProducto | null>(null);

  const { isOpen: isOpenEditar, handleClickOpen: openModalEditar, handleClose: closeModalEditar } = useModal(false);
  const { isOpen: isOpenEliminar, handleClickOpen: openModalEliminar, handleClose: closeModalEliminar } = useModal(false);

  const {
    categoriasSeccion,
    productosCategoria,
    cambiarCategoria,
    categoria } = useProductos(seccionActiva?.idSeccion!, categoriaActiva?.idCategoria!);

  // Abrir el modal de editar
  const editarProducto = (producto: IProducto | null) => {
    setProducto(producto);
    openModalEditar();
  }

  // Abrir el modal de eliminar
  const eliminarProducto = (producto: IProducto) => {
    setProducto(producto);
    openModalEliminar();
  }

  const cargarProductos = () => {
    cambiarCategoria(categoriaActiva?.idCategoria!);
  }


  useEffect(() => {

    cargarProductos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <>


      <Box mb={2} display='flex' justifyContent='space-between'>

        <Link to={rutaAtras}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} >

          </Button>
        </Link>

        <Typography align="center" variant="h6" color="initial">{nombreCategoria}</Typography>


        <Button variant="contained" startIcon={<AddIcon />} onClick={() => editarProducto(null)} >
          Añadir
        </Button>

      </Box>

      <Box minHeight={"70vh"}>

        <Grid container rowSpacing={1} spacing={1}>
          {
            productosCategoria.length === 0 && (
              <Typography align="center" variant='subtitle1'>No se han registrado productos</Typography>
            )
          }

          {
            productosCategoria.length > 0 && productosCategoria.map(producto => (

              <Producto
                key={producto.idProducto!}
                producto={producto}
                editarProducto={editarProducto}
                eliminarProducto={eliminarProducto}
              />

            )
            )
          }


        </Grid>
      </Box>

      <Link to={rutaAtras}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} >Atras
        </Button>
      </Link>

      <Modal open={isOpenEditar} closeModal={closeModalEditar}>
        <ModalEditarProducto
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
      </Modal>

    </>
  )
}
