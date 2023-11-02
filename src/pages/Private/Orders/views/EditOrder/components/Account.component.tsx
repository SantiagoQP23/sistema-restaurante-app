import {
  Card,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Button,
  CardActions,
} from "@mui/material";

import {
  OrderDetailPayable as IOrderDetailPayable,
  useInvoiceStore,
} from "../../../store/invoiceStore";

import { FC, useEffect, useState } from "react";
import { IOrder } from "../../../../../../models";
import { CounterInput } from "../../../components";
import { CardHeader } from "@mui/material/";
import {
  Add,
  ArrowBackIos,
  ArrowForward,
  ArrowRight,
  Clear,
  DoneAll,
  Send,
} from "@mui/icons-material";
import { Label } from "../../../../../../components/ui";
import { formatMoney } from "../../../../Common/helpers/format-money.helper";
import {
  NewDraftInvoice,
  OrderDetailPayable,
  DraftInvoiceSelect,
  DraftInvoice,
} from "./";

interface Props {
  order: IOrder;
}

export const Account: FC<Props> = ({ order }) => {
  const {
    payableDetails,

    updateDetail,

    handleBackStep,
    handleNextStep,
    setDiscount,

    invoices,
    addInvoice,
    addDetailsToInvoice,
    setPayableDetails,
    activeInvoice,
    reset,
  } = useInvoiceStore((state) => state);

  const [selectedDetails, setSelectedDetails] = useState<string[]>(
    payableDetails.map((detail) => detail.id)
  );
  const [selectAll, setSelectAll] = useState(false);

  const handleUpdateDetail = (detailId: string, qtyToPay: number) => {
    const orderDetail = payableDetails.find(
      (detail) => detail.id === detailId
    )!;
    updateDetail({ ...orderDetail, qtyToPay });
  };

  const handleChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (isNaN(value)) setDiscount(0);

    if (value < 0) {
      setDiscount(0);
      return;
    }

    if (value > order!.total) {
      return;
    }

    setDiscount(value);
  };

  const handleDetailToggle = (detailId: string) => () => {
    // const selectedIndex = selectedDetails.indexOf(detailId);
    // let newSelectedDetails = [];
    // if (selectedIndex === -1) {
    //   // Agregar detalle seleccionado
    //   newSelectedDetails = [...selectedDetails, detailId];
    //   const orderDetail = order.details.find(
    //     (detail) => detail.id === detailId
    //   )!;
    //   addDetail({
    //     orderDetail,
    //     quantity: orderDetail.quantity - orderDetail.qtyPaid,
    //   });
    // } else {
    //   // Eliminar detalle seleccionado
    //   newSelectedDetails = selectedDetails.filter((id) => id !== detailId);
    //   removeDetail(detailId);
    // }
    // setSelectedDetails(newSelectedDetails);
  };

  const handleSelectAll = (all: boolean) => {
    // resetDetails();
    // console.log({ all });
    // const allDetails = order.details
    //   .filter((detail) => detail.qtyPaid !== detail.quantity)
    //   .map((detail) => detail.id);
    // allDetails.forEach((detailId) => {
    //   const orderDetail = order.details.find(
    //     (detail) => detail.id === detailId
    //   )!;
    //   addDetail({
    //     orderDetail,
    //     quantity: all ? orderDetail.quantity - orderDetail.qtyPaid : 0,
    //     qtyPaid: orderDetail.qtyPaid,
    //   });
    // });
    // setSelectedDetails(allDetails);
  };

  const onLoadPayableDetails = () => {
    const details: IOrderDetailPayable[] = order.details.map((detail) => ({
      ...detail,
      qtyToPay: 0,
      qtyInAccounts: 0,
    }));

    setPayableDetails(details);
  };

  const handleUpdateAll = (all: boolean) => {
    console.log({ all });

    const allDetails = order.details
      .filter((detail) => detail.qtyPaid !== detail.quantity)
      .map((detail) => detail.id);

    allDetails.forEach((detailId) => {
      const orderDetail = order.details.find(
        (detail) => detail.id === detailId
      )!;

      handleUpdateDetail(
        detailId,
        all ? orderDetail.quantity - orderDetail.qtyPaid : 0
      );
    });

    setSelectedDetails(allDetails);
  };

  const BtnNext = () => (
    <Button
      color="primary"
      onClick={handleNextStep}
      endIcon={<ArrowRight fontSize="small" />}
      size="small"
      variant="contained"
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

  const handleAddToInvoice = () => {
    console.log({ payableDetails });

    addDetailsToInvoice(payableDetails.filter((detail) => detail.qtyToPay > 0));
  };

  useEffect(() => {
    handleSelectAll(true);
  }, []);

  useEffect(() => {
    onLoadPayableDetails();
  }, [order]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Productos por pagar"
              action={
                <>
                  <Typography>
                    Total: <b>{formatMoney(order.total)}</b>
                  </Typography>
                </>
              }
            />

            <TableContainer>
              <Table
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                <TableHead>
                  <TableRow>
                    {!selectAll && (
                      <TableCell padding="checkbox" align="center">
                        Cantidad
                      </TableCell>
                    )}
                    <TableCell>Producto</TableCell>
                    <TableCell>Precio</TableCell>

                    <TableCell>Subtotal</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {payableDetails
                    .filter((detail) => detail.quantity !== detail.qtyPaid)
                    .map((detail) => (
                      <OrderDetailPayable
                        key={detail.id}
                        detail={detail}
                        qtyToPay={detail.qtyToPay}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack direction="column" p={1} spacing={1}>
              <DraftInvoiceSelect />

              <Stack direction="row" spacing={1} justifyItems="right">
                <Button
                  size="small"
                  onClick={() => handleSelectAll(true)}
                  variant="outlined"
                  endIcon={<DoneAll />}
                  disabled={!activeInvoice}
                >
                  Añadir todo
                </Button>
                <Button
                  size="small"
                  onClick={handleAddToInvoice}
                  variant="contained"
                  endIcon={<ArrowForward />}
                  disabled={!activeInvoice}
                >
                  Añadir{" "}
                </Button>
              </Stack>
            </Stack>
          </Card>

          <Stack spacing={2} mt={2}>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <BtnBack />

              <Button
                color="error"
                variant="outlined"
                size="small"
                startIcon={<Clear />}
                onClick={reset}
              >
                Limpiar
              </Button>

              {/* <BtnNext /> */}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={1}>
            {order.invoices.map((invoice) => (
              <Grid item xs={12} key={invoice.id}>
                <DraftInvoice invoice={invoice} />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h4"> Cuentas </Typography>
                  <Typography variant="subtitle2">
                    Total: {invoices.length}
                  </Typography>
                </Box>
                <Button startIcon={<Add />} size="small" onClick={addInvoice}>
                  Añadir cuenta
                </Button>
              </Box>
            </Grid>
            {
              //TODO: mostrar las cuentas en estado borrador
            }

            {invoices.map((invoice, index) => (
              <Grid item xs={12} key={index}>
                <NewDraftInvoice invoice={invoice} index={index} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
