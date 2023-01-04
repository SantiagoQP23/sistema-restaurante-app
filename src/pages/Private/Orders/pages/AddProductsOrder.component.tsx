import { FC, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid, Typography, Button, Box, FormControl, InputLabel, MenuItem, Select, Card, CardContent, CardHeader, Divider, Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/* // Componentes
import { DetalleProducto } from '../components/Pedidos/DetalleProducto';
import AniadirProductosModal from '../components/Pedidos/AniadirProductosModal';

// Selectors
import { useModal, useProductos } from '../hooks';
import { PedidosState, selectPedidos } from '../reducers/pedidosSlice';
import { DetallesState, selectDetalles } from '../reducers/detallesPedidoSlice';
import { IDetallePedido, INuevoDetallePedido } from '../interfaces'; */
import { ShoppingCartOutlined, ArrowBack, ExpandMore, AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { useModal } from '../../../../hooks';
import { MenuContext } from '../../../../context/MenuContext';
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';
import { selectMenu } from '../../../../redux';
import { Sections, Categories } from '../../Menu/components';
import { ProductAdd } from '../components';
import { InputSearch } from '../../../../components/ui/InputSearch';
import { OrderDetails } from '../components/OrderDetails.component';
import { ICategory, IProduct } from '../../../../models/menu.model';
import { useCounter } from '../hooks';
import { MenuAddProduct } from '../components/MenuAddProduct.component';






export const AddProductsOrder: FC = () => {
  const navigate = useNavigate();


  const { isOpen: open, handleOpen, handleClose } = useModal(false);


  const { sections, categories, activeCategory } = useSelector(selectMenu);

  const [nameProduct, setNameProduct] = useState('')



  const { activeOrder } = useSelector(selectOrders);
  //const { detalles } = useSelector(selectDetalles);



  //const [detalle, setDetalle] = useState<INuevoDetallePedido | null >();


  return (
    <>

      <Grid container display='flex' justifyContent='space-between'>
        <Grid item display='flex' justifyContent='left' alignItems='center'>
          <Button onClick={() => navigate(-1)}>
            <ArrowBack />
          </Button>
          <Typography variant='h6'>Añadir Productos </Typography>

        </Grid>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
        >
          <ShoppingCartOutlined /> $ {15}
        </Button>

      </Grid>



      <Grid container spacing={1}>

        <Grid item xs={12} sm={6}>

          <MenuAddProduct />


        </Grid>

        <Grid item xs={12} sm={6}>

          <OrderDetails />

        </Grid>

      </Grid>










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


