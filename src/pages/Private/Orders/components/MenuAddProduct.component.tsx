import { FC, useState, useEffect, useContext } from "react";

import { AddCircleOutline, ExpandMore, RemoveCircleOutline } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Grid, IconButton, Typography, Divider } from '@mui/material';
import { useSelector } from "react-redux";
import { InputSearch } from "../../../../components/ui";
import { IProduct, ICategory } from "../../../../models";
import { selectMenu } from "../../../../redux";
import { Sections } from "../../Menu/components";
import { useCounter } from "../hooks";
import { sharingInformationService } from "../services/sharing-information.service";






import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { findProductsByName, getAllProducts } from "../../../../helpers";
import { useAppSelector, useModal } from "../../../../hooks";
import { ICreateOrderDetail } from '../../../../models/orders.model';
import { ModalAddDetail } from './ModalAddDetail.component';
import { OrderContext } from '../context/Order.context';

interface PropsProduct {
  product: IProduct,
  //newDetail: (detail: ICreateOrderDetail) => void;
}


const Product: FC<PropsProduct> = ({ product}) => {
  const { state: counter, increment, decrement } = useCounter(1);

  const [subtotal, setSubtotal] = useState(counter * product.price);
  const {addDetail} = useContext(OrderContext);

  useEffect(() => {
    setSubtotal(counter * product.price)
  }, [counter]);


  const createNewDetail = () => {

    addDetail({product, quantity: counter})

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
            <Grid item xs={12}>
              <Product product={product}  />

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
                      <Grid item xs={12}>
                        <Product product={product}  />

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
                          <Grid item xs={12}>
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

  const { sections} = useSelector(selectMenu);

  const [nameProduct, setNameProduct] = useState('')

  const [products, setProducts] = useState<IProduct[]>([]);


  const ListProducts = getAllProducts(sections);



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