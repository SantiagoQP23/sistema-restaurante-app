import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, Grid, Typography, Tab, Tabs, Box, useTheme, Stepper, Step, StepButton, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { tabsClasses } from '@mui/material/Tabs';

import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { IOrder, OrderStatus, OrderStatusSpanish } from '../../../../../../models/orders.model';

import { ActiveOrder } from "./ActiveOrder.component";
import { CardActiveOrder } from './CardActiveOrder.component';
import Scrollbars from 'react-custom-scrollbars-2';
import { AlignHorizontalLeft, AlignVerticalTop } from '@mui/icons-material';


export const ListActiveOrders = () => {

  const theme = useTheme();

  const { orders } = useSelector(selectOrders);

  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]);
  const [statusOrderFilter, setStatusOrderFilter] = useState<OrderStatus>(OrderStatus.PENDING);

  const [alignment, setAlignment] = useState<string>('vertical');


  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };


  const filterActiveOrder = (status: OrderStatus) => {
    setActiveOrders(orders.filter(order => order.status === status));
  }

  useEffect(() => {

    filterActiveOrder(statusOrderFilter);
  }, [orders])

  useEffect(() => {

    filterActiveOrder(OrderStatus.PENDING);
  }, [])


  return (
    <>


      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        mb={1}
      >
        <Typography variant='h4' mb={1} >
          Pedidos por estado
        </Typography>

        <ToggleButtonGroup
          exclusive
          size='small'
          value={alignment}
          onChange={handleAlignment}
        >
          <ToggleButton
            value={'horizontal'}
          >
            <AlignHorizontalLeft />
          </ToggleButton>

          <ToggleButton
            value={'vertical'}
          >
            <AlignVerticalTop />

          </ToggleButton>





        </ToggleButtonGroup>

      </Stack>

      {/* <Scrollbars
        style={{  height: '600px' }}
        autoHide
        renderThumbHorizontal={() => {
          return (
            <Box
              sx={{
                width: 5,
                background: `${theme.colors.alpha.black[10]}`,
                borderRadius: `${theme.general.borderRadiusLg}`,
                transition: `${theme.transitions.create(['background'])}`,

                '&:hover': {
                  background: `${theme.colors.alpha.black[30]}`
                }
              }}
            />
          );
        }}


      > */}
      <Stack
        direction={alignment === 'vertical' ? 'row' : 'column'}
        width={alignment === 'vertical' ? 'auto' : '100%'}

        sx={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'auto',
        }}
        spacing={1}

      >
        <Box>



          <CardActiveOrder
            orders={orders.filter(order => order.status === OrderStatus.PENDING)}
            title='PENDIENTES'
            color='success'
            alignment={alignment}

          />

        </Box>

        <Box>

          <CardActiveOrder
            orders={orders.filter(order => order.status === OrderStatus.IN_PROGRESS)}
            title='EN PREPARACIÓN'
            color='primary'
            alignment={alignment}
          />

        </Box>

        <Box>

          <CardActiveOrder
            orders={orders.filter(order => order.status === OrderStatus.DELIVERED && !order.isPaid)}
            title='ENTREGADOS'
            color='warning'
            alignment={alignment}
          />
        </Box>

      </Stack>

      {/* </Scrollbars> */}
      {/* <Grid container spacing={1}>
        {
          activeOrders.length === 0
            ? <Grid item xs={12}>
              <Typography variant='h4' align="center">No hay pedidos</Typography>

            </Grid>
            : activeOrders.map(order => (
              <Grid key={order.id} item xs={12} sm={4}>
                <ActiveOrder order={order} setStatusFilter={setStatusOrderFilter} />
              </Grid>

            ))
        }

      </Grid> */}






    </>
  )
}