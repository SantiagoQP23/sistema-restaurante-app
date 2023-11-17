import { useState } from "react";
import { Tabs, Tab, Box, Button, Stack, Container } from "@mui/material";
import { TitlePage } from "../../../components";
import { Tables } from "./components/Tables.component";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TypeOrder } from "../../../../../models";
import { useNewOrderStore } from "../../store/newOrderStore";
import { Users } from "./components/Users.component";
import { Label } from "../../../../../components/ui";
import { TakeAwayOrders } from "./components/TakeAwayOrders.component";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../../../redux";

enum DashboardViews {
  TABLES = "TABLES",
  USERS = "USERS",
  TAKE_AWAY = "TAKE_AWAY",
}

export const OrdersDashboard = () => {
  const [view, setView] = useState(DashboardViews.TABLES);

  const { orders } = useSelector(selectOrders);

  const navigate = useNavigate();

  const { setOrderType } = useNewOrderStore((state) => state);

  const createOrderTakeAway = () => {
    setOrderType(TypeOrder.TAKE_AWAY);

    navigate("/orders/add/menu");
  };

  const ordersTakeAway = orders.filter(
    (order) => order.type === TypeOrder.TAKE_AWAY && !order.isClosed
  ).length;

  return (
    <>
      <Container maxWidth="lg">
        <TitlePage
          title="Pedidos"
          action={
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={createOrderTakeAway}
                size="small"
              >
                Crear pedido para llevar
              </Button>
            </Stack>
          }
        />

        <Tabs value={view} onChange={(e, value) => setView(value)}>
          <Tab value={DashboardViews.TABLES} label="Mesas" />
          <Tab value={DashboardViews.USERS} label="Usuarios" icon={<Label sx={{ml: 1}} color="info">new</Label>} iconPosition="end" />
          <Tab value={DashboardViews.TAKE_AWAY} label="Para llevar" icon={<Label sx={{ml: 1}} color="info">{ordersTakeAway}</Label>} iconPosition="end" />
        </Tabs>

        <Box mt={2}>
          {view === DashboardViews.TABLES && <Tables />}
          {view === DashboardViews.USERS && <Users />}
          {view === DashboardViews.TAKE_AWAY && <TakeAwayOrders />}
        </Box>
      </Container>
    </>
  );
};
