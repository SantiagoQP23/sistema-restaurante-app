import { FC, useState, useEffect, useContext } from "react";

import { AddCircleOutline, ExpandMore, RemoveCircleOutline } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Grid, IconButton, Typography, Divider, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { InputSearch } from "../../../../../components/ui";
import { IProduct, ICategory } from "../../../../../models";
import { selectMenu, setActiveCategory, setActiveSection } from "../../../../../redux";
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
import { UpdateOrderDetailDto } from '../../dto/update-order-detail.dto';
import { ProductAddToOrder } from './MenuAddProduct/ProductAddToOrder.component';
import { ProductListAddToOrder } from './MenuAddProduct/ProductListAddToOrder.component';





interface Props {
  categories: ICategory[]
}



export const Categories: FC<Props> = ({ categories }) => {

  const { activeSection, activeCategory } = useSelector(selectMenu);

  const dispatch = useDispatch();

  const changeCategory = (category: ICategory) => {
    dispatch(setActiveCategory(category));
  }

  if (!activeCategory) {

    return (
      <Typography variant='body1' textAlign='center'>Seleccione una sección</Typography>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {
          categories.map((category, index) => (

            /*  <Box key={category.id} sx={{border: 1, p: 2 , borderRadius: 2, mr: 3}}>
 
               {category.name}
               
               </Box> */
            <Button
              variant={activeCategory.id === category.id ? "contained" : "outlined"}
              key={category.id}
              sx={{
                mr: 3,

                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white'
                }

              }}
              onClick={() => changeCategory(category)}

            >
              {category.name}
            </Button>

          ))

        }
      </Box>



    </>
  )
}




// const Category: FC<PropsCategory> = ({ category }) => {

//   return (
//     <>
//       <Card>
//         <Accordion>

//           <AccordionSummary
//             expandIcon={<ExpandMore />}
//             aria-controls="panel1a-content"
//             id="panel1a-header"
//           >
//             <Typography>{category.name}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>


//             {
//               category.products.length > 0 && (
//                 <Grid container spacing={1}>
//                   {
//                     category.products.map(product => (
//                       <Grid key={product.id} item xs={12} md={4}>
//                         <Product product={product} />

//                       </Grid>
//                     ))
//                   }
//                 </Grid>

//               )
//             }
//           </AccordionDetails>
//         </Accordion>
//       </Card>

//     </>
//   )


// }


const AllMenu: FC = () => {

  const { sections, activeSection, categories, activeCategory } = useSelector(selectMenu);

  const { isOpen, handleClose, handleOpen } = useModal();

  const [detail, setDetail] = useState<ICreateOrderDetail | null>(null);

  const newDetail = (detail: ICreateOrderDetail) => {

    setDetail(detail);
    handleOpen();



  }

  return (
    <>
      <Grid container xs={12} spacing={2} >

        <Grid item xs={12} >



          <Sections sections={sections} />

        </Grid>

        <Grid item xs={12}>
          {
            activeSection &&
            <Categories categories={activeSection?.categories} />

          }
        </Grid>

        <Grid item xs={12} >

          {
            activeCategory &&
            <ProductListAddToOrder products={activeCategory.products} />
          }
        </Grid>
      </Grid>

      {/* <Grid item>

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
      </Grid> */}



    </>
  )

}




export const MenuAddProduct = () => {

  const { sections } = useSelector(selectMenu);

  const [nameProduct, setNameProduct] = useState('')

  const [products, setProducts] = useState<IProduct[]>([]);


  const ListProducts = getProducts(sections);

  const dispatch = useDispatch();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameProduct(event.target.value);

    setProducts(findProductsByName(event.target.value, ListProducts));


  };

  const searchProduct = () => {
    setProducts(findProductsByName(nameProduct, ListProducts));
  }

  useEffect(() => {
    dispatch(setActiveSection(sections[0]));
    dispatch(setActiveCategory(sections[0].categories[0]));

  }, [])



  return (
    <>

      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Grid item xs={12} mb={1}>


          <InputSearch
            handleChange={handleChange}
            search={searchProduct}
            placeholder={'Nombre del producto'}
          />

        </Grid>
        <Grid item xs={12} mb={1}>
          {
            nameProduct.length > 0
              ? <ProductListAddToOrder products={products} />
              : <AllMenu />
          }

          <ModalAddDetail />

        </Grid>
      </Grid>
    </>

  )
}