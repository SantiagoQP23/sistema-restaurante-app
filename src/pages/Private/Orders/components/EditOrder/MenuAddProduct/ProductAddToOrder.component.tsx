import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { Card, CardContent, Typography, Box, IconButton, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../../../../../../context";
import { IProduct, IOrderDetail } from "../../../../../../models";
import { selectOrders, setActiveOrder } from "../../../../../../redux";
import { OrderContext } from "../../../context/Order.context";
import { CreateOrderDetailDto } from "../../../dto/create-order-detail.dto";
import { UpdateOrderDetailDto } from "../../../dto/update-order-detail.dto";
import { useCounter } from "../../../hooks";
import { EventsEmitSocket } from "../../../interfaces/events-sockets.interface";
import { SocketResponseOrder } from "../../../interfaces/responses-sockets.interface";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ProductStatus } from '../../../../../../models/menu.model';
import { ICreateOrderDetail } from '../../../../../../models/orders.model';
import { sharingInformationService } from '../../../services/sharing-information.service';


interface PropsProduct {
  product: IProduct,
  //newDetail: (detail: ICreateOrderDetail) => void;
}


export const ProductAddToOrder: FC<PropsProduct> = ({ product }) => {
  const { state: counter, increment, decrement } = useCounter(1,);

  const { activeOrder } = useSelector(selectOrders);

  const [subtotal, setSubtotal] = useState(counter * product.price);
  const { addDetail } = useContext(OrderContext);

  useEffect(() => {
    setSubtotal(counter * product.price)
  }, [counter]);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();




  const { socket } = useContext(SocketContext);


  const updateOrderDetail = (detail: IOrderDetail) => {
    const data: UpdateOrderDetailDto = {
      orderId: activeOrder!.id,
      id: detail.id,
      quantity: detail.quantity + counter
    }

    socket?.emit(EventsEmitSocket.updateOrderDetail, data, ({ ok, order, msg }: SocketResponseOrder) => {

      if (ok) {
        dispatch(setActiveOrder(order!))

      } else {
        enqueueSnackbar(msg, { variant: 'error' });
      }

    });

  }


  const createOrderDetail = () => {
    const data: CreateOrderDetailDto = {

      orderId: activeOrder!.id,
      productId: product.id,
      quantity: counter
    }

    console.log(data);

    socket?.emit(EventsEmitSocket.addOrderDetail, data, ({ ok, order, msg }: SocketResponseOrder) => {

      if (ok) {
        dispatch(setActiveOrder(order!))

      } else {
        enqueueSnackbar(msg, { variant: 'error' });
      }

    });
  }




  const createNewDetail = () => {

    if (activeOrder) {
      const detail = activeOrder.details.find(det => det.product.id === product.id);

      if (detail) {
        updateOrderDetail(detail);

      } else {
        createOrderDetail();
      }

    }
    else {

      addDetail({ product, quantity: counter })
      enqueueSnackbar(`${product.name} agregado`, { variant: 'success' })
    }


    const detail:ICreateOrderDetail = {product, quantity: counter}
    
    sharingInformationService.setSubject(true, detail); 
   
 
  }


  return (
    <>
      <Card>

        <CardContent sx={{ flex: '1 0 auto' }} >

          <Typography variant="h5" textAlign='center' mb={1}>{product.name}</Typography>

          <Typography variant="body1" textAlign='center'>$ {product.price}</Typography>

          <Box display='flex' justifyContent='center' alignItems='center' p={1}>

            {
              product.status === ProductStatus.AVAILABLE
                ?

                <Box display='flex' justifyContent='center' alignItems='center'>

                  <IconButton
                    size="small"
                    onClick={decrement}
                  >
                    <RemoveCircleOutline />
                  </IconButton>

                  <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography>
                  <IconButton
                    size="small"
                    onClick={increment}
                  >
                    <AddCircleOutline />
                  </IconButton>

                  {
                    !activeOrder?.details.find(det => det.product.id === product.id)
                      ?
                      <Button
                        disabled={counter <= 0}
                        color='primary'
                        onClick={() => {
                          createNewDetail();
                          /* newDetail({product, quantity: counter}) */
                        }}

                        size='small'
                      >
                        <ShoppingCartIcon />

                      </Button>
                      : <Button
                        disabled

                      >Añadido</Button>

                  }
                </Box>
                : <Typography variant='h6' color='info' align="center">Producto no disponible</Typography>
            }



          </Box>


        </CardContent>
      </Card>

    </>
  )

}
