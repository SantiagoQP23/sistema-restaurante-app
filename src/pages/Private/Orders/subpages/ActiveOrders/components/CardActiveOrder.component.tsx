import { Card, CardContent, CardHeader, Divider, lighten, useTheme, Box, Button } from '@mui/material';
import { IOrder, OrderStatus } from "../../../../../../models"
import { FC } from "react"
import { ActiveOrder } from "./ActiveOrder.component"
import { Label } from "../../../../../../components/ui"
import { useDispatch } from 'react-redux';
import { resetActiveOrder } from '../../../../../../redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';



interface Props {
  orders: IOrder[],
  title: string,
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary',
  status?: OrderStatus
}


export const CardActiveOrder: FC<Props> = ({
  orders,
  title,
  color,
  status 
}) => {

  const theme = useTheme();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addOrder = () => {
    dispatch(resetActiveOrder());
    navigate('add');
  }

  return (
    <>

      <Card
        sx={{
          height: '600px',
          overflowY: 'auto',
          width: '325px',
          mr: 2,
          bgcolor: 'transparent',

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
              
            </>
          }

          subheader={
            `${orders.length} pedidos`
          }

        />
        <Divider />

        <Box
         
        >


          {/* <CardContent> */}


          {
            orders.length > 0
            &&
            orders.map(order => (
              <>
                <ActiveOrder key={order.id} order={order} color={color} />

              </>
            ))
          }


          {/* </CardContent> */}


          {/* {
            status === OrderStatus.PENDING && (
              <Button
                startIcon={<AddIcon />}
                color="primary"
                onClick={() => addOrder()}
                fullWidth
              >Añadir Pedido</Button>

            )
          } */}
        </Box>


      </Card>




    </>
  )
}