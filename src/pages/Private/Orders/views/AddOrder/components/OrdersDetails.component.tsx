import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Card, CardHeader, IconButton, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../../context/Order.context";
import { NewOrderDetail } from "./NewOrderDetail.component";


export const OrderDetails = () => {


  const navigate = useNavigate();

  const { state: { details, totalProducts }, dispatch } = useContext(OrderContext)


  return (

    <>

      <Card>

        <CardHeader
          title='Productos'
          subheader={`Total: ${details.reduce((acc, detail) => acc + Math.floor(detail.quantity) + (Number.isInteger(detail.quantity) ? 0 : 1), 0)}`}
          action={
            <>
              <IconButton
                // sx={{ display: { xs: 'flex', md: 'none' } }}
                size="small"
                onClick={() => navigate('/orders/menu')}
                color="primary"


              >

                <AddShoppingCartOutlined />
              </IconButton>
            </>
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
                details.length > 0
                  ? details.map((detail) => (
                    <>
                      <NewOrderDetail detalle={detail} key={detail.product.id}/>
                    </>


                  ))
                  : (<TableRow>
                    <TableCell colSpan={5}>

                      <Typography variant='body1' align='center' my={5}>No se han añadido productos</Typography>
                    </TableCell>
                  </TableRow>)

              }
            </TableBody>
          </Table>
        </TableContainer>



      </Card>

    </>
  )
}