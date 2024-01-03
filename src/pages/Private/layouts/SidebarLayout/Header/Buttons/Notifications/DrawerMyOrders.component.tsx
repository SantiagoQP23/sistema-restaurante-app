import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Cached, Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuth, selectOrders } from "../../../../../../../redux";
import { useMemo } from "react";
import { Scrollbar } from "../../../../../components";
import { CardOrder } from "./CardOrder.component";
import { OrderTakeAway } from "../../../../../Orders/views";
import { LoadingButton } from "@mui/lab";
import { useActiveOrders } from "../../../../../Orders/hooks";

export const DrawerMyOrders = NiceModal.create(() => {
  const modal = useModal();

  const { orders } = useSelector(selectOrders);

  const { activeOrdersQuery } = useActiveOrders();

  const { user } = useSelector(selectAuth);

  const myOrders = useMemo(() => {
    return orders.filter((order) => order.user.id === user!.id);
  }, [orders]);

  const closeDrawer = () => {
    modal.hide();
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
            <Typography variant="h4">Mis pedidos</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Tienes {myOrders.length} pedidos activos
            </Typography>
          </Box>

          <Stack direction='row' >
            <LoadingButton
              variant="text"
              loading={activeOrdersQuery.isFetching}
              onClick={() => activeOrdersQuery.refetch()}
              size="small"
            >
              <Cached />
            </LoadingButton>
            <Tooltip title="Cerrar">
              <IconButton color="primary" onClick={closeDrawer}>
                <Close />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar height={"100%"}>
          <Stack direction="column" spacing={1} p={1}>
            {myOrders.map((order) => (
              <OrderTakeAway
                order={order}
                key={order.id}
                onClick={closeDrawer}
              />
            ))}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
});
