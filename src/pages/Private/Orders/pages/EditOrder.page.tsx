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
  ListItemText
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { SocketContext } from '../context/SocketContext';

// Componentes
import { DetallePedido } from '../components/Pedidos/DetallePedido';
import { detalleLoaded, pedidoUpdatedNombreCliente, selectDetalles, selectPedidos } from '../reducers';
import { useAppDispatch } from '../hooks/useRedux';
import { DoneOutline, DeleteOutline } from '@mui/icons-material';
import { IDetallePedido } from '../interfaces/pedidos';


export const EditarPedido = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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


  }



  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} my={3}>

        <Typography variant='h2'>Editar pedido</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </Button>

      </Box>



      <Container maxWidth="lg">



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


            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('productos')}

            >

              <AddIcon />
              Añadir
            </Button>

          </Box>

        </Box>



        <Grid container spacing={1}>
          <Grid item xs={12} md={6} >
            <Typography variant='h6'>Nombre del cliente</Typography>
            <Paper
              component='form'
              sx={{ px: 2, display: 'flex', alignItems: 'center', width: '100%' }}
            >
              {/* <InputLabel id='input-nombre'>Cliente</InputLabel> */}
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


      </Container>


    </>
  )
}

