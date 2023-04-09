import { Card, CardHeader, Divider } from "@mui/material"
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


export const CardActiveOrder:FC<Props> = ({
  orders,
  title,
  color
}) => {
  return (
   <>

<Card
      sx={{
        height: '600px',
        overflowY: 'auto',
        width: '325px',
        mr: 1
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

      {
        orders.length > 0
        &&
        orders.map(order => (
          <>
            <ActiveOrder order={order}/>
            <Divider />
          </>
        ))
      }


      </Card>
    



   </>
  )
}