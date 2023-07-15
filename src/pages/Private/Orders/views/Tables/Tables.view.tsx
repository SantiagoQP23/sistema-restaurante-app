import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { TitlePage } from '../../../components/TitlePage.component';
import { Container, Grid, Card, Button, Chip, CardActionArea, IconButton, Stack, Box } from '@mui/material';
import { selectTables, setActiveTable } from '../../../../../redux';
import { CardContent, Typography, CardHeader } from '@mui/material/';
import { Add, Edit, Person, PersonOutline, Settings } from '@mui/icons-material';
import { useContext } from 'react';
import { OrderContext, OrderActionType } from '../../context/Order.context';
import { IOrder, ITable, TypeOrder } from '../../../../../models';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../../../hooks';
import { DrawerOrder } from '../../components/DrawerOrder.component';



export const Tables = () => {

  const { tables } = useSelector(selectTables);

  const navigate = useNavigate();

  const dispatchRedux = useDispatch();

  const { state, dispatch } = useContext(OrderContext);

  const [order, setOrder] = useState<IOrder | null>(null);

  const { isOpen, handleClose, handleOpen } = useModal();



  const handleClickTable = (table: ITable) => {

    if (table.isAvailable) {
      // Seleccionar mesa

      dispatch({
        type: OrderActionType.SET_TYPE_ORDER,
        payload: TypeOrder.IN_PLACE
      })

      dispatch({
        type: OrderActionType.SET_TABLE,
        payload: table
      })

      navigate('/orders/add/menu');

      // Redirigir a la página de productos
    } else {
      // TODO Mostrar la orden de la mesa
      handleOpenDrawer(table);

    }

  }

  const handleOpenDrawer = (table: ITable) => {

    dispatchRedux(setActiveTable(table));

    handleOpen();

  }

  const handleCloseDrawer = () => {
    dispatchRedux(setActiveTable(null));
    handleClose();
  }



  const createOrderTakeAway = () => {
    dispatch({
      type: OrderActionType.SET_TYPE_ORDER,
      payload: TypeOrder.TAKE_AWAY
    })

    navigate('/orders/add/menu');
  }


  return (
    <>

      <DrawerOrder
        open={isOpen}
        onClose={handleCloseDrawer}
      />

      <Container maxWidth='lg' >

        <TitlePage
          title='Mesas'

          action={
            <Stack direction='row' spacing={1}>
              <Button
                variant='outlined'
                startIcon={<Edit />}
                onClick={() => navigate('/tables')}
                size='small'
              >
                Editar
              </Button>

              <Button
                variant='contained'
                startIcon={<Add />}
                onClick={createOrderTakeAway}
                size='small'
              >
                Crear pedido para llevar
              </Button>

            </Stack>
          }

        />

        <Stack direction='row' justifyContent='right' my={2}>

        </Stack>


        <Grid container spacing={2}>

          {
            tables.map(table => (
              <Grid key={table.id} item xs={6} md={3} lg={2}>

                <Card>
                  <CardActionArea onClick={() => handleClickTable(table)}>


                    <Box

                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}

                    >

                      <Typography variant='h4'>
                        Mesa {table.name}
                      </Typography>

                      <Chip
                        size='small'
                        label={
                          <Typography fontSize={12} display='flex' alignItems='center'>

                            {
                              table.isAvailable

                                ? 'Disponible'
                                : <>
                                  <PersonOutline
                                    fontSize={'small'}
                                  />
                                  {table.orders!.reduce((acc, order) => acc + order.people, 0)} - Ocupada

                                </>
                            }
                          </Typography>
                        }
                        color={table.isAvailable ? 'success' : 'default'}
                      />
                    </Box>

                    {/* <CardHeader
                      title={`Mesa ${table.name}`}
                      // subheader={`Capacidad: ${table.chairs}`}
                      subheader={
                        <Chip
                          size='small'
                          label={
                            <Typography fontSize={12} display='flex' alignItems='center'>

                              {
                                table.isAvailable

                                  ? 'Disponible'
                                  : <>
                                    <PersonOutline
                                      fontSize={'small'}
                                    />
                                    {table.orders!.reduce((acc, order) => acc + order.people, 0)} - Ocupada

                                  </>
                              }
                            </Typography>
                          }
                          color={table.isAvailable ? 'success' : 'default'}
                        />

                      }
                    /> */}
                  </CardActionArea>

                </Card>
              </Grid>
            ))
          }
        </Grid>


      </Container>
    </>




  )
}