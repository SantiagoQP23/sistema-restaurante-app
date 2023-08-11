import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, Grid, Typography, Tab, Tabs, Box, useTheme, Stepper, Step, StepButton, Stack, ToggleButton, ToggleButtonGroup, Paper, Divider, Chip, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { tabsClasses } from '@mui/material/Tabs';

import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { IOrder, OrderStatus, OrderStatusSpanish, TypeOrder } from '../../../../../../models/orders.model';

import { ActiveOrder } from "./ActiveOrder.component";
import { CardActiveOrder } from './CardActiveOrder.component';
import Scrollbars from 'react-custom-scrollbars-2';
import { AlignHorizontalLeft, AlignVerticalTop, DeliveryDining, DoneAllOutlined, Favorite, LocationOn, PendingOutlined, Restaurant, Restore } from '@mui/icons-material';
import { Label } from '../../../../../../components/ui';
import SidebarMenuMobile from '../../../../layouts/SidebarLayout/Sidebar/SidebarMenuMobile/SidebarMenuMobile.component';
import { BarActiveOrders } from './BarActiveOrders.component';
import { ModalStartOrder } from './ModalStartOrder.component';
import { index } from '../../../../../Status/Maintenance/index';


export const ListActiveOrders = () => {

  const theme = useTheme();

  const { orders } = useSelector(selectOrders);

  const [value, setValue] = useState(0);



  const [statusOrderFilter, setStatusOrderFilter] = useState<OrderStatus>(OrderStatus.PENDING);

  const [alignment, setAlignment] = useState<string>('horizontal');


  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };


  const ordersFiltered = statusOrderFilter ? orders.filter(order => order.status === statusOrderFilter) : orders;




  return (
    <>

      <ModalStartOrder />

      <Box

        sx={{
          py: 0.5,
          mt: 1,

          overflowX: 'auto',
          // flexGrow: 1,
          bgcolor: 'background.paper',
          border: `1px solid ${theme.colors.alpha.black[10]}`,
          borderRadius: '10px',
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex',
          },

        }}

      >



        <Tabs
          value={statusOrderFilter}
          variant='scrollable'

          indicatorColor='primary'
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor:
                !statusOrderFilter
                  ? 'primary.main'
                  :
                  statusOrderFilter === OrderStatus.PENDING
                    ? 'warning.main'
                    : statusOrderFilter === OrderStatus.IN_PROGRESS
                      ? 'info.main'
                      : 'success.main',
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
                  color='warning'
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
                  label={orders.filter(order => order.status === OrderStatus.DELIVERED).length}
                  color='success'
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


      <Box py={1} px={0.5} minHeight={400} >

        {
          ordersFiltered.length === 0
            ? <Typography variant='body1' align="center" mt={5}>No hay pedidos</Typography>
            : <Grid container spacing={2}>
              {
                ordersFiltered.map((order, index) => (

                  <>
                    <Grid item key={order.id} xs={12} sm={6} md={4}>


                      <ActiveOrder
                        key={order.id}
                        order={order}
                        index={index}
                        color={order.status === OrderStatus.PENDING ? 'warning' : order.status === OrderStatus.IN_PROGRESS ? 'info' : 'success'}
                      />

                    </Grid>
                  </>
                ))}
            </Grid>
        }



      </Box>




      <Paper sx={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        display: {
          xs: 'block',
          sm: 'block',
          md: 'none',
        },
        backgroundColor: 'background.paper',
        zIndex: 1000,

      }} elevation={5}>



        <BottomNavigation
          showLabels
          value={statusOrderFilter}
          onChange={(event, newValue) => {
            setStatusOrderFilter(newValue);
          }}

        >

          {/* <BottomNavigationAction sx={{
            '& .Mui-selected': {
              color: (theme) => theme.palette.primary.main,
              // borderColor: (theme) => theme.palette.primary.main,
              borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
            }

          }} label="Todos" value={null} icon={
            <Chip
              label={orders.length}
              color='primary'
              size='small'
            />
          } />
 */}


          <BottomNavigationAction sx={{
            '& .Mui-selected': {
              color: (theme) => theme.palette.warning.main,
              // borderColor: (theme) => theme.palette.success.main,
              borderBottom: (theme) => `2px solid ${theme.palette.warning.main}`,
            }

          }} label="Pendientes" value={OrderStatus.PENDING} icon={
            <Chip
              label={orders.filter(order => order.status === OrderStatus.PENDING).length}
              color='warning'
              size='small'
            />
          } />
          <BottomNavigationAction
            sx={{
              '& .Mui-selected': {
                color: (theme) => theme.palette.info.main,
                // borderColor: (theme) => theme.palette.info.main,
                borderBottom: (theme) => `2px solid ${theme.palette.info.main}`,
              }

            }}
            label="Preparando" value={OrderStatus.IN_PROGRESS} icon={
              <Chip
                label={orders.filter(order => order.status === OrderStatus.IN_PROGRESS).length}
                color='info'
                size='small'
              />
            } />
          <BottomNavigationAction
            sx={{
              '& .Mui-selected': {
                color: (theme) => theme.palette.success.main,
                // borderColor: (theme) => theme.palette.warning.main,
                borderBottom: (theme) => `2px solid ${theme.palette.success.main}`,
              }


            }}
            label="Entregados" value={OrderStatus.DELIVERED} icon={
              <Chip
                label={orders.filter(order => order.status === OrderStatus.DELIVERED && !order.isPaid).length}
                color='success'
                size='small'
              />


            } />

        </BottomNavigation>

      </Paper>




    </>
  )
}