import { FC, useContext, useState, useEffect, ChangeEvent } from 'react';

import { format } from 'date-fns';

import { useSelector, useDispatch } from 'react-redux';

import {
  Grid, Button, Typography, useTheme, Card,
  CardContent, CardHeader, Accordion, AccordionSummary,
  AccordionDetails, ToggleButtonGroup, ToggleButton, Divider,
  Tabs, Tab, tabsClasses, Select, FormControl, InputLabel,
  MenuItem, Box, CardActionArea, List, ListItem, ListItemText, ListItemButton,
  Container, TableContainer, TableBody, TableHead, TableRow, TableCell, Table, styled, Popover
} from '@mui/material';

import { toast } from 'react-toastify';

// Componentes

import { loadOrders, resetActiveOrder, selectAuth, selectOrders, setActiveOrder, setLastUpdatedOrders } from '../../../../../redux';

import { SocketContext } from '../../../../../context';
import { Label, PageTitle, PageTitleWrapper } from '../../../../../components/ui';
import { Order } from '../../components';
import { FilterOrders } from '../../../Reports/components/FilterOrders';
import { IOrder, OrderStatus } from '../../../../../models';
import { useNavigate } from 'react-router-dom';
import { Cached, Check, EditOutlined, ExpandMore, MoreVert, Style, TableRows } from '@mui/icons-material';

import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { ModalDeleteOrder } from '../../components/EditOrder/ModalDeleteOrder.component';
import { es } from 'date-fns/locale';
import { OrderStatusSpanish, TypeOrder } from '../../../../../models/orders.model';
import AddIcon from '@mui/icons-material/Add';
import { LoadingButton, TabList } from '@mui/lab';
import { useFetchAndLoad } from '../../../../../hooks';
import { getOrdersToday } from '../../services/orders.service';
import { CardOrdersByStatus } from './components';
import { Scrollbar } from '../../../components';
import Scrollbars from 'react-custom-scrollbars-2';
import { TitlePage } from '../../../components/TitlePage.component';
import { OrderListToolbar } from './components/OrderListToolbar.component';
import { Checkbox } from '@mui/material/';
import { TablePagination, IconButton } from '@mui/material';
import { TabsOrderStatus } from './components/TabsOrderStatus.component';


// function applySortFilter(array: IOrder[], comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

const filterOrders = (orders: IOrder[], waiter: string, status: string): IOrder[] => {

  let ordersF: IOrder[] = orders;


  if (waiter !== 'all') {
    ordersF = orders.filter(order => order.user.id === waiter)
  }


  if (status !== 'all') {

    if (status === 'unpaid') {
      ordersF = ordersF.filter(order => order.status === OrderStatus.DELIVERED && !order.isPaid)
    } else {
      const orderStatus = status as OrderStatus;
      ordersF = ordersF.filter(order => order.status === orderStatus)
    }


  }

  return ordersF;



}



export const ListOrders = () => {
  // const [view, setView] = useState('list');

  const { user } = useSelector(selectAuth);
  const { orders, activeOrder } = useSelector(selectOrders);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [statusOrderFilter, setStatusOrderFilter] = useState<string>('all');

  const [selected, setSelected] = useState<string[]>([]);

  const [filterWaiter, setFilterWaiter] = useState(user?.id || 'all');


  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();

  const { callEndpoint, loading } = useFetchAndLoad();


  const handleOpenMenu = (event: any, order: IOrder) => {
    dispatch(setActiveOrder(order))
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const addOrder = () => {
    dispatch(resetActiveOrder());
    navigate('add');
  }

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const changeWaiter = (waiter: string) => {
    setPage(0);
    setFilterWaiter(waiter);
  }

  const changeStatus = (event: React.SyntheticEvent, newValue: string) => {
    setPage(0);
    setStatusOrderFilter(newValue);
  }

  const refreshOrders = () => {

    callEndpoint(getOrdersToday())
      .then((resp) => {

        const { data } = resp;

        dispatch(loadOrders(data));

        dispatch(setLastUpdatedOrders(new Date().toISOString()));
      })
  }

  const filteredOrders = filterOrders(orders, filterWaiter, statusOrderFilter);

  return (

    <>

      <Container maxWidth='xl'>
        <TitlePage title='Pedidos'
          action={
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={() => addOrder()}
            >Añadir Pedido</Button>

          }
        />

        <Card>
          <Box
            sx={{
              overflowX: 'auto',
              bgcolor: '#eee',
              py: 1
            }}
          >
            <TabsOrderStatus
              changeStatus={changeStatus}
              statusOrderFilter={statusOrderFilter}
              orders={orders}

            />
          </Box>

          <OrderListToolbar
            changeWaiter={changeWaiter}
            filterWaiter={filterWaiter}
            statusOrderFilter={statusOrderFilter}
          />

          <Scrollbars
            style={{ width: '100%', height: 'calc(100vh - 300px)' }}
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

            <TableContainer sx={{ minWidth: 800 }}>

              <Table>

                <TableHead
                >


                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      Usuario
                    </TableCell>
                    <TableCell>
                      Cliente
                    </TableCell>
                    <TableCell>
                      Hora
                    </TableCell>
                    <TableCell>
                      Estado
                    </TableCell>
                    <TableCell>
                      Cantidad
                    </TableCell>
                    <TableCell>
                      Acciones
                    </TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {
                    filteredOrders.map((order) => (
                      <TableRow
                        hover
                        key={order.id}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: theme.colors.alpha.black[5]

                          }
                        }}
                      // onClick={() => navigate(`orders/${order.id}`)}
                      >
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          {order.user.person.firstName} {order.user.person.lastName}
                        </TableCell>
                        <TableCell>
                          {order.client?.person.firstName} {order.client?.person.lastName}
                        </TableCell>
                        <TableCell>
                          {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                        </TableCell>
                        <TableCell>
                          {order.status}
                        </TableCell>
                        <TableCell>
                          {order.total}
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton onClick={(e) => handleOpenMenu(e, order)}>
                            <MoreVert />
                          </IconButton>
                        </TableCell>

                      </TableRow>
                    ))


                  }

                </TableBody>

              </Table>

            </TableContainer>

          </Scrollbars>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />



        </Card>


      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate(`edit/${activeOrder?.id}`);
            handleCloseMenu();
          }}
        >
          <EditOutlined />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>

          Delete
        </MenuItem>
      </Popover>






    </>
  )

}
