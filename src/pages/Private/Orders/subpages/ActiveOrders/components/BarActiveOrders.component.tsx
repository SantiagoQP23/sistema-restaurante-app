import { useSelector } from "react-redux"
import { selectOrders } from "../../../../../../redux"
import { Card, CardHeader, Stack, CardContent, Typography, CardActionArea, Button } from '@mui/material';
import { TypeOrder } from "../../../../../../models";
import { LabelStatusOrder } from "../../ListOrders/components/LabelStatusOrder.component";
import { format, formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



export const BarActiveOrders = () => {


  const { orders } = useSelector(selectOrders);

  const navigate = useNavigate();

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

        <Button>
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
          orders.map((order) => {

            if (!order.isPaid)
              return (

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
                          : 'N.A.'
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

                          {/* <AccessTime sx={{ fontSize: 18 }} /> */}
                          <Typography alignItems='center' >
                            Hora: {format(new Date(order.createdAt), 'HH:mm:ss')}
                          </Typography>
                        </Stack>
                        {/* {'Creado ' +
                        formatDistance(new Date(order.createdAt), new Date(), {
                          addSuffix: true,
                          includeSeconds: true,
                          locale: es
                        })} */}
                      </Stack>

                    </CardContent>
                  </CardActionArea>



                </Card>
              )
          }
          )

        }

      </Stack>
    </>
  )
}