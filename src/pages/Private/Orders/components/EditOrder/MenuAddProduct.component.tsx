import { FC, useState, useEffect, useContext } from "react";

import { AddCircleOutline, ExpandMore, RemoveCircleOutline } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Grid, IconButton, Typography, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { InputSearch } from "../../../../../components/ui";
import { IProduct, ICategory } from "../../../../../models";
import { selectMenu } from "../../../../../redux";
import { Sections } from "../../../Menu/components";
import { useCounter } from "../../hooks";
import { sharingInformationService } from "../../services/sharing-information.service";






import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { findProductsByName, getProducts } from "../../../../../helpers";
import { useAppSelector, useModal } from "../../../../../hooks";
import { ICreateOrderDetail, IOrderDetail } from '../../../../../models/orders.model';
import { ModalAddDetail } from './ModalAddDetail.component';
import { OrderContext } from '../../context/Order.context';
import { selectOrders, setActiveOrder } from '../../../../../redux/slices/orders/orders.slice';
import { SocketContext } from '../../../../../context/SocketContext';
import { useSnackbar } from 'notistack';
import { UpdateOrderDto } from '../../dto/update-order.dto';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../interfaces/responses-sockets.interface';
import { CreateOrderDetailDto } from '../../dto/create-order-detail.dto';

interface PropsProduct {
  product: IProduct,
  //newDetail: (detail: ICreateOrderDetail) => void;
}


const Product: FC<PropsProduct> = ({ product }) => {
  const { state: counter, increment, decrement } = useCounter(1);

  const { activeOrder } = useSelector(selectOrders);

  const [subtotal, setSubtotal] = useState(counter * product.price);
  const { addDetail } = useContext(OrderContext);

  useEffect(() => {
    setSubtotal(counter * product.price)
  }, [counter]);

  const {enqueueSnackbar} = useSnackbar();

  const dispatch = useDispatch();




  const {socket} = useContext(SocketContext);


  const updateOrderDetail = (detail: IOrderDetail) => {
    const data: UpdateOrderDto = {
      id: activeOrder!.id,
      orderDetail: {
        id: detail.id,
        quantity: detail.quantity + counter
      }
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
    const data : CreateOrderDetailDto = {

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

      if(detail) {
        updateOrderDetail(detail);

      }else {
        createOrderDetail();
      }

    }
    else {

      addDetail({ product, quantity: counter })
    }


    /*  const detail:ICreateOrderDetail = {product, quantity: counter}
 
     sharingInformationService.setSubject(true, detail); */
  }


  return (
    <>
      <Card>

        <CardContent sx={{ flex: '1 0 auto' }} >

          <Grid container spacing={1}>


            <Grid item xs={12}>
              <Typography variant="body1" color='InfoText' >{product.name}</Typography>

            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" >

                {
                  product.description ? product.description : 'Sin descripción'
                }
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color='orangered' textAlign='right'>$ {product.price}</Typography>

            </Grid>

          </Grid>

          <Box display='flex' justifyContent='space-between' alignItems='center' p={1}>


            <Typography variant="body1" > $ {subtotal}</Typography>

            <Box display='flex' justifyContent='space-between' alignItems='center'>

              <IconButton
                onClick={decrement}
              >
                <RemoveCircleOutline />
              </IconButton>

              <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography>
              <IconButton
                onClick={increment}
              >
                <AddCircleOutline />
              </IconButton>
              <IconButton
                disabled={counter <= 0}
                color='primary'
                onClick={() => {
                  createNewDetail();
                  /* newDetail({product, quantity: counter}) */
                }}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Box>

          </Box>


        </CardContent>
      </Card>

    </>
  )

}


interface PropsCategory {
  category: ICategory
}


interface ProductsListProps {
  products: IProduct[]
}

const ProductsList: FC<ProductsListProps> = ({ products }) => {



  return (
    <>
      <Grid container spacing={1}>
        {
          products.map(product => (
            <Grid key={product.id} item xs={12}>
              <Product product={product} />

            </Grid>
          ))
        }
      </Grid>

    </>
  )

}



const Category: FC<PropsCategory> = ({ category }) => {

  return (
    <>
      <Card>
        <Accordion>

          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{category.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>


            {
              category.products.length > 0 && (
                <Grid container spacing={1}>
                  {
                    category.products.map(product => (
                      <Grid key={product.id} item xs={12}>
                        <Product product={product} />

                      </Grid>
                    ))
                  }
                </Grid>

              )
            }
          </AccordionDetails>
        </Accordion>
      </Card>

    </>
  )


}


const AllMenu: FC = () => {

  const { sections, activeSection, categories } = useSelector(selectMenu);

  const { isOpen, handleClose, handleOpen } = useModal();

  const [detail, setDetail] = useState<ICreateOrderDetail | null>(null);

  const newDetail = (detail: ICreateOrderDetail) => {

    setDetail(detail);
    handleOpen();



  }

  return (
    <>
      <Grid item xs={12} >
        <Card sx={{ mb: 1 }}>
          <CardContent>

            <Sections sections={sections} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item>

        {
          sections?.length === 0
            ? <>No se ha creado un menu</>
            : <>
              {
                categories.length > 0
                  ?
                  <>

                    <Grid container spacing={1} >

                      {
                        activeSection?.categories.map(category => (
                          <Grid key={category.id} item xs={12}>
                            <Category category={category} />

                          </Grid>

                        ))
                      }

                    </Grid>

                  </>
                  : <><Typography variant='body1' textAlign='center'>Sin categorías</Typography></>
              }
            </>


        }
      </Grid>



    </>
  )

}




export const MenuAddProduct = () => {

  const { sections } = useSelector(selectMenu);

  const [nameProduct, setNameProduct] = useState('')

  const [products, setProducts] = useState<IProduct[]>([]);


  const ListProducts = getProducts(sections);



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameProduct(event.target.value);

    setProducts(findProductsByName(event.target.value, ListProducts));


  };

  const searchProduct = () => {
    setProducts(findProductsByName(nameProduct, ListProducts));
  }


  return (
    <>
      <InputSearch
        handleChange={handleChange}
        search={searchProduct}
        placeholder={'Nombre del producto'}
      />
      <Divider sx={{ my: 1 }} />
      {
        nameProduct.length > 0
          ? <ProductsList products={products} />
          : <AllMenu />
      }

      <ModalAddDetail />
    </>

  )
}