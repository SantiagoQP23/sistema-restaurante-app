import { ArrowBack, Done, DownloadOutlined, Edit, EditOutlined, SendOutlined } from "@mui/icons-material";
import { Button, Grid, Typography, Container, Card, CardContent, Box, Stack, CardHeader, IconButton, Tooltip, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';
import { Label } from "../../../../../components/ui";
import { format } from "date-fns";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { statusModalPayOrder, statusModalDiscountOrder } from '../../services/orders.service';
import { OrderStatus, OrderStatusSpanish, TypeOrder } from '../../../../../models/orders.model';
import { Divider } from '@mui/material/';
import { es } from "date-fns/locale";
import { PdfReceiptOrder } from './pdf/PdfReceiptOrder.component';
import { TitlePage } from "../../../components/TitlePage.component";
import { LabelStatusOrder } from "../OrdersList/components/LabelStatusOrder.component";


const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}


export const ReceiptOrder = () => {

  const navigate = useNavigate();

  const { activeOrder } = useSelector(selectOrders);



  const endEdit = () => {

    if (activeOrder) {
      !activeOrder.isPaid ? navigate('/orders/list/edit/' + activeOrder.id) : navigate('/orders')
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
      <Container maxWidth='lg'>

        <TitlePage
          title='Comprobante de pedido'
        />




        <Stack direction='row' spacing={1} justifyContent='space-between' >

          <Box>

            {
              !activeOrder.isPaid &&
              <IconButton
                onClick={endEdit}
              >
                <EditOutlined />
              </IconButton>

            }


            <PDFDownloadLink
              document={<PdfReceiptOrder order={activeOrder!} />}
              fileName={'pedido-' + activeOrder!.id}
            >
              <IconButton>
                <DownloadOutlined />
              </IconButton>




            </PDFDownloadLink>

            <Tooltip
              title='Enviar por correo. Próximamente'
            >

              <IconButton

              >
                <SendOutlined />
              </IconButton>
            </Tooltip>
          </Box>

          {
            !activeOrder.isPaid &&
            <Button
              startIcon={<Done />}
              variant="outlined"
              color="inherit"
              onClick={payOrder}
              disabled={activeOrder.status !== OrderStatus.DELIVERED}
              size="small"

            >
              Marcar como pagado
            </Button>
          }

        </Stack>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            my: 1
          }}
        >


        </Box>

        <Card>

          <CardHeader
            title={
              <Typography variant='h4' > Restaurante Doña Yoli </Typography>
            }
            action={

              <Stack spacing={1} >
                <Box display='flex' justifyContent='right'>

                  <LabelStatusOrder status={
                    activeOrder.status === OrderStatus.DELIVERED && !activeOrder.isPaid
                      ? "unpaid"
                      : activeOrder.status

                  } />
                </Box>
                <Box>
                  <Typography variant='h4' >Pedido N° {activeOrder.num}</Typography>

                </Box>


              </Stack>

            }


          />

          <CardContent>


            <Stack
              spacing={2}
              direction={{ xs: 'column', sm: 'row' }}
            // Establecer el tamaño de los elementos

            >

              {/* <Box
                flexBasis='50%'
              >
                <Typography variant='h5' mb={1}>Cliente</Typography>
                <Typography variant='body1'>{activeOrder.client?.address}</Typography>
                <Typography variant='body1'>{activeOrder.client?.person.email}</Typography>
                <Typography variant='body1'>{activeOrder.client?.person.numPhone}</Typography>
                <Typography variant='body1'>{activeOrder.client?.person.firstName} {activeOrder.client?.person.lastName}</Typography>
              </Box> */}
              <Box
                flexBasis='50%'
              >
                <Typography variant='h5' mb={1}>Mesero</Typography>
                <Typography variant='body1'>{activeOrder.user.person.firstName} {activeOrder.user.person.lastName}</Typography>
                <Typography variant='body1'>{activeOrder.user.person.email}</Typography>
                <Typography variant='body1'>{activeOrder.user.person.numPhone}</Typography>

              </Box>



            </Stack>


            <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

              <Box>
                <Typography variant='h5' mb={1}>Mesa</Typography>
                <Typography variant='body1' >{activeOrder.type === TypeOrder.IN_PLACE

                  ?
                  `Mesa ${activeOrder.table?.name || ''}`
                  : 'Para llevar'
                }</Typography>


              </Box>
              <Box>
                <Typography variant='h5' mb={1}>Fecha</Typography>
                <Typography variant='body1'>{format(new Date(activeOrder?.createdAt), 'dd MMMM yyyy HH:mm', { locale: es })}</Typography>
              </Box>

              <Box>
                <Typography variant='h5' mb={1}>Personas</Typography>
                <Typography variant='body1' >{activeOrder?.people}</Typography>
              </Box>

            </Box>

            <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>

            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Subtotal</TableCell>

                  </TableRow>
                </TableHead>

                <TableBody>
                  {
                    activeOrder.details.map((detail, index) => {
                      return (
                        <>
                          <TableRow key={detail.id} sx={{
                            whiteSpace: 'nowrap'
                          }}>
                            <TableCell align="center">{detail.quantity}</TableCell>
                            <TableCell sx={{
                              fontWeight: 'bold'
                            }}>{detail.product.name}</TableCell>
                            <TableCell align="right">${detail.product.price}</TableCell>
                            <TableCell align="right">${detail.amount}</TableCell>


                          </TableRow>

                        </>
                      )
                    })

                  }

                  {/* <TableRow>

                    <TableCell
                      align="right"
                      colSpan={3}
                      sx={{
                        border: 'none'
                      }}
                    >


                      <Typography variant='h5'>Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right"
                      sx={{
                        border: 'none'
                      }}
                    >${activeOrder.amount}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      align="right"
                      colSpan={3}
                      sx={{
                        border: 'none'
                      }}
                    >

                      <Typography variant='h5'>Descuento</Typography>
                    </TableCell>
                    <TableCell align="right"
                      sx={{
                        border: 'none'
                      }}
                    >${activeOrder.discount}</TableCell>

                  </TableRow> */}

                  <TableRow>

                    <TableCell

                      align="right"
                      colSpan={3}
                      sx={{
                        border: 'none'
                      }}
                    >
                      <Typography variant='h4'>Total</Typography>
                    </TableCell>
                    <TableCell align="right"
                      sx={{
                        border: 'none'
                      }}
                    >${activeOrder.total}</TableCell>

                  </TableRow>



                </TableBody>




              </Table>


            </TableContainer>


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