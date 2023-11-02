import { FC, useState, useEffect } from "react";

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
import { sharingInformationService } from "../../services/sharing-information.service";
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

interface Props {}

export const ModalAddDetail: FC<Props> = () => {
  const [detail, setDetail] = useState<ICreateOrderDetail>();
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(detail?.quantity || 1);
  const [open, setOpen] = useState(false);

  const { addDetail, details, updateDetail } = useNewOrderStore(
    (state) => state
  );
  const { activeOrder } = useSelector(selectOrders);

  const subscription$ = sharingInformationService.getSubject();

  const { enqueueSnackbar } = useSnackbar();

  const { createOrderDetail, loading } = useCreateOrderDetail();

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
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
      // dispatch({
      //   type: OrderActionType.ADD_DETAIL,
      //   payload: { ...detail!, quantity, description },
      // });

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

    // updateDetail({...detail!, description})

    setDescription("");
    setOpen(false);
  };

  useEffect(() => {
    subscription$.subscribe((data) => {
      const { value, detalle } = data;

      const detail = details.find(
        (detail) => detail.product.id === detalle.product.id
      );

      if (detail) {
        setQuantity(detail.quantity);
        setDetail(detail);
        setDescription(detail.description || "");
      } else {
        setDetail(detalle);
        setDescription(data.detalle?.description || "");
      }

      setOpen(!!value);
      // setCounter(data.detalle?.quantity || 1);
    });
  }, [detail]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setDescription("");
        }}
      >
        {/* <DialogTitle>Añadir Producto</DialogTitle> */}

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
                {/* <Typography variant="subtitle1" >Descripción</Typography> */}
                <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
                  {detail?.product.description}
                </Typography>
              </Box>
            )}

            {/* <Divider /> */}

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
                  {/* <Typography variant="h5" >Cantidad</Typography> */}

                  <CounterInput
                    value={detail?.quantity || 1}
                    onChange={handleQuantityChange}
                  />
                  {/* <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography> */}
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
          <Button
            onClick={() => {
              setOpen(false);
              setDescription("");
            }}
          >
            Cancelar
          </Button>

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
};
