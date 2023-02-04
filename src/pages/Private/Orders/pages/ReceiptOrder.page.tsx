import { ArrowBack, Done } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Typography, Container, Card, CardContent, Box, Stack, CardHeader } from '@mui/material';
import Add from "date-fns/add";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';
import { Label } from "../../../../components/ui";
import { format } from "date-fns";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ReceiptPdf } from "../components/ReceiptOrder/PdfReceipt/ReceiptPdf.component";
import { statusModalPayOrder, statusModalDiscountOrder } from '../services/orders.service';
import { OrderStatus, OrderStatusSpanish } from '../../../../models/orders.model';
import { DataClient, OrderDetails } from "../components";
import { OrderTable } from "../components/EditOrder/OrderTable.component";
import { Divider } from '@mui/material/';
import { es } from "date-fns/locale";


const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

/* function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}
 */

/* 

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

 */

export const ReceiptOrder = () => {

  const navigate = useNavigate();

  const { activeOrder } = useSelector(selectOrders);



  const endEdit = () => {

    if (activeOrder) {
      activeOrder.status !== OrderStatus.PAID ? navigate('/orders/edit/' + activeOrder.id) : navigate('/orders')
    }

  }

  const openModalDiscount = () => {
    statusModalDiscountOrder.setSubject(true, activeOrder!);
  }

  const payOrder = () => {
    statusModalPayOrder.setSubject(true, activeOrder!);



  }



  if (!activeOrder) {
    return (
      <>No se ha seleccionado un pedido</>
    )
  }




  return (
    <>
      <Grid container display='flex' justifyContent='space-between' mb={2} alignItems='center'>

        <Button variant='outlined'
          onClick={() => {
            endEdit();
          }}
        >
          <ArrowBack />
          {activeOrder.status !== OrderStatus.PAID ? 'Editar pedido' : 'Volver a pedidos'}
        </Button>
        <Typography variant='h4'> Comprobante de pedido </Typography>


        {

          <PDFDownloadLink document={<ReceiptPdf order={activeOrder!} />} fileName={'pedido-' + activeOrder!.id}>
            <Button
              variant='contained'
            >Descargar PDF
            </Button>


          </PDFDownloadLink>

        }






      </Grid>




      {/*  <PDFViewer style={{ height: "90vh", width: "100%"}}>
        <ReceiptPdf order={activeOrder} />
      </PDFViewer> */}

      <Container maxWidth='sm'>



        <Card>

          <CardContent>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Box>
                <Typography variant='h5' fontWeight='bold'>Pedido N° {activeOrder.num}</Typography>

              </Box>

              <Box>
                <Typography variant='subtitle1' >Mesa</Typography>
                <Typography variant='h5' fontWeight='bold' align='right'>12</Typography>


              </Box>

            </Box>

            <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

              <Box>
                <Typography variant='subtitle1' >Fecha</Typography>
                <Typography variant='h5'>{format(new Date(activeOrder?.createdAt), 'dd MMMM yyyy HH:mm', {locale: es})}</Typography>
              </Box>
              <Label color='info'>{OrderStatusSpanish[`${activeOrder.status as OrderStatus}`]}</Label>
            </Box>

            <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
              <Typography variant='body1'>Mesero: <b>{activeOrder.user.person.firstName} {activeOrder.user.person.lastName} </b></Typography>
              <Box>
                <Typography variant='h5' fontWeight='bold'>Personas</Typography>
                <Typography variant='body1' align="right">{activeOrder?.people}</Typography>
              </Box>
            </Box>

            <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
              <Typography variant='body1'>Cliente: <b>{activeOrder?.client?.person.firstName} {activeOrder?.client?.person.lastName} </b></Typography>


            </Box>



            <Box display='flex' justifyContent='space-between' alignItems='center'>

              <Typography variant="h4" fontWeight='bold'>Productos</Typography>

              <Typography variant="subtitle1">Cantidad: {activeOrder.details.length}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            {
              activeOrder.details.map((detail, index) => {
                return (
                  <>
                    <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>
                      <Box>
                        <Typography variant='h5'> {detail.quantity} - {detail.product.name}</Typography>
                        <Typography variant='subtitle1'>${detail.product.price}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='h5'>${detail.amount}</Typography>
                      </Box>



                    </Box>
                    <Divider sx={{ my: 1 }} />
                  </>
                )
              })

            }

            <Box display='flex' justifyContent='space-between' alignItems='center'>
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

              <Typography variant='h4' fontWeight='bold'>Subtotal </Typography>
              <Typography variant='h4' fontWeight='bold'>${activeOrder.amount}</Typography>
            </Box>


            <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

              <Typography variant='h4' fontWeight='bold'>Descuento </Typography>
              <Typography variant='h4' fontWeight='bold'>${activeOrder.discount}</Typography>
            </Box>

            <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

              <Typography variant='h4' fontWeight='bold'>Total </Typography>
              <Typography variant='h4' fontWeight='bold'>${activeOrder.total}</Typography>
            </Box>


            <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
              <Stack direction='row' spacing={2}>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={payOrder}
                  disabled={activeOrder.status !== OrderStatus.DELIVERED}

                >
                  Cobrar
                </Button>

                <Button

                  variant="contained"
                  color="secondary"
                  onClick={openModalDiscount}
                  disabled={activeOrder.status === OrderStatus.PAID}

                >
                  Descuento
                </Button>

                <PDFDownloadLink document={<ReceiptPdf order={activeOrder!} />} fileName={'pedido-' + activeOrder!.id}>
                  <Button
                    variant='contained'
                  >PDF
                  </Button>


                </PDFDownloadLink>





              </Stack>
            </Box>

          </CardContent>


        </Card>



      </Container>


      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} align="left">
                <Typography variant='h6'>Pedido N° {activeOrder.num}</Typography>
              </TableCell>
              <TableCell align="right">
                {
                  !activeOrder.isDelivered
                    ? <Label color='warning'>No entregado</Label>
                    : activeOrder.isPaid
                      ? <Label color='success'>Pagado</Label>
                      :
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={payOrder}

                      >
                        Marcar como pagado
                      </Button>
                }
              </TableCell>
            </TableRow>



            {
              activeOrder!.client
                ?
                <>
                  <TableRow>
                    <TableCell colSpan={4}>
                      Cliente
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3}>
                      Cliente: {activeOrder!.client?.person.firstName} {activeOrder!.client?.person.lastName}
                    </TableCell>
                    <TableCell >{activeOrder.client.person.identification.type}: {activeOrder.client.person.identification.num}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={3}>email: {activeOrder.client.person.email}</TableCell>
                    <TableCell >
                      Teléfono: {activeOrder.client.person.numPhone}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>
                      Dirección: {activeOrder!.client?.address}

                    </TableCell>
                  </TableRow>
                </>
                : <TableRow>
                  <TableCell colSpan={4}>
                    Cliente no asignado
                  </TableCell>
                </TableRow>

            }
            <TableRow>
              <TableCell colSpan={4}>
                Fecha de pedido: {format(new Date(activeOrder.createdAt), 'dd/MM/yyyy HH:mm:ss')}
              </TableCell>

            </TableRow>

            <TableRow>
              <TableCell colSpan={4}>
                Mesero: {activeOrder.user.person.firstName} {activeOrder.user.person.lastName}
              </TableCell>

            </TableRow>


            <TableRow>
              <TableCell align="center" colSpan={3}>
                Detalles
              </TableCell>
              <TableCell align="right">Precio</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Precio unitario</TableCell>
              <TableCell align="right">Suma</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeOrder.details.map((detail) => (
              <TableRow key={detail.id}>
                <TableCell>{detail.product.name}</TableCell>
                <TableCell align="right">{detail.quantity}</TableCell>
                <TableCell align="right">{detail.product.price}</TableCell>
                <TableCell align="right">{ccyFormat(Number(detail.amount))}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(Number(activeOrder.amount))}</TableCell>
            </TableRow>

            {
              activeOrder.isPaid &&
              <>
                <TableRow>
                  <TableCell colSpan={2}>Descuento</TableCell>
                  <TableCell align="right">{ccyFormat(Number(activeOrder.discount))}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{ccyFormat(Number(activeOrder.total))}</TableCell>
                </TableRow>
              </>

            }
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  )
}