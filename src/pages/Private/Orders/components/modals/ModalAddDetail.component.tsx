import { useState } from "react";

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Typography,
  Box,
  Stack,
} from "@mui/material/";

import { ICreateOrderDetail, IOrder } from "../../../../../models/orders.model";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../../../redux/slices/orders/orders.slice";

import { CreateOrderDetailDto } from "../../dto/create-order-detail.dto";
import { LoadingButton } from "@mui/lab";
import { useCreateOrderDetail } from "../../hooks/useCreateOrderDetail";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CounterInput } from "../CounterInput.component";
import { ProductStatus } from "../../../../../models";
import { Label } from "../../../../../components/ui";
import { useNewOrderStore } from "../../store/newOrderStore";
import NiceModal, { muiDialogV5, useModal } from "@ebay/nice-modal-react";

interface Props {
  detail?: ICreateOrderDetail;
}

/**
 * Modal to add a product to the active order or to the new order
 * @author Santiago Quirumbay
 * @version 1.1 18/12/2023 Adds NiceModal and remove rxjs
 */
export const ModalAddDetail = NiceModal.create<Props>(({ detail }) => {
  const modal = useModal();

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(detail?.quantity || 1);

  const { addDetail, details, updateDetail } = useNewOrderStore(
    (state) => state
  );
  const { activeOrder } = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  const { createOrderDetail, loading } = useCreateOrderDetail();

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const closeModal = () => {
    modal.hide();
    setDescription("");
  };

  const addProductoToOrder = (order: IOrder) => {
    const data: CreateOrderDetailDto = {
      orderId: order.id,
      productId: detail!.product.id,
      price: detail!.product.price,
      quantity,
    };

    if (description) {
      data.description = description;
    }

    createOrderDetail(data);
  };

  const handleCreateDetail = () => {
    if (activeOrder) {
      addProductoToOrder(activeOrder);
    } else {
      const detailExists = details.find(
        (currentDetail) => currentDetail.product.id === detail!.product.id
      );

      if (detailExists) {
        updateDetail({ ...detail!, quantity, description });
      } else {
        addDetail({ ...detail!, quantity, description });
        enqueueSnackbar(`${detail?.product.name} agregado`, {
          variant: "success",
        });
      }
    }

    setDescription("");
    closeModal();
  };

  return (
    <>
      <Dialog {...muiDialogV5(modal)}>
        <DialogContent
          sx={{
            width: 300,
          }}
        >
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle1">
                {detail?.product.category.name}
              </Typography>
              <Typography variant="h4">{detail?.product.name}</Typography>
            </Box>
            <Typography variant="h4">${detail?.product.price}</Typography>

            {detail?.product.description && (
              <Box>
                <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
                  {detail?.product.description}
                </Typography>
              </Box>
            )}

            {detail?.product.status !== ProductStatus.AVAILABLE ? (
              <>
                <Label color="warning">Producto no disponible</Label>
              </>
            ) : (
              <>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  my={2}
                >
                  <CounterInput
                    value={detail?.quantity || 1}
                    onChange={handleQuantityChange}
                  />
                </Stack>

                <FormControl fullWidth>
                  <TextField
                    id="descripcion-pedido"
                    label="Notas"
                    margin="dense"
                    multiline
                    rows={3}
                    defaultValue={description}
                    onBlur={(e) => {
                      console.log(e.target.value);
                      setDescription(e.target.value);
                    }}
                  />
                </FormControl>
              </>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={closeModal}>Cancelar</Button>

          {detail?.product.status === ProductStatus.AVAILABLE && (
            <LoadingButton
              onClick={handleCreateDetail}
              variant="contained"
              loading={loading}
              startIcon={<ShoppingCartIcon />}
            >
              Añadir
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
});
