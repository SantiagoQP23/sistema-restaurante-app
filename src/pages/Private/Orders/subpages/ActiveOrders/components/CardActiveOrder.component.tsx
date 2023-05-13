import { Card, CardContent, CardHeader, Divider, lighten, useTheme, Box, Button, Stack } from '@mui/material';
import { IOrder, OrderStatus } from "../../../../../../models"
import { FC } from "react"
import { ActiveOrder } from "./ActiveOrder.component"
import { Label } from "../../../../../../components/ui"
import { useDispatch } from 'react-redux';
import { resetActiveOrder } from '../../../../../../redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Scrollbar } from '../../../../components';



interface Props {
  orders: IOrder[],
  title: string,
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary',
  status?: OrderStatus,
  alignment?: string
}


export const CardActiveOrder: FC<Props> = ({
  orders,
  title,
  color,
  status,
  alignment = 'vertical'
}) => {

  const theme = useTheme();

  const dispatch = useDispatch();

  const navigate = useNavigate();



  return (
    <>

      <Card
        sx={{
         
          width: alignment === 'horizontal' ? 'auto' : '325px',
        
          // bgcolor: 'transparent',

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


       
       

          <Stack

            direction={alignment === 'horizontal' ? 'row' : 'column'}

            // direction='row'
            sx={{

              height: alignment === 'horizontal' ? 'auto' : '600px',
              width: alignment === 'horizontal' ? 'auto' : '100%',
              overflowX: 'auto',
            
    
            }}
            spacing={1}
            p={1}
          >



            {
              orders.length > 0
              &&
              orders.map(order => (
                <Box
                  key={order.id}
                  sx={{
                    
                    minWidth: alignment === 'horizontal' ? '325px' : '100%',
                  }}
                >
                  <ActiveOrder key={order.id} order={order} color={color} />

                </Box>
              ))
            }
          </Stack>
     


      </Card>




    </>
  )
}