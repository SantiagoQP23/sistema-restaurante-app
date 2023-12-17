import {
  Card,
  FormControlLabel,
  Checkbox,
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
  TextField,
  InputAdornment,
} from "@mui/material";
import { useInvoiceStore } from "../../../store/invoiceStore";
import { FC, useEffect, useState } from "react";
import { IOrder } from "../../../../../../models";
import { CounterInput } from "../../../components";
import { CardHeader } from "@mui/material/";
import {
  ArrowBackIos,
  ArrowRight,
  AttachMoney,
} from "@mui/icons-material";
import { Label } from "../../../../../../components/ui";
import { formatMoney } from "../../../../Common/helpers/format-money.helper";

interface Props {
  order: IOrder;
}

export const Account: FC<Props> = ({ order }) => {
  const {
    details,
    addDetail,
    updateDetail,
    removeDetail,
    resetDetails,
    discount,
    handleBackStep,
    handleNextStep,
    setDiscount,
    amount,
    total,
  } = useInvoiceStore((state) => state);

  const [selectedDetails, setSelectedDetails] = useState<string[]>(
    details.map((detail) => detail.orderDetail.id)
  );
  const [selectAll, setSelectAll] = useState(true);

  const handleUpdateDetail = (detailId: string, quantity: number) => {
    const orderDetail = order.details.find((detail) => detail.id === detailId)!;
    updateDetail({ orderDetail, quantity });
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
    const selectedIndex = selectedDetails.indexOf(detailId);
    let newSelectedDetails = [];

    if (selectedIndex === -1) {
      // Agregar detalle seleccionado
      newSelectedDetails = [...selectedDetails, detailId];

      const orderDetail = order.details.find(
        (detail) => detail.id === detailId
      )!;

      addDetail({
        orderDetail,
        quantity: orderDetail.quantity - orderDetail.qtyPaid,
      });
    } else {
      // Eliminar detalle seleccionado
      newSelectedDetails = selectedDetails.filter((id) => id !== detailId);

      removeDetail(detailId);
    }

    setSelectedDetails(newSelectedDetails);
  };

  const handleSelectAll = (all: boolean) => {
    resetDetails();

    console.log({ all });

    const allDetails = order.details
      .filter((detail) => detail.qtyPaid !== detail.quantity)
      .map((detail) => detail.id);

    allDetails.forEach((detailId) => {
      const orderDetail = order.details.find(
        (detail) => detail.id === detailId
      )!;

      addDetail({
        orderDetail,
        quantity: all ? orderDetail.quantity - orderDetail.qtyPaid : 0,
      });
    });

    setSelectedDetails(allDetails);

    console.log({ details });
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

    console.log({ details });
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

   useEffect(() => {
     handleSelectAll(true);
   }, []);

  return (
    <>
      <Stack spacing={2}>
        <Card>
          <CardHeader
            title="Detalle de la orden"
            action={
              <>
                <FormControlLabel
                  label="Todo"
                  control={
                    <Checkbox
                      checked={selectAll}
                      onChange={(e) => {
                        setSelectAll(e.target.checked);
                        handleUpdateAll(e.target.checked);
                      }}
                    />
                  }
                  // labelPlacement='start'
                />
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
                {details.map((detail, index) => (
                  <TableRow key={index}>
                    {!selectAll && (
                      <TableCell>
                        <CounterInput
                          value={detail.quantity}
                          onChange={(value: number) => {
                            handleUpdateDetail(detail.orderDetail.id, value);
                          }}
                          max={
                            detail.orderDetail.quantity -
                            detail.orderDetail.qtyPaid
                          }
                          min={0}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <Label color="warning">
                        {detail.orderDetail.quantity -
                          detail.orderDetail.qtyPaid}
                      </Label>{" "}
                      <b>{detail.orderDetail.product.name}</b> de{" "}
                      <b>{detail.orderDetail.quantity}</b>
                    </TableCell>
                    <TableCell>
                      {formatMoney(detail.orderDetail.price)}
                    </TableCell>
                    <TableCell>
                      {formatMoney(detail.orderDetail.price * detail.quantity)}
                    </TableCell>
                    {/* <TableCell align='center'>
                            <IconButton
                              color='primary'
                              onClick={() => { }}
                            >
                              <DetailsOutlined />
                            </IconButton>
                          </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {details.length === 0 ? (
              <Typography
                variant="h6"
                color="textSecondary"
                textAlign="center"
                p={2}
              >
                No hay detalles
              </Typography>
            ) : (
              <Grid container spacing={3} p={2} width="auto">
                <Grid item xs={8}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    textAlign="right"
                  >
                    Subtotal
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6" textAlign="right">
                    {formatMoney(amount)}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    textAlign="right"
                  >
                    Descuento
                  </Typography>
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="right">
                  <TextField
                    id="precio-producto"
                    type="number"
                    value={discount || ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setDiscount(Number(e.target.value));
                    }}
                    size="small"
                    inputProps={{
                      min: 0,

                      step: 0.25,
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    textAlign="right"
                  >
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" textAlign="right">
                    {formatMoney(amount - discount)}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </TableContainer>
        </Card>

        <Stack direction="row" spacing={1} justifyContent="space-between">
          <BtnBack />
          <BtnNext />
        </Stack>
      </Stack>
    </>
  );
};
