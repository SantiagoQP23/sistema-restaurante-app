import { IOrder } from "../../../../../../models";
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { pedidoStart } from "../../../../../../redux/slices/orders/orders.thunks";
import { statusModalAddOrder } from "../../../services/orders.service";
import { useModal } from "../../../../../../hooks";
import {
  ArrowBack,
  ArrowBackIos,
  Close,
  Edit,
  Kitchen,
  ListAlt,
  Print,
  SoupKitchen,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { generateOrderPdf } from "../../../helpers/pdf-orders";

interface Props {}

export const ModalAddOrder: FC<Props> = ({}) => {
  const { handleClose, handleOpen, isOpen, setOpen } = useModal();

  const [order, setOrder] = useState<IOrder>();

  const suscription$ = statusModalAddOrder.getSubject();

  const navigate = useNavigate();

  const openPDF = async () => {
    if (order) {
      const pdf = await generateOrderPdf(order);
      pdf.open();
    }
  };

  const navigateToOrders = () => {
    navigate("/orders");
  };

  useEffect(() => {
    suscription$.subscribe((resp) => {
      setOpen(resp.value);

      setOrder(resp.order);

      // console.log('resp', resp)
      // if (resp) {
      //   closeModal();
      // }
    });

    return () => {};
  }, []);

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" mb={5}>
            Has añadido un nuevo pedido
          </Typography>

          <Typography variant="h4" mb={3}>
            Pedido N° {order?.num}
          </Typography>
          <Stack spacing={1} direction="row" justifyContent='center'>
            <Button variant="outlined" onClick={() => navigate("/orders")}>
              <ArrowBack />
            </Button>
            <Button variant="outlined" onClick={openPDF}>
              <Print />
            </Button>
            <Button variant="outlined" onClick={() => navigate("/orders/actives")}>
              <SoupKitchen />
            </Button>

            <Button variant="outlined" onClick={() => navigate(`/orders/list/edit/${order?.id}`)}>
              <Edit />
            </Button>
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
          }}
        ></DialogActions>
      </Dialog>
    </>
  );
};
