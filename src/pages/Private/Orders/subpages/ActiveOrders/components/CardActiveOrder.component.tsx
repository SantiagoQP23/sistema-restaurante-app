import { Card, CardContent, CardHeader, Divider, lighten, useTheme, Box } from '@mui/material';
import { IOrder, OrderStatus } from "../../../../../../models"
import { FC } from "react"
import { ActiveOrder } from "./ActiveOrder.component"
import { Label } from "../../../../../../components/ui"



interface Props {
  orders: IOrder[],
  title: string,
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary',
  status?: OrderStatus
}


export const CardActiveOrder: FC<Props> = ({
  orders,
  title,
  color
}) => {

  const theme = useTheme();
  return (
    <>

      <Card
        sx={{
          height: '600px',
          overflowY: 'auto',
          width: '325px',
          mr: 1,

        }}
      >

        <CardHeader
          title={
            <>
              <Label
                color={color}
              >
                {title}
              </Label>
              {orders.length}
            </>
          }


        />
        <Divider />

        <Box
          sx={{
            p: 1
          }}
        >


          {/* <CardContent> */}


          {
            orders.length > 0
            &&
            orders.map(order => (
              <>
                <ActiveOrder  key={order.id} order={order} color={color} />

              </>
            ))
          }
        </Box>
        {/* </CardContent> */}


      </Card>




    </>
  )
}