import { ArrowBack, Done } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Typography } from "@mui/material"
import Add from "date-fns/add";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';
import { Label } from "../../../../components/ui";
import { format } from "date-fns";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ReceiptPdf } from "../components/ReceiptOrder/PdfReceipt/ReceiptPdf.component";
import { statusModalPayOrder } from '../services/orders.service';


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
    
    if(activeOrder){
      !activeOrder.isPaid ? navigate('/orders/edit/' + activeOrder.id) : navigate('/orders')
    }

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
        <Typography variant='h6'> Comprobante de pedido </Typography>


        {

          <PDFDownloadLink document={<ReceiptPdf order={activeOrder!} />} fileName={'pedido-' + activeOrder!.id}>
            <Button
              variant='contained'
            >Descargar PDF
            </Button>


          </PDFDownloadLink>

        }


        <Button variant='outlined'
          onClick={() => {
            endEdit();
          }}
        >
         <ArrowBack />
          {!activeOrder.isPaid ? 'Editar pedido' : 'Volver a pedidos'}
        </Button>



      </Grid>

      {/*  <PDFViewer style={{ height: "90vh", width: "100%"}}>
        <ReceiptPdf order={activeOrder} />
      </PDFViewer> */}

      <TableContainer component={Paper}>
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
      </TableContainer>
    </>
  )
}