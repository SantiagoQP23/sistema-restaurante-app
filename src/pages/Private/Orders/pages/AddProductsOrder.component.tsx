import { FC, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid, Typography, Button, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/* // Componentes
import { DetalleProducto } from '../components/Pedidos/DetalleProducto';
import AniadirProductosModal from '../components/Pedidos/AniadirProductosModal';

// Selectors
import { useModal, useProductos } from '../hooks';
import { PedidosState, selectPedidos } from '../reducers/pedidosSlice';
import { DetallesState, selectDetalles } from '../reducers/detallesPedidoSlice';
import { IDetallePedido, INuevoDetallePedido } from '../interfaces'; */
import { ShoppingCartOutlined } from '@mui/icons-material';
import { useModal } from '../../../../hooks';
import { MenuContext } from '../../../../context/MenuContext';
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';


export const AddProductsOrder: FC = () => {
  const navigate = useNavigate();


  const { isOpen: open, handleOpen, handleClose } = useModal(false);

  const {
    activeSection: section,
    activeCategory: category,
    sections,
    categories,
    products,
    changeSection,
    changeCategory
  } = useContext(MenuContext);

  const { activeOrder } = useSelector(selectOrders);
  //const { detalles } = useSelector(selectDetalles);



  //const [detalle, setDetalle] = useState<INuevoDetallePedido | null >();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} my={3}>

        <Typography variant='h2'>Añadir productos</Typography>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
        >
          <ShoppingCartOutlined /> $ {15}
        </Button>

      </Box>


      <FormControl fullWidth>
        <Grid container spacing={1}>
          {section && <Grid item xs={12} md={6} lg={3} >
            <InputLabel id='select-seccion'>Sección</InputLabel>
            <Select
              id='select-seccion'
              value={section!.id}
              label="Seccion"
              margin='dense'
              onChange={(e) =>
                changeSection(String(e.target.value))
              }
              fullWidth

            >
              {
                sections.length > 0 && sections.map(seccion =>
                (
                  <MenuItem key={seccion.id!} value={seccion.id!}>{seccion.name}</MenuItem>

                )
                )}

            </Select>

          </Grid>}
          {category && <Grid item xs={12} md={6} lg={3} >
            <Select
              id='select-categoria'
              value={category!.id}
              label="categoria"
              onChange={(e => {
                changeCategory(String(e.target.value))

              })}
              fullWidth


            >

              {
                categories.length > 0 && categories.map(cat =>
                (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>

                )
                )}

            </Select>

          </Grid>

          }

        </Grid>

      </FormControl>


      <Grid container spacing={1} mt={1}>

        {/* products.length > 0 && products.map(producto => (
          <Grid item xs={12} sm={6} md={4} xl={3} >
            <DetalleProducto
              key={producto.id}
              producto={producto}
              abrirModal={handleOpen}
              setDetalle={setDetalle}
            />
          </Grid>

        )) */
        }


      </Grid>

      {/* {
        detalle && (
          <AniadirProductosModal
    
           handleClose={handleClose}
            open={open}
            detalle={detalle!}
    
          />

        )
      } */}

    </>
  )
}


