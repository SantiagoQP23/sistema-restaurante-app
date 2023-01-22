import { FC, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


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
  CardHeader,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DoneOutline, DeleteOutline, Done, Add } from '@mui/icons-material';


import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { selectOrders, setActiveOrder } from '../../../../redux';
import { ArrowBack } from '@mui/icons-material';
import { getClient } from '../../Clients/services';
import { useAsync, useFetchAndLoad } from '../../../../hooks';
import { useSnackbar } from 'notistack';
import { Order, OrderDetail } from '../components';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { InputSearch, Label } from '../../../../components/ui';
import { OrderDetails } from '../components/OrderDetails.component';

import { IOrder, ITable } from '../../../../models';

import { getOrder, statusModalDeleteOrder } from '../services/orders.service';
import { format } from 'date-fns';
import { TableOrder, DataClient } from '../components/';

import { OrderContext } from '../context/Order.context';
import { ModalDeleteOrder } from '../components/EditOrder/ModalDeleteOrder.component';


/* 
import { SocketContext } from '../context/SocketContext';

// Componentes
import { DetallePedido } from '../components/Pedidos/DetallePedido';
import { detalleLoaded, pedidoUpdatedNombreCliente, selectDetalles, selectPedidos } from '../reducers';
import { useAppDispatch } from '../hooks/useRedux';
import { IDetallePedido } from '../interfaces/pedidos';
import { FormControl } from '@mui/material';
import { getOrder } from '../services/orders.service';
import { IOrder } from '../../../../models/orders.model';
import { useAsync } from '../../../../hooks/useAsync';
import { ITable } from '../../../../models/table.model';
import { TableOrder } from '../components/TableOrder.component';
import { OrderContext } from '../context/Order.context';
 */


/* 
const DataClient: FC = () => {


  const { loading, callEndpoint } = useFetchAndLoad();

  const [cedula, setCedula] = useState<string>('');


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
          //nqueueSnackbar('No se encontró al cliente', { variant: 'error' })

        })
    }

  }


  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='body1'>Cliente</Typography>

          <Accordion>
            <AccordionSummary
              expandIcon={<DriveFileRenameOutlineOutlinedIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ p: 0, m: 0 }}
            >
              <Typography variant='body2'>Lionel Messi</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, m: 0 }}>
              <InputSearch
                handleChange={handleChange}
                placeholder='Número de cédula'
                search={searchClient}
              />

            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

    </>
  )
}
 */

/* 
const TableOrder: FC = ({
  
}) => {


  return (
    <>
      <Card>
        <CardContent>
          <Accordion sx={{ p: 0, m: 0 }}>
            <AccordionSummary
              expandIcon={<DriveFileRenameOutlineOutlinedIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ p: 0, m: 0 }}
            >
              <Typography variant='body1'>Mesa <b>3</b></Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, m: 0 }}>
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

            </AccordionDetails>
          </Accordion>

        </CardContent>
      </Card>


    </>
  )
}
 */
const label = { inputProps: { 'aria-label': 'Switch demo' } };

interface PropsStatusOrder {
  status: boolean;
}

const StatusOrder: FC<PropsStatusOrder> = ({status: isDelivered}) => {


  return (
    <>
      <Card>
        <CardContent>

          <Typography variant='body1'>Estado <Label color={!isDelivered ? 'success': 'error'} >{!isDelivered ? 'Activo': 'Entregado'}</Label></Typography>
          <Switch {...label} defaultChecked />


        </CardContent>
      </Card>
    </>
  )


}


export const EditOrder = () => {

  const navigate = useNavigate();

  const { orderId } = useParams();

  if (!orderId) navigate('/orders');

  const { reset } = useContext(OrderContext);


  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const getOrderCall = async () => await callEndpoint(getOrder(orderId!));
  const loadOrderState = (data: IOrder) => { dispatch(setActiveOrder(data)) }
  useAsync(getOrderCall, loadOrderState, () => { });


  const endEdit = () => {
    navigate(-1);

  }

  const { activeOrder } = useSelector(selectOrders);

  const [cedula, setCedula] = useState<string>('');

  const { enqueueSnackbar } = useSnackbar();

  const eliminarPedido = () => {

    statusModalDeleteOrder.setSubject(true, activeOrder!)
  }


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


  useEffect(() => {

    return () => {
      reset();
    }
  }, [])


  if (!activeOrder) return <>

  </>;





  return (
    <>


      <Grid container display='flex' justifyContent='space-between' mb={2} alignItems='center'>
        <Typography variant='h6'>{`Editar Pedido $${activeOrder.amount}`} </Typography>
        {/*   <Button onClick={() => navigate(-1)}>
                <ArrowBack />
              </Button> */}

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('products')}

        >

          <Add />
          Añadir
        </Button>


        <Button variant='contained' onClick={() => {
          endEdit();
        }}>
          <Done />
          Finalizar Edición
        </Button>



      </Grid>









      {/*   <Card>
        <CardHeader title={'Datos del pedido'} />
        <CardContent>

          <Grid container spacing={1} >
            <Grid item xs={6} md={2} lg={3} >

            </Grid>

            <Grid item>

             
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}



      <Grid container spacing={1}>
        <Grid container spacing={1} item xs={12} sm={6} display='flex' alignContent='start'>

          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant='body2'>Número de pedido</Typography>
                <Typography variant='body1'>{activeOrder?.num}</Typography>
              </CardContent>
            </Card>

          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant='body1'>Hora  </Typography>
                <Typography variant='body2'>{format(new Date(activeOrder?.createdAt), 'HH:mm')}</Typography>
              </CardContent>
            </Card>


          </Grid>

          <Grid item xs={6}>

            <TableOrder table={activeOrder?.table} />
          </Grid>

          <Grid item xs={6}>
            <StatusOrder status={activeOrder.isDelivered}/>

          </Grid>


          <Grid item xs={12}>

            <DataClient client={activeOrder?.client} />
          </Grid>




          <Grid item xs={12}>

            <Card>
              <CardContent>

                <Typography variant='body1'>Mesero: <b>{activeOrder.user.person.firstName} {activeOrder.user.person.lastName} </b></Typography>
              </CardContent>
            </Card>
          </Grid>

          <Button
            variant='contained'
          >
            Comprobante
          </Button>



          <Button
            variant='contained'
            color='error'
            onClick={eliminarPedido}
          >
            <DeleteOutline />

            Eliminar
          </Button>




        </Grid>

        <Grid item xs={12} sm={6}>
          <OrderDetails details={activeOrder.details} />
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

