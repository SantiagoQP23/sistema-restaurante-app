import { useDispatch, useSelector } from "react-redux"
import { resetActiveOrder, selectOrders } from "../../../../../../redux"
import { Card, CardHeader, Stack, CardContent, Typography, CardActionArea, Button, Chip } from '@mui/material';
import { OrderStatus, TypeOrder } from "../../../../../../models";
import { LabelStatusOrder } from "../../OrdersList/components/LabelStatusOrder.component";
import { format, formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';



export const BarActiveOrders = () => {


  const { orders } = useSelector(selectOrders);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addOrder = () => {
    dispatch(resetActiveOrder());
    navigate('add');
  }

  const activeOrders = orders.filter(order => !order.isPaid);


  return (
    <>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >

        <Typography variant='h4' mb={1} >
          Lista
        </Typography>

        {/* <Button
          onClick={addOrder}
          startIcon={<AddIcon />}
        >
          Nuevo pedido
        </Button> */}

      </Stack>
      <Stack
        direction='row'
        spacing={1}
        mb={1}
        sx={{
          overflowX: 'auto',
          pb: 1,
        }}

      >

        {

          activeOrders.length === 0
            ? (
              <Typography variant='body1' >
                No hay pedidos activos
              </Typography>
            )
            :
            activeOrders.map((order) => (
              <>
              {/* <Chip 
                key={order.id}
                label={(order.type === TypeOrder.IN_PLACE ? `Mesa ${order.table?.name}` : 'Para llevar') + ' - ' + order.user?.person.firstName + ' ' + order.user?.person.lastName}
                onClick={() => navigate(`/orders/list/edit/${order.id}`)}
                color={
                  order.status === 'DELIVERED' && !order.isPaid
                    ? 'warning'
                    : order.status ===  OrderStatus.IN_PROGRESS
                      ? 'info'
                      : 'success'

                }
                icon={<TableRestaurantIcon 
                  
                />}
                clickable
                sx={{
                  py: 2,
                }}
               
                variant="outlined"
              /> */}

              <Card

                key={order.id}
                sx={{
                  minWidth: '220px',
                  // borderBottom: (theme) => `5px solid ${theme.palette['success'].main}`,
                }}

               
              >
                <CardActionArea
                  onClick={() => navigate(`/orders/list/edit/${order.id}`)}
                >


                  <CardHeader
                    title={
                      order.type === TypeOrder.IN_PLACE

                        ?
                        `Mesa ${order.table?.name}`
                        : 'Para llevar'
                    }
                    subheader={
                      
                      order.user.username
                        
                    }

                    action={
                      <>
                           <LabelStatusOrder
                        status={!order.isPaid && order.status === 'DELIVERED' ? 'unpaid' : order.status}
                      />
                      </>
                    }

                  />

                  {/* <CardContent

                  >
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                    >

                   

                      <Stack
                        direction='row'
                        alignItems='center'
                      >

                        <Typography alignItems='center' >
                          Hora: {format(new Date(order.createdAt), 'HH:mm:ss')}
                        </Typography>
                      </Stack>

                    </Stack>

                  </CardContent> */}
                </CardActionArea>



              </Card>
              </>

            )

            )
        }




      </Stack>
      
    </>
  )
}