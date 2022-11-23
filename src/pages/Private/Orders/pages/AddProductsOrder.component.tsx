import { FC, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid, Typography, Button, Box, FormControl, InputLabel, MenuItem, Select, Card, CardContent, CardHeader, Divider } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/* // Componentes
import { DetalleProducto } from '../components/Pedidos/DetalleProducto';
import AniadirProductosModal from '../components/Pedidos/AniadirProductosModal';

// Selectors
import { useModal, useProductos } from '../hooks';
import { PedidosState, selectPedidos } from '../reducers/pedidosSlice';
import { DetallesState, selectDetalles } from '../reducers/detallesPedidoSlice';
import { IDetallePedido, INuevoDetallePedido } from '../interfaces'; */
import { ShoppingCartOutlined, ArrowBack } from '@mui/icons-material';
import { useModal } from '../../../../hooks';
import { MenuContext } from '../../../../context/MenuContext';
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';
import { selectMenu } from '../../../../redux';
import { Sections, Categories } from '../../Menu/components';
import { ProductAdd } from '../components';


export const AddProductsOrder: FC = () => {
  const navigate = useNavigate();


  const { isOpen: open, handleOpen, handleClose } = useModal(false);


  const { sections, categories, activeCategory } = useSelector(selectMenu)


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
          <Typography variant='h5'>Añadir Productos </Typography>

        </Grid>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
        >
          <ShoppingCartOutlined /> $ {15}
        </Button>

      </Grid>




      {
        sections?.length === 0
          ? <>No se ha creado un menu</>
          :
          <Card sx={{my: 1}}>
            <CardHeader
              title={
                <Sections sections={sections} />

              }
            />
            <Divider />
            <CardContent>{
              categories.length > 0

                ? <Categories />
                : <><h6>Sin categorias</h6></>
              }
              
                          </ CardContent >
                        </Card>
            }
              {
                activeCategory && activeCategory.products.length > 0
                  ? <>
                    <Grid container spacing={1}>

                      {
                        activeCategory.products.map((producto) => (
                          <Grid  key={producto.id} item xs={12} sm={6} md={6} xl={3} >
                            <ProductAdd
                              producto={producto}
                              abrirModal={handleOpen}
                            />
                          </Grid>
                        ))
                      }
                    </Grid>
                  </>
                  :
                  <>No hay productos</>
            }




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


