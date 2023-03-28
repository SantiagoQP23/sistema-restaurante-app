import { useContext } from 'react';

import { Box, Button } from "@mui/material"
import { TypeOrder } from "../../../../../../models"
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { SocketContext } from "../../../../../../context";
import { SocketResponseOrder } from '../../../interfaces/responses-sockets.interface';
import { useSnackbar } from 'notistack';
import { UpdateOrderDto } from '../../../dto/update-order.dto';



export const SelectTypeOrder = () => {

  const { activeOrder } = useSelector(selectOrders);

  const { socket } = useContext(SocketContext)

  const { enqueueSnackbar } = useSnackbar();




  const handleChange = (type: TypeOrder) => {

    console.log({ id: activeOrder!.id, type })

    const data : UpdateOrderDto = {
      id: activeOrder!.id,
      typeOrder: type
    }

    socket?.emit('update-order', data , (res: SocketResponseOrder) => {

      if(!res.ok){
        enqueueSnackbar(res.msg, { variant: 'error' })
      }
    })




  }


  return (
    <Box display='flex' sx={{gap: 2}} justifyContent='center'>


      {
        Object.keys(TypeOrder).map((key) => (
          <Button
            variant={activeOrder!.type === key ? "contained" : "outlined"}
            key={key}
            sx={{
             
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white'
              }

            }}

            onClick={() => handleChange(key as TypeOrder)}


          >
            {TypeOrder[`${key}` as keyof typeof TypeOrder]}
          </Button>
        ))
      }

    </Box>
  )
}