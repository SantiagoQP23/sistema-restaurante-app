import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Close, Delete, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Bill } from "../../../../models/bill.model";
import { BillDetailsTable } from "./BillDetailsTable.component";
import { Label } from "../../../../components/ui";
import { formatMoney } from "../../Common/helpers/format-money.helper";
import { useNavigate } from "react-router-dom";
import { DeleteBillModal } from "./DeleteBillModal.component";

interface Props {
  bill: Bill;
}

export const DrawerBill = NiceModal.create<Props>(({ bill }) => {
  const modal = useModal();
  const navigate = useNavigate();

  const closeDrawer = () => {
    modal.hide();
  };

  const showDeleteBillModal = () => {
    NiceModal.show(DeleteBillModal, { bill });
  };

  const navitateToBill = () => {
    closeDrawer();
    navigate(`/bills/${bill.id}/edit`);
  };

  const handleDeleteBill = () => {
    closeDrawer();
    showDeleteBillModal();
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={modal.visible}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: {
              xs: "100vw",
              sm: "80vw",
              md: 500,
            },
            border: "none",
            overflow: "hidden",
          },
        }}
        sx={{
          zIndex: 10000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4">
              Cuenta N°{bill.num}
              {bill.isActive && (
                <Label
                  sx={{ ml: 1 }}
                  color={bill.isPaid ? "success" : "warning"}
                >
                  {bill.isPaid ? "Pagado" : "Por pagar"}
                </Label>
              )}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            {bill.isActive ? (
              <Tooltip title="Eliminar">
                <IconButton color="error" onClick={handleDeleteBill}>
                  <DeleteOutline />
                </IconButton>
              </Tooltip>
            ) : (
              <Label color="error">Eliminado</Label>
            )}
            <Tooltip title="Cerrar">
              <IconButton color="primary" onClick={closeDrawer}>
                <Close />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Stack direction="column" spacing={2} px={2}>
          <Box>
            <Typography color="text.secondary" fontSize="0.8rem">
              Creado por
            </Typography>
            <Typography variant="h6">
              {bill.createdBy.person.firstName} {bill.createdBy.person.lastName}
            </Typography>
          </Box>
          <Card>
            <CardHeader title="Detalle" />
            <BillDetailsTable details={bill.details} />
          </Card>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="h5" fontWeight="bold">
              Total: {formatMoney(bill.total)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={navitateToBill}
              disabled={bill.isPaid || !bill.isActive}
            >
              Cobrar
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
});
