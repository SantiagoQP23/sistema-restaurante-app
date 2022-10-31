import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


// Material UI
import {
  Grid, Typography, Button, Box, Card, CardContent, Paper, IconButton,
  InputBase,
  Container,
  List,
  Divider,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  CardHeader
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DoneOutline, DeleteOutline } from '@mui/icons-material';


import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { selectOrders } from '../../../../redux';
import { ArrowBack } from '@mui/icons-material';
import { getClient } from '../../Clients/services';
import { useFetchAndLoad } from '../../../../hooks';
import { useSnackbar } from 'notistack';
import { Order, OrderDetail } from '../components';
/* 
import { SocketContext } from '../context/SocketContext';

// Componentes
import { DetallePedido } from '../components/Pedidos/DetallePedido';
import { detalleLoaded, pedidoUpdatedNombreCliente, selectDetalles, selectPedidos } from '../reducers';
import { useAppDispatch } from '../hooks/useRedux';
import { IDetallePedido } from '../interfaces/pedidos';
import { FormControl } from '@mui/material';
 */

export const EditOrder = () => {

  const navigate = useNavigate();

  const { activeOrder } = useSelector(selectOrders);

  const [cedula, setCedula] = useState<string>('');

  const { loading, callEndpoint } = useFetchAndLoad();
  const { enqueueSnackbar } = useSnackbar();


  /*  const dispatch = useAppDispatch();
 
   const { socket } = useContext(SocketContext);
 
   const { idPedido } = useParams();
 
 
   //const { detalles } = useSelector(selectDetalles);
   const { pedidoActivo } = useSelector((selectPedidos));
 
 
   if (!pedidoActivo) {
     navigate('/pedidos');
   }
 
   const [cliente, setCliente] = useState<string>(pedidoActivo!.nombreCliente);
 
   const detalles: IDetallePedido[] = pedidoActivo?.detalles!;
 
 
   async function cargarDetallesPedido(idPedido: number) {
 
     //dispatch(detallesPedidoStartLoad(idPedido));
     dispatch(detalleLoaded(pedidoActivo?.detalles!))
   }
 
   useEffect(() => {
 
     //cargarDetallesPedido(pedidoActivo?.idPedido!);
 
     // eslint-disable-next-line
   }, [])
 
 
 
   const cambiarNombre = () => {
 
     socket?.emit('cambiarNombreCliente', { idPedido, cliente }, (ok: boolean) => {
       if (ok) {
         dispatch(pedidoUpdatedNombreCliente(cliente));
       }
 
     });
 
 
   } */


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCedula(event.target.value);
  };


  const searchClient = async () => {
    if (cedula.length === 10) {
      await callEndpoint(getClient(cedula))
        .then((resp) => {
          const { data } = resp;
          console.log(data);
        })
        .catch((err) => {
          enqueueSnackbar('No se encontró al cliente', { variant: 'error' })

        })
    }

  }




  return (
    <>
      <Grid container display='flex' justifyContent='space-between'>
        <Grid item display='flex' justifyContent='left' alignItems='center'>
          <Button onClick={() => navigate(-1)}>
            <ArrowBack />
          </Button>
          <Typography variant='h5'>{activeOrder ? `Pedido ${activeOrder.num}` : "Añadir pedido"} </Typography>

        </Grid>

      </Grid>


      <Card>
        <CardHeader title={'Datos del pedido'} />
        <CardContent>

          <Grid container spacing={1} >
            <Grid item xs={6} md={2} lg={3} >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Mesa</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={10}
                  label="Mesa del pedido"
                >

                  <MenuItem key={10} value={10}>Mesa 1</MenuItem>
                  <MenuItem key={20} value={20}>Mesa 2</MenuItem>
                  <MenuItem key={30} value={30}>Mesa 3</MenuItem>

                </Select>
              </FormControl>
            </Grid>

            <Grid item>

              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >

                <InputBase
                  type='number'
                  onChange={handleChange}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Número de cédula"
                  inputProps={{ 'aria-label': 'Buscar cliente' }}
                />
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="search"
                  onClick={searchClient}
                >
                  {
                    loading
                      ? <CircularProgress size={20} />
                      : <SearchIcon />
                  }
                </IconButton>


              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box display='flex' justifyContent='right' pb={2}>

        <Box>
          <IconButton
            color='error'
          >
            <DeleteOutline />
          </IconButton>
          <IconButton

            color='success'
          >
            <DoneOutline />
          </IconButton>



        </Box>

      </Box>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Order />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title={
              <Box display='flex' justifyContent='space-between' alignItems='center'>

                <Typography variant="h6" fontWeight='bold'>Detalles de pedido</Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('products')}

                >

                  <AddIcon />
                  Añadir
                </Button>

              </Box>
            } />
            <CardContent >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <OrderDetail />

                </Grid>
                <Grid item xs={12}>
                  <OrderDetail />

                </Grid>
                <Grid item xs={12}>
                  <OrderDetail />

                </Grid>
                <Grid item xs={12}>
                  <OrderDetail />

                </Grid>
                <Grid item xs={12}>
                  <OrderDetail />

                </Grid>
                <Grid item xs={12}>
                  <OrderDetail />

                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>

      </Grid>



      {/* 
      <Container maxWidth="lg">






        <Grid container spacing={1}>
          <Grid item xs={12} md={6} >
            <Typography variant='h6'>Nombre del cliente</Typography>
            <Paper
              component='form'
              sx={{ px: 2, display: 'flex', alignItems: 'center', width: '100%' }}
            >
              <InputLabel id='input-nombre'>Cliente</InputLabel>
              <InputBase
                id="input-nombre"
                defaultValue={cliente}
                onBlur={(e) => {
                  setCliente(e.target.value)
                }}
                fullWidth

              />
              <IconButton
                color="primary"
                onClick={cambiarNombre}
                sx={{ p: '10px' }} aria-label="search">
                <SaveIcon />
              </IconButton>
            </Paper>
            <Typography variant='h6'>Información del pedido</Typography>

            <Card>
              <CardContent>
                <List sx={{ px: 1 }}>

                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary="Mesero"
                      primaryTypographyProps={{ variant: 'subtitle2' }}
                    />
                    <Typography variant="subtitle2" color="text.primary">
                      {pedidoActivo?.usuario.nombres}
                    </Typography>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary="Fecha"
                      primaryTypographyProps={{ variant: 'subtitle2' }}
                    />
                    <Typography variant="subtitle2" color="text.primary">
                      {`${pedidoActivo?.fecha}`}
                    </Typography>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary="Total"
                      primaryTypographyProps={{ variant: 'subtitle2' }}
                    />
                    <Typography
                      variant="subtitle2"
                      color="text.primary"
                      fontWeight="bold"
                    >
                      {pedidoActivo?.total}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} >

            <Box>
              <Typography variant="h6" align='center'>Detalles del pedido</Typography>
              <Grid container spacing={1}>
                {
                  detalles.length > 0 && detalles.map(detalle => (

                    <DetallePedido key={detalle.idDetallePedido}
                      detalle={detalle}
                      totalPedido={pedidoActivo!.total}
                    />

                  ))

                }

              </Grid>

            </Box>
          </Grid>

        </Grid>


      </Container> */}


    </>
  )
}

