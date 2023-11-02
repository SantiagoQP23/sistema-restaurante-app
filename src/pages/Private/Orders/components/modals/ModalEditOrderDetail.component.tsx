import { useState, useEffect } from "react";

import { IOrderDetail } from "../../../../../models";

import {
  statusModalDeleteOrderDetail,
  statusModalEditOrderDetail,
} from "../../services/orders.service";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  DialogActions,
  TextField,
  Grid,
  InputAdornment,
} from "@mui/material";

import { useCounter } from "../../hooks";
import { Close, Delete, AttachMoney, Save } from "@mui/icons-material";
import { UpdateOrderDetailDto } from "../../dto/update-order-detail.dto";
import { LoadingButton } from "@mui/lab";
import { useDeleteOrderDetail } from "../../hooks/useDeleteOrderDetail";
import { useUpdateOrderDetail } from "../../hooks/useUpdateOrderDetail";
import { CounterInput } from "../CounterInput.component";

export const ModalEditOrderDetail = () => {
  const [detail, setDetail] = useState<IOrderDetail>();

  const [orderId, setOrderId] = useState<string>();

  const [open, setOpen] = useState(false);

  const [quantity, setQuantity] = useState(detail?.quantity || 1);
  const [qtyDelivered, setQtyDelivered] = useState(detail?.qtyDelivered || 1);

  // form
  const [description, setDescription] = useState(detail?.description || "");
  const [price, setPrice] = useState(detail?.price || 0);

  const { loading: loadingDelete } = useDeleteOrderDetail();

  const qtyCounter = useCounter(0, 1, 100, detail?.qtyDelivered);

  const qtyDeliveredCounter = useCounter(0, 1, detail?.quantity);

  const { update, loading } = useUpdateOrderDetail();

  const subscription$ = statusModalEditOrderDetail.getSubject();

  const updateDetail = () => {
    const data: UpdateOrderDetailDto = {
      orderId: orderId!,
      id: detail!.id,
      qtyDelivered,
      quantity,
      description,
      price,
    };

    update(data);

    closeModal();
  };

  const closeModal = () => {
    setOpen(false);
  };

  const deleteDetail = () => {
    statusModalDeleteOrderDetail.setSubject(true, detail!, orderId!);
    closeModal();
  };

  const handleChangeQuantity = (value: number) => {
    setQuantity(value);
  };

  useEffect(() => {
    subscription$.subscribe((data) => {
      setDetail(data.detalle);
      setOpen(data.value);
      setOrderId(data.orderId);
      setQuantity(data.detalle.quantity);
      setQtyDelivered(data.detalle.qtyDelivered);
      qtyDeliveredCounter.setCounter(data.detalle.qtyDelivered);

      qtyCounter.setCounter(data.detalle.quantity);
      setDescription(data.detalle.description);
      setPrice(data.detalle.price);
    });
  }, []);

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <b>{detail?.product.name}</b>

        <IconButton onClick={closeModal}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          width: 300,
        }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              whiteSpace="break-spaces"
            >
              {detail?.product.description}
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="right">
            <CounterInput
              value={quantity}
              onChange={handleChangeQuantity}
              min={detail?.qtyDelivered}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="descripcion-pedido"
              label="Notas"
              margin="dense"
              multiline
              rows={4}
              defaultValue={detail?.description}
              fullWidth
              onBlur={(e) => {
                console.log(e.target.value);
                setDescription(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="precio-producto"
              label="Precio"
              margin="dense"
              type="number"
              defaultValue={detail?.price}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              onBlur={(e) => {
                console.log(e.target.value);
                setPrice(Number(e.target.value));
              }}
              size="small"
              inputProps={{
                min: 0,

                step: 0.25,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              Cantidad entregada
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="right"
              mt={1}
            >
              <CounterInput
                value={qtyDelivered}
                onChange={setQtyDelivered}
                min={0}
                max={detail?.quantity}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="right"
            mt={1}
          ></Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent:
            (detail?.qtyDelivered || 0) >= 1 ? "right" : "space-between",
          gap: 1,
          px: 2,
        }}
      >
        {detail?.qtyDelivered === 0 && (
          <LoadingButton
            color="error"
            // startIcon={<DeleteOutline />}

            onClick={deleteDetail}
            loading={loadingDelete}
            variant="text"
          >
            <Delete />
          </LoadingButton>
        )}

        <LoadingButton
          variant="contained"
          onClick={updateDetail}
          loading={loading}
          startIcon={<Save />}
        >
          Actualizar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
