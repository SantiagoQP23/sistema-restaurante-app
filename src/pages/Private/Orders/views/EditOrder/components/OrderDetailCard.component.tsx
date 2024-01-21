import { FC, useState } from "react";

import { useSelector } from "react-redux";

import {
  Box,
  IconButton,
  Typography,
  LinearProgress,
  TableCell,
  TableRow,
  Stack,
  Checkbox,
  Chip,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Popover,
  MenuItem,
  FormControlLabel,
} from "@mui/material";

import {
  SaveOutlined,
  DeleteOutline,
  EditOutlined,
  CheckCircle,
  CheckCircleOutline,
  MoreVert,
  Visibility,
} from "@mui/icons-material";
import { IOrderDetail } from "../../../../../../models";

import { UpdateOrderDetailDto } from "../../../dto/update-order-detail.dto";
import { selectOrders } from "../../../../../../redux/slices/orders/orders.slice";
import { statusModalDeleteOrderDetail } from "../../../services/orders.service";
import { styled } from "@mui/material/styles";
import { useUpdateOrderDetail } from "../../../hooks";
import { CounterInput } from "../../../components/CounterInput.component";
import { formatMoney } from "../../../../Common/helpers/format-money.helper";
import NiceModal from "@ebay/nice-modal-react";
import {
  LinearProgressWrapper,
  ModalEditOrderDetail,
} from "../../../components";
import { bindPopover } from "material-ui-popup-state";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";

interface Props {
  detail: IOrderDetail;
}

/**
 * @version 1.0 17-01-2024
 */
export const OrderDetailCard: FC<Props> = ({ detail }) => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "popoverOrderDetail",
  });

  const [quantity, setQuantity] = useState(detail.quantity);

  const handleChangeQuantity = (value: number) => {
    setQuantity(value);
  };

  const { activeOrder } = useSelector(selectOrders);

  const { mutate: update } = useUpdateOrderDetail();

  const [checked, setChecked] = useState(
    detail.qtyDelivered === detail.quantity
  );

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    popupState.close();
    const value = event.target.checked;

    if (value) {
      updateQtyDelivered(detail.quantity);
    } else {
      updateQtyDelivered(0);
    }

    setChecked(event.target.checked);
  };

  const updateQuantity = () => {
    const data: UpdateOrderDetailDto = {
      orderId: activeOrder!.id,
      id: detail.id,
      quantity,
    };

    update(data);
  };

  const updateQtyDelivered = (qtyDelivered: number) => {
    const data: UpdateOrderDetailDto = {
      orderId: activeOrder!.id,
      id: detail!.id,
      qtyDelivered: qtyDelivered,
    };

    update(data);
  };

  const showEditDetailModal = () =>
    NiceModal.show(ModalEditOrderDetail, {
      detail: detail,
      orderId: activeOrder!.id,
    });

  const showDeleteDetailModal = () =>
    statusModalDeleteOrderDetail.setSubject(true, detail, activeOrder!.id);

  const handleEdit = () => {
    popupState.close();
    showEditDetailModal();
  };

  const handleDelete = () => {
    popupState.close();
    showDeleteDetailModal();
  };

  const isDeleteable = detail.qtyDelivered === 0;

  const qtyToDeliver = detail.quantity - detail.qtyDelivered;

  const quantityChanged =
    quantity !== detail.quantity &&
    quantity > 0 &&
    quantity >= detail.qtyDelivered;

  return (
    <>
      <Card>
        <CardHeader
          // avatar={<Typography variant="h6">{detail.quantity}</Typography>}
          title={
            <Box sx={{ display: "flex", alignItems: "center", width: "150px" }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={(detail.qtyDelivered * 100) / detail.quantity}
                  color="success"
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography fontSize="0.7rem" color="text.secondary">
                  {detail.qtyDelivered}
                </Typography>
              </Box>
            </Box>
          }
          subheader={
            <Typography variant="h5" component="div" mt={0.5}>
              {detail.product.name}{" "}
              {detail.productOption && (
                <Chip
                  sx={{ ml: 1 }}
                  label={detail.productOption?.name}
                  size="small"
                />
              )}
            </Typography>
          }
          action={
            <IconButton {...bindTrigger(popupState)}>
              <MoreVert fontSize="small" />
            </IconButton>
          }
        />
        {detail.description && (
          <CardContent>
            <Typography variant="h6" whiteSpace="pre-wrap">
              {detail.description}
            </Typography>
          </CardContent>
        )}
        <CardActions
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex">
            <CounterInput
              value={quantity}
              onChange={handleChangeQuantity}
              min={0.5}
            />
            {quantityChanged && (
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity();
                }}
              >
                <SaveOutlined />
              </IconButton>
            )}
          </Box>
          <Box display="flex" gap={1}>
            <Typography variant="subtitle1" component="div">
              {formatMoney(detail.price)}
            </Typography>
            <Typography variant="h4" component="div">
              {formatMoney(detail.amount)}
            </Typography>
          </Box>
        </CardActions>
      </Card>

      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 140,
            },
          },
        }}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckCircleOutline />}
                checkedIcon={<CheckCircle />}
                checked={checked}
                onChange={handleChangeChecked}
                inputProps={{ "aria-label": "controlled" }}
                color="success"
              />
            }
            label={checked ? "Entregado" : "Entregar"}
          />
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <EditOutlined fontSize="small" sx={{ mr: 2 }} />
          Editar
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={handleDelete}
          disabled={!isDeleteable}
        >
          <DeleteOutline fontSize="small" sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};
