import { FC, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Material UI
import { Grid, Container, CircularProgress, Stepper, Step, StepLabel, Card, CardContent, Button, Stack, Tooltip, IconButton } from '@mui/material';

import { selectOrders, setActiveOrder } from '../../../../../redux';

import { OrderActionType, OrderContext } from '../../context/Order.context';

import { OrderSummary, OrderDetails } from './components';
import { TitlePage } from '../../../components/TitlePage.component';
import { useOrder } from '../../hooks';
import { PayOrder } from './components/PayOrder.component';
import { useInvoiceStore } from '../../store/invoiceStore';
import { Account } from './components/Account.component';
import { ArrowRight, ArrowBackIos, PointOfSaleOutlined, Print, DeleteOutline, RemoveCircle, DownloadOutlined } from '@mui/icons-material';
import { DrawerInvoice } from './components/DrawerInvoice.component';
import { useDrawerInvoiceStore } from '../../store/drawerInvoiceStore';
import { statusModalDeleteOrder, statusModalPayOrder } from '../../services/orders.service';
import { useModal } from '../../../../../hooks';
import { ModalEditOrder } from './components/ModalEditOrder.component';
import { OrderStatus } from '../../../../../models';
import { ModalDeleteInvoice } from '../../components/modals/ModalDeleteInvoice.component';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PdfReceiptOrder } from '../OrderReceipt/pdf/PdfReceiptOrder.component';
import { generateOrderPdf } from '../../helpers/pdf-orders';


export const EditOrder = () => {

  const navigate = useNavigate();


  const { open: openDrawer, handleCloseDrawer } = useDrawerInvoiceStore(state => state);

  const { orderId } = useParams();

  if (!orderId) navigate('/orders');

  const { step: activeStep, setStep: changeStep, handleBackStep, handleNextStep, resetDetails, reset } = useInvoiceStore(state => state);

  const { dispatch } = useContext(OrderContext);


  const [orderDelivered, setOrderDelivered] = useState<boolean>(false)



  const { activeOrder } = useSelector(selectOrders);



  const { data, isLoading } = useOrder(orderId!);

  const handleCloseOrder = () => {
    if (activeOrder)
      statusModalPayOrder.setSubject(true, activeOrder);
  }

  const openPDF = async  () => {
    if(activeOrder){
      const pdf = await generateOrderPdf(activeOrder);
      pdf.open();
    }
  }

  const BtnNext = () => (
    <Button
      color='inherit'
      onClick={handleNextStep}
      endIcon={<ArrowRight fontSize='small' />}
      size='small'
    >
      Siguiente
    </Button>
  )

  const BtnBack = () => (
    <Button
      color='inherit'
      onClick={handleBackStep}
      startIcon={<ArrowBackIos fontSize='small' />}
      size='small'

    >
      Atras
    </Button>
  )


  const eliminarPedido = () => {

    if (activeOrder)
      statusModalDeleteOrder.setSubject(true, activeOrder)
  }



  useEffect(() => {
    if (activeOrder) {
      setOrderDelivered(!!(activeOrder.details?.find(detail => detail.qtyDelivered > 0)))
    }
  }, [activeOrder])


  useEffect(() => {

    changeStep(0);
    return () => {
      dispatch({ type: OrderActionType.RESET })
      setActiveOrder(null);
      reset();

    }
  }, [])








  if (!activeOrder)
    return <></>;


  return (
    <>

      <DrawerInvoice open={openDrawer} handleClose={handleCloseDrawer} />
      <ModalDeleteInvoice />

      <Container maxWidth='xl'>

        <TitlePage
          title='Editar pedido'

          action={
            <>
              <Stack direction='row' spacing={1}>
                {
                  !(activeOrder.status === OrderStatus.PENDING) && !activeOrder.isPaid && (
                    <Tooltip
                      title={!orderDelivered
                        ? 'Eliminar pedido' :
                        'Este pedido no se puede eliminar porque ya tiene productos entregados'}
                    >
                      <span>

                        <Button
                          startIcon={<DeleteOutline />}
                          color='error'
                          onClick={eliminarPedido}
                          disabled={orderDelivered}
                          variant='outlined'
                          size='small'

                        >
                          Eliminar
                        </Button>
                      </span>
                    </Tooltip>
                  )
                }
{/* 
                <PDFDownloadLink
                  document={<PdfReceiptOrder order={activeOrder!} />}
                  fileName={'pedido-' + activeOrder!.id}
                >
                  <IconButton>
                    <DownloadOutlined />
                  </IconButton>




                </PDFDownloadLink> */}

                <Button
                  startIcon={<Print />}
                  variant='outlined'
                  size='small'
                  onClick={openPDF}
                >
                  Imprimir
                </Button>

                {

                  !activeOrder.isPaid && (

                    <Button
                      startIcon={<PointOfSaleOutlined />}
                      variant='contained'
                      size='small'
                      onClick={() => changeStep(1)}
                    >
                      Cobrar

                    </Button>
                  )

                }
                {
                  activeOrder.isPaid && activeOrder.status === OrderStatus.DELIVERED && !activeOrder.isClosed && (
                    <Button
                      variant='contained'
                      size='small'
                      startIcon={<RemoveCircle />}
                      onClick={handleCloseOrder}
                    >
                      Cerrar pedido
                    </Button>
                  )
                }





              </Stack>
            </>

          }
        />

        {
          isLoading
            ?
            <>
              <CircularProgress />
            </>
            :

            <>

              <Grid
                spacing={2}
                container

              >

                <Grid item xs={12} md={8}>

                  <Stepper activeStep={activeStep} alternativeLabel
                    sx={{
                      background: 'transparent'
                    }}
                  >
                    <Step>
                      <StepLabel>Carrito</StepLabel>
                    </Step>

                    <Step>
                      <StepLabel>Cuenta</StepLabel>




                      {
                        //TODO productos y resumen de cuenta
                      }

                    </Step>
                    <Step>
                      <StepLabel>Pago</StepLabel>

                    </Step>


                  </Stepper>

                  {
                    activeStep === 0
                    &&
                    <>
                      <OrderDetails order={activeOrder} />
                    </>


                  }

                  {
                    activeStep === 1 && <Account order={activeOrder} />
                  }

                  {

                    activeStep === 2 && <>
                      < PayOrder order={activeOrder} />

                      <Stack direction='row'>
                        <BtnBack />
                      </Stack>

                    </>
                  }


                </Grid>

                <Grid item xs={12} md={4}>
                  <OrderSummary order={activeOrder} />
                </Grid>

                <Grid item xs={12} md={8}>


                </Grid>
              </Grid>
            </>

        }

      </Container>

    </>
  )
}

