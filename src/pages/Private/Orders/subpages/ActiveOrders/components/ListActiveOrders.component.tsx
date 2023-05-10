import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, Grid, Typography, Tab, Tabs, Box, useTheme, Stepper, Step, StepButton } from '@mui/material';
import { tabsClasses } from '@mui/material/Tabs';

import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { IOrder, OrderStatus, OrderStatusSpanish } from '../../../../../../models/orders.model';

import { ActiveOrder } from "./ActiveOrder.component";
import { CardActiveOrder } from './CardActiveOrder.component';
import Scrollbars from 'react-custom-scrollbars-2';


export const ListActiveOrders = () => {

  const theme = useTheme();

  const { orders } = useSelector(selectOrders);

  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]);
  const [statusOrderFilter, setStatusOrderFilter] = useState<OrderStatus>(OrderStatus.PENDING);

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


      {/* <Card sx={{ my: 2, }}>

        <CardContent sx={{ overFlowX: 'auto' }}>
          <Typography variant="h5">Estados de pedidos</Typography>

          <Tabs
            onChange={(e, value) => {
              setStatusOrderFilter(value);
              filterActiveOrder(value);
            }}
            value={statusOrderFilter}
            variant="fullWidth"
            textColor='primary'
            scrollButtons
            indicatorColor='primary'
            allowScrollButtonsMobile

            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
              width: '100%',
              my: 1,
              fontSize: '1rem',

            }}
          >
            <Tab color='green' key={OrderStatus.PENDING} label={OrderStatusSpanish[OrderStatus.PENDING]} value={OrderStatus.PENDING} />
            <Tab key={OrderStatus.IN_PROGRESS} label={'PREPARANDO'} value={OrderStatus.IN_PROGRESS} />

          </Tabs>


        </CardContent>
      </Card> */}


      {/* <Box
        sx={{
          width: '100%',
        }}
      >

        <Stepper
          nonLinear
          
          sx={{bgcolor: (theme) => `${theme.palette.success}`}}
        >
          <Step
            sx={{bgcolor: (theme) => `${theme.palette.success}`}}
          >
            <StepButton sx={{bgcolor: (theme) => `${theme.palette.success}`}} >Pendientes</StepButton>
          </Step>
          <Step>

            <StepButton>En preparación</StepButton>

          </Step>
          <Step>
            <StepButton>Entregados</StepButton>
          </Step>


        </Stepper>

      </Box> */}

      <Typography variant='h4' mb={1} >
        Pedidos por estado
        </Typography>
      <Scrollbars
        style={{ width: '100%', height: '600px' }}
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


      >
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
          }}

        >

          <Box>

            <CardActiveOrder
              orders={orders.filter(order => order.status === OrderStatus.PENDING)}
              title='PENDIENTES'
              color='success'
              status={OrderStatus.PENDING}
            />
          </Box>
          <Box>

            <CardActiveOrder
              orders={orders.filter(order => order.status === OrderStatus.IN_PROGRESS)}
              title='EN PREPARACIÓN'
              color='primary'
            />
          </Box>
          <Box>

            <CardActiveOrder
              orders={orders.filter(order => order.status === OrderStatus.DELIVERED && !order.isPaid)}
              title='ENTREGADOS'
              color='warning'
            />
          </Box>


        </Box>

      </Scrollbars>
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