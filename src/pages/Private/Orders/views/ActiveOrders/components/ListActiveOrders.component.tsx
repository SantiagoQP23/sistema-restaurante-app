import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, Grid, Typography, Tab, Tabs, Box, useTheme, Stepper, Step, StepButton, Stack, ToggleButton, ToggleButtonGroup, Paper, Divider, Chip } from '@mui/material';
import { tabsClasses } from '@mui/material/Tabs';

import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { IOrder, OrderStatus, OrderStatusSpanish, TypeOrder } from '../../../../../../models/orders.model';

import { ActiveOrder } from "./ActiveOrder.component";
import { CardActiveOrder } from './CardActiveOrder.component';
import Scrollbars from 'react-custom-scrollbars-2';
import { AlignHorizontalLeft, AlignVerticalTop, DeliveryDining, DoneAllOutlined, PendingOutlined, Restaurant } from '@mui/icons-material';
import { Label } from '../../../../../../components/ui';


export const ListActiveOrders = () => {

  const theme = useTheme();

  const { orders } = useSelector(selectOrders);


  const [statusOrderFilter, setStatusOrderFilter] = useState<OrderStatus>(OrderStatus.PENDING);

  const [alignment, setAlignment] = useState<string>('horizontal');


  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };


  const ordersFiltered = orders.filter(order => order.status === statusOrderFilter);




  return (
    <>
      <Card
      >

        <Box

          sx={{
            py: 0.5,
            overflowX: 'auto',

          }}

        >



          <Tabs
            value={statusOrderFilter}

            variant='scrollable'
            indicatorColor='primary'


            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor:
                  statusOrderFilter === OrderStatus.PENDING
                    ? 'success.main'
                    : statusOrderFilter === OrderStatus.IN_PROGRESS
                      ? 'info.main'
                      : 'warning.main',
                borderRadius: '10px 10px 0 0',
                borderColor: 'transparent',
                borderBottom: 'transparent',
              },


            }}
          >

            <Tab
              label={
              <>
                <Typography variant='h5' component='span' >Pendientes</Typography>
                <Chip
                  label={orders.filter(order => order.status === OrderStatus.PENDING).length}
                  color='success'
                  size='small'
                  sx={{ ml: 1 }}
                />
              </>}
              value={OrderStatus.PENDING}
              onClick={() => setStatusOrderFilter(OrderStatus.PENDING)}
              icon={<PendingOutlined />}
              iconPosition='start'
            />

            <Tab
               label={
                <>
                  <Typography variant='h5' component='span' >En preparación</Typography>
                  <Chip
                    label={orders.filter(order => order.status === OrderStatus.IN_PROGRESS).length}
                    color='info'
                    size='small'
                    sx={{ ml: 1 }}
                  />
                </>}
              value={OrderStatus.IN_PROGRESS}
              onClick={() => setStatusOrderFilter(OrderStatus.IN_PROGRESS)}
              icon={<Restaurant />}
              iconPosition='start'
            />

            <Tab
             label={
              <>
                <Typography variant='h5' component='span' >Entregados</Typography>
                <Chip
                  label={orders.filter(order => order.status === OrderStatus.DELIVERED && !order.isPaid).length}
                  color='warning'
                  size='small'
                  sx={{ ml: 1 }}
                />
              </>}
              value={OrderStatus.DELIVERED}
              onClick={() => setStatusOrderFilter(OrderStatus.DELIVERED)}
              icon={<DoneAllOutlined />}
              iconPosition='start'

            />



          </Tabs>

        </Box>

        <Divider />
        <Box py={1} px={0.5} minHeight={400} >

          {
            ordersFiltered.length === 0
              ? <Typography variant='body1' align="center" mt={5}>No hay pedidos</Typography>
              : <Stack direction='row' spacing={1} sx={{ pb: 1 , overflowX: 'auto' }}>
                {
                  ordersFiltered.map(order => (

                    <>
                      <Box key={order.id} sx={{ minWidth: 325, }} >
                        

                        <ActiveOrder key={order.id} order={order}
                          color={order.status === OrderStatus.PENDING ? 'success' : order.status === OrderStatus.IN_PROGRESS ? 'info' : 'warning'}
                        />
                      </Box>
                    </>
                  ))}
              </Stack>
          }
        </Box>
      </Card>


      {/* <Stack
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

      </Stack> */}





    </>
  )
}