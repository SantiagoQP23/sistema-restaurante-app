import { useState, ChangeEvent } from 'react';

import { format } from 'date-fns';

import { useSelector, useDispatch } from 'react-redux';

import {
  Button, useTheme,
  MenuItem, Box, Container, TableContainer, TableBody,
  TableHead, TableRow, TableCell, Table, Popover,
  Card,
  Typography
} from '@mui/material';


// Componentes

import { loadOrders, resetActiveOrder, selectAuth, selectOrders, setActiveOrder, setLastUpdatedOrders } from '../../../../../redux';

import { IOrder, OrderStatus } from '../../../../../models';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';


import AddIcon from '@mui/icons-material/Add';
import { useFetchAndLoad } from '../../../../../hooks';
import { getOrdersToday, statusModalDeleteOrder } from '../../services/orders.service';
import Scrollbars from 'react-custom-scrollbars-2';
import { TitlePage } from '../../../components/TitlePage.component';
import { OrderListToolbar } from './components/OrderListToolbar.component';
import { Checkbox } from '@mui/material/';
import { TablePagination, IconButton } from '@mui/material';
import { TabsOrderStatus } from './components/TabsOrderStatus.component';
import { LabelStatusOrder } from './components/LabelStatusOrder.component';
import { usePagination } from '../../../../../hooks/usePagination';


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
    } else if (status === OrderStatus.DELIVERED) {
      ordersF = ordersF.filter(order => order.status === OrderStatus.DELIVERED && order.isPaid)
    }
    else {
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


  const [statusOrderFilter, setStatusOrderFilter] = useState<string>('all');

  const [selected, setSelected] = useState<string[]>([]);

  const [filterWaiter, setFilterWaiter] = useState(user?.id || 'all');

  const filteredOrders = filterOrders(orders, filterWaiter, statusOrderFilter);

  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage, paginatedList, resetPage } = usePagination<IOrder>(filteredOrders);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();

  const { callEndpoint, loading } = useFetchAndLoad();


  const handleCloseMenu = () => {
    setOpen(null);
  };

  const addOrder = () => {
    dispatch(resetActiveOrder());
    navigate('add');
  }


  const changeWaiter = (waiter: string) => {
    resetPage();
    setFilterWaiter(waiter);
  }

  const changeStatus = (event: React.SyntheticEvent, newValue: string) => {
    resetPage();
    setStatusOrderFilter(newValue);
  }






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



          <TableContainer>

            <Table
            // size='small'
            >

              <TableHead
              >


                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    Mesa
                  </TableCell>
                  <TableCell>
                    Mesero
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
                    Total
                  </TableCell>
                  <TableCell align='center'>
                    Acciones
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>


                {
                  paginatedList.length === 0 && (
                    <TableRow

                    >
                      <TableCell colSpan={8}>
                        <Typography my={5} textAlign='center'>
                          No hay pedidos

                        </Typography>
                      </TableCell>
                    </TableRow>

                  )
                }

                {
                  paginatedList.map((order) => (
                    <TableRow
                      hover
                      key={order.id}
                      sx={{
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          backgroundColor: theme.colors.alpha.black[5]

                        }
                      }}
                    // onClick={() => navigate(`orders/${order.id}`)}
                    >
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell
                       
                       >
                         Mesa {order.table?.name}
                       </TableCell>
                      <TableCell
                         
                       
                      >
                        {order.user.person.firstName} {order.user.person.lastName}
                      </TableCell>
                      <TableCell>
                        {order.client?.person.firstName} {order.client?.person.lastName}
                      </TableCell>

                    
                      <TableCell>
                        {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                      </TableCell>
                      <TableCell

                      

                      >
                        <LabelStatusOrder status={
                          order.status === OrderStatus.DELIVERED && !order.isPaid
                            ? "unpaid"
                            : order.status

                        } />
                      </TableCell>
                      <TableCell
                       
                      >
                        $ {order.total}
                      </TableCell>
                      <TableCell align='center'
                       
                      >
                        {/* <IconButton onClick={(e) => handleOpenMenu(e, order)}>
                            <MoreVert />
                          </IconButton> */}
                        <IconButton
                          onClick={() => navigate(`edit/${order.id}`)}
                          color='primary'
                        >
                          <EditOutlined />
                        </IconButton>

                        <IconButton
                          color='error'
                          onClick={() => {

                            statusModalDeleteOrder.setSubject(true, order)
                          }}
                          disabled={!!order.details?.find(detail => detail.qtyDelivered > 0)}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </TableCell>

                    </TableRow>
                  ))


                }

              </TableBody>

            </Table>

          </TableContainer>

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
          Editar
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <DeleteOutlined />
          Eliminar
        </MenuItem>
      </Popover>






    </>
  )

}