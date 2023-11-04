import { FC, useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Material UI
import {
  IconButton,
  Grid,
  Container,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Button,
  Stack,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";

import { selectOrders, setActiveOrder } from "../../../../../redux";

import { OrderActionType, OrderContext } from "../../context/Order.context";

import { OrderSummary, OrderDetails } from "./components";
import { TitlePage } from "../../../components/TitlePage.component";
import { useOrder } from "../../hooks";
import { PayOrder } from "./components/PayOrder.component";
import { useInvoiceStore } from "../../store/invoiceStore";
import { Account } from "./components/Account.component";
import {
  ArrowRight,
  ArrowBackIos,
  PointOfSaleOutlined,
  Print,
  DeleteOutline,
  RemoveCircle,
  ChevronLeft,
  Clear,
} from "@mui/icons-material";
import { DrawerInvoice } from "./components/DrawerInvoice.component";
import { useDrawerInvoiceStore } from "../../store/drawerInvoiceStore";
import {
  statusModalDeleteOrder,
  statusModalPayOrder,
} from "../../services/orders.service";

import { OrderStatus } from "../../../../../models";
import { ModalDeleteInvoice } from "../../components/modals/ModalDeleteInvoice.component";

import { generateOrderPdf } from "../../helpers/pdf-orders";
import { LabelStatusOrder } from "../OrdersList/components/LabelStatusOrder.component";
import { LabelStatusPaid } from "../../components/LabelStatusPaid.component";
import { format } from "date-fns";

export const EditOrder = () => {
  const navigate = useNavigate();

  const { open: openDrawer, handleCloseDrawer } = useDrawerInvoiceStore(
    (state) => state
  );

  const { orderId } = useParams();

  if (!orderId) navigate("/orders");

  const {
    step: activeStep,
    setStep: changeStep,
    handleBackStep,
    handleNextStep,
    resetDetails,
    reset,
  } = useInvoiceStore((state) => state);

  const { dispatch } = useContext(OrderContext);

  const { activeOrder } = useSelector(selectOrders);

  let orderDelivered = false;

  const { data, isLoading } = useOrder(orderId!);

  const handleCloseOrder = () => {
    if (activeOrder) statusModalPayOrder.setSubject(true, activeOrder);
  };

  const openPDF = async () => {
    if (activeOrder) {
      const pdf = await generateOrderPdf(activeOrder);
      pdf.open();
    }
  };

  const BtnNext = () => (
    <Button
      color="inherit"
      onClick={handleNextStep}
      endIcon={<ArrowRight fontSize="small" />}
      size="small"
    >
      Siguiente
    </Button>
  );

  const BtnBack = () => (
    <Button
      color="inherit"
      onClick={handleBackStep}
      startIcon={<ArrowBackIos fontSize="small" />}
      size="small"
    >
      Atras
    </Button>
  );

  const eliminarPedido = () => {
    if (activeOrder) statusModalDeleteOrder.setSubject(true, activeOrder);
  };

  orderDelivered = activeOrder?.details?.find(
    (detail) => detail.qtyDelivered >= 1
  )
    ? true
    : false;

  useEffect(() => {
    changeStep(0);
    return () => {
      dispatch({ type: OrderActionType.RESET });
      setActiveOrder(null);
      reset();
    };
  }, []);

  if (!activeOrder) return <></>;

  return (
    <>
      <DrawerInvoice open={openDrawer} handleClose={handleCloseDrawer} />
      <ModalDeleteInvoice />

      <Container maxWidth="xl">
        <Stack
          spacing={2}
          my={2}
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "normal", sm: "space-between" }}
          alignItems={{ sm: "center" }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton size="small" onClick={() => navigate("/orders")}>
              <ChevronLeft />
            </IconButton>
            <Stack direction="column">
              <Box display="flex" gap={1} alignItems="end">
                <Typography variant="h3">
                  {`Pedido #${activeOrder.num}`}
                </Typography>
              </Box>
              <Box display="flex" gap={1} alignItems="end">
                <LabelStatusOrder status={activeOrder.status} />

                <LabelStatusPaid isPaid={activeOrder.isPaid} />
              </Box>
            </Stack>
          </Box>

          {activeStep < 1 ? (
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              {activeOrder.status === OrderStatus.PENDING &&
                !activeOrder.isPaid && (
                  <Tooltip
                    title={
                      !orderDelivered
                        ? "Eliminar pedido"
                        : "Este pedido no se puede eliminar porque ya tiene productos entregados"
                    }
                  >
                    <span>
                      <Button
                        startIcon={<DeleteOutline />}
                        color="error"
                        onClick={eliminarPedido}
                        disabled={orderDelivered}
                        variant="outlined"
                        size="small"
                      >
                        Eliminar
                      </Button>
                    </span>
                  </Tooltip>
                )}

              <Button
                startIcon={<Print />}
                variant="outlined"
                size="small"
                onClick={openPDF}
              >
                Imprimir
              </Button>

              {!activeOrder.isPaid && (
                <Button
                  startIcon={<PointOfSaleOutlined />}
                  variant="contained"
                  size="small"
                  onClick={() => changeStep(1)}
                >
                  Cobrar
                </Button>
              )}
              {activeOrder.isPaid &&
                activeOrder.status === OrderStatus.DELIVERED &&
                !activeOrder.isClosed && (
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<RemoveCircle />}
                    onClick={handleCloseOrder}
                  >
                    Cerrar pedido
                  </Button>
                )}
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              {/* <BtnBack /> */}
            </Stack>
          )}
        </Stack>

        {isLoading ? (
          <>
            <CircularProgress />
          </>
        ) : (
          <>
            {
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  background: "transparent",
                }}
              >
                <Step>
                  <StepLabel>Carrito</StepLabel>
                </Step>

                <Step>
                  <StepLabel>Cuenta</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Pago</StepLabel>
                </Step>
              </Stepper>
            }

            {activeStep === 0 && <OrderSummary order={activeOrder} />}

            {activeStep === 1 && <Account order={activeOrder} />}

            {activeStep === 2 && (
              <>
                <PayOrder order={activeOrder} />

                <Stack direction="row">
                  <BtnBack />
                </Stack>
              </>
            )}

            {/* <Grid item xs={12} md={4}>
              </Grid> */}
          </>
        )}
      </Container>
    </>
  );
};
