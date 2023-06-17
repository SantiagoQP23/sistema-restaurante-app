import { useDispatch, useSelector } from "react-redux"
import { resetActiveOrder, selectOrders } from "../../../../../../redux"
import { Card, CardHeader, Stack, CardContent, Typography, CardActionArea, Button, Chip, Grid } from '@mui/material';
import { OrderStatus, TypeOrder } from "../../../../../../models";
import { LabelStatusOrder } from "../../OrdersList/components/LabelStatusOrder.component";
import { format, formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { AccessTime, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Box } from '@mui/material/';



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
{/*       
      <Stack
        
        direction={'row'}
       
        spacing={1}
        mb={1}
        sx={{
          // flexDirection: 'row',
          overflowX: 'auto',
          maxWidth: '90%',
          pb: 1,
        }}
        
      > */}

      <Box
        sx={{
          display:{
            xs:  'flex',
            sm: 'flex',
            md: 'none',

          },
          flexDirection: 'row',
          overflowX: 'auto',
          
          pb: 1,
          gap: 1
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
              <
                >
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
              /> 
              // <Grid item key={order.id} xs={8} >

            */}



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

                    <CardContent>

                      <Stack direction='row' alignItems='center' justifyContent='space-between' >
                      <LabelStatusOrder
                        status={!order.isPaid && order.status === 'DELIVERED' ? 'unpaid' : order.status}
                      />

                      <Typography variant="subtitle1" color="text.secondary">
                        #{
                          order.num
                        }
                      </Typography>

                      </Stack>

                      <Stack direction='row' alignItems='center' justifyContent='space-between' mt={1}>
                      <Typography variant='h5' display='flex' alignItems='center'>

                        <TableRestaurantIcon fontSize="small"/>
                        {
                          order.type === TypeOrder.IN_PLACE

                            ?
                            `Mesa ${order.table?.name || ''}`
                            : 'Para llevar'
                        }

                      </Typography>

                      <Typography variant='h5' display='flex' alignItems='center' >

                        <Person fontSize="small"/>
                        {
                          order.user.person.firstName

                        }
                      </Typography>

                      </Stack>

                      <Typography variant='subtitle1' mt={1}>
                        {`$ ${order.total}`}

                      </Typography>



                    </CardContent>

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




      </Box>

    </>
  )
}