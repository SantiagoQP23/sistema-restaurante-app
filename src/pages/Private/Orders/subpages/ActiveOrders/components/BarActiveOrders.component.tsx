import { useDispatch, useSelector } from "react-redux"
import { resetActiveOrder, selectOrders } from "../../../../../../redux"
import { Card, CardHeader, Stack, CardContent, Typography, CardActionArea, Button } from '@mui/material';
import { TypeOrder } from "../../../../../../models";
import { LabelStatusOrder } from "../../ListOrders/components/LabelStatusOrder.component";
import { format, formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';



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

        <Button
          onClick={addOrder}
          startIcon={<AddIcon />}
        >
          Nuevo pedido
        </Button>

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

              <Card

                key={order.id}
                sx={{
                  minWidth: '280px',
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/orders/edit/${order.id}`)}
                >


                  <CardHeader
                    title={
                      order.type === TypeOrder.IN_PLACE

                        ?
                        `Mesa ${order.table?.name}`
                        : 'Para llevar'
                    }
                    subheader={
                      order.client
                        ? order.client?.person.firstName + ' ' + order.client?.person.lastName
                        : '-'
                    }

                    action={
                      <>
                        <Typography variant='body2' >
                          $ {order.total}
                        </Typography>
                      </>
                    }

                  />

                  <CardContent

                  >
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                    >

                      <LabelStatusOrder
                        status={!order.isPaid && order.status === 'DELIVERED' ? 'unpaid' : order.status}
                      />

                      <Stack
                        direction='row'
                        alignItems='center'
                      >

                        <Typography alignItems='center' >
                          Hora: {format(new Date(order.createdAt), 'HH:mm:ss')}
                        </Typography>
                      </Stack>

                    </Stack>

                  </CardContent>
                </CardActionArea>



              </Card>
            )

            )
        }




      </Stack>
    </>
  )
}