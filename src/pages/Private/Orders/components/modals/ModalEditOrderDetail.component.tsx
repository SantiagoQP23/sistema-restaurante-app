import { useState } from "react";

import { IOrderDetail, ProductOption } from "../../../../../models";

import { statusModalDeleteOrderDetail } from "../../services/orders.service";

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
  Chip,
} from "@mui/material";

import { useCounter } from "../../hooks";
import { Close, Delete, AttachMoney, Save } from "@mui/icons-material";
import { UpdateOrderDetailDto } from "../../dto/update-order-detail.dto";
import { LoadingButton } from "@mui/lab";
import { useDeleteOrderDetail } from "../../hooks/useDeleteOrderDetail";
import { useUpdateOrderDetail } from "../../hooks/useUpdateOrderDetail";
import { CounterInput } from "../CounterInput.component";
import NiceModal, { muiDialogV5, useModal } from "@ebay/nice-modal-react";
import { formatMoney } from "../../../Common/helpers/format-money.helper";
import { Scrollbar } from "../../../components";

interface Props {
  detail: IOrderDetail;
  orderId: string;
}

/**
 * Modal to edit a product to the active order
 * @version 1.1 20/12/2023 Adds product options chip and NiceModal
 */
export const ModalEditOrderDetail = NiceModal.create<Props>(
  ({ detail, orderId }) => {
    // const [detail, setDetail] = useState<IOrderDetail>();
    const modal = useModal();

    const availableOptions = detail.product?.options
      ? detail.product?.options.filter((option) => option.isAvailable)
      : [];

    const [quantity, setQuantity] = useState(detail.quantity);
    const [qtyDelivered, setQtyDelivered] = useState(detail.qtyDelivered);

    // form
    const [description, setDescription] = useState(detail.description);
    const [price, setPrice] = useState(detail.price);

    const [selectedOption, setSelectedOption] = useState<
      ProductOption | undefined
    >(detail.productOption ? detail.productOption : undefined);

    const { loading: loadingDelete } = useDeleteOrderDetail();

    const qtyCounter = useCounter(0, 1, 100, detail?.qtyDelivered);

    const qtyDeliveredCounter = useCounter(0, 1, detail?.quantity);

    const { update, loading } = useUpdateOrderDetail();

    const updateDetail = () => {
      const data: UpdateOrderDetailDto = {
        orderId,
        id: detail!.id,
        qtyDelivered,
        quantity,
        description,
        price,
      };

      if (selectedOption) {
        data.productOptionId = selectedOption.id;
      }

      update(data);

      closeModal();
    };

    const closeModal = () => {
      modal.hide();
    };

    const showModalDeleteDetail = () => {
      statusModalDeleteOrderDetail.setSubject(true, detail!, orderId!);
      closeModal();
    };

    const handleChangeQuantity = (value: number) => {
      setQuantity(value);
    };

    // useEffect(() => {
    //   subscription$.subscribe((data) => {
    //     // setDetail(data.detalle);
    //     // setOpen(data.value);
    //     setOrderId(data.orderId);
    //     setQuantity(data.detalle.quantity);
    //     setQtyDelivered(data.detalle.qtyDelivered);
    //     qtyDeliveredCounter.setCounter(data.detalle.qtyDelivered);

    //     qtyCounter.setCounter(data.detalle.quantity);
    //     setDescription(data.detalle.description);
    //     setPrice(data.detalle.price);
    //   });
    // }, []);

    return (
      <Dialog {...muiDialogV5(modal)}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <b>{detail?.product.name}</b>

            {detail?.productOption && (
              <Chip
                sx={{ ml: 1 }}
                label={`${detail?.productOption?.name} `}
                size="small"
              />
            )}
          </Box>

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
              {availableOptions.length > 0 && (
                <Scrollbar autoHeight height="auto">
                  <Box
                    sx={{
                      // overflowX: "auto",
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    {availableOptions.map((option) => (
                      <Chip
                        key={option.id}
                        label={`${option?.name} ${formatMoney(option?.price)}`}
                        variant={
                          option.id === selectedOption?.id
                            ? "filled"
                            : "outlined"
                        }
                        onClick={() => setSelectedOption(option)}
                        color={
                          option.id === selectedOption?.id
                            ? "primary"
                            : "default"
                        }
                      />
                    ))}
                  </Box>
                </Scrollbar>
              )}
            </Grid>
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
              onClick={showModalDeleteDetail}
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
  }
);
