import { FC, useContext } from 'react';
import { Box, Typography, Grid, Divider, Button, Card, CardHeader, TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { OrderDetail } from "../../../components/EditOrder/OrderDetail.component"
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../../context/Order.context';
import { IOrderDetail } from '../../../../../../models';
import { ModalUpdateDetail } from '../../../components/EditOrder/ModalUpdateDescriptionDetail.component';
import { AddShoppingCartOutlined } from '@mui/icons-material';




interface Props {
  details: IOrderDetail[]
}


export const OrderDetails: FC<Props> = ({ details: orderDetails }) => {


  const navigate = useNavigate();

  const { details } = useContext(OrderContext);


  return (

    <>

      <Card>

        <CardHeader 
        
        title='Productos'
        action={
          <Button
            
            color="primary"
            onClick={() => navigate('products')}
            size='small'

          >
            <AddShoppingCartOutlined />

          </Button>

        }
        />


        <Divider />

        <TableContainer>
          <Table>
          <TableHead>
              <TableRow>
                <TableCell>
                  Cantidad
                </TableCell>
                <TableCell>
                  Producto
                </TableCell>
                <TableCell>
                  Descripción
                </TableCell>
                <TableCell>
                  Subtotal
                </TableCell>
                <TableCell>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

          
    
       

        {
          orderDetails.length === 0
            ? (<TableRow>
              <TableCell colSpan={5}>

                <Typography variant='body1' align='center' my={5}>No se han añadido productos</Typography>
              </TableCell>
            </TableRow>)

            :
          
              
                orderDetails.map((detail) => {

                  if (detail.isActive)
                    return (
                                      
                        <OrderDetail key={detail.id} detail={detail} />


                   
                    )
                })
              
              
            }
      
      </TableBody>
          </Table>
        </TableContainer>

            <ModalUpdateDetail />

      </Card>

    </>
  )
}