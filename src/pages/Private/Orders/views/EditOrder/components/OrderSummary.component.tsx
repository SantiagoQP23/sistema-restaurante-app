import { FC, useState } from "react";

import { Edit, Notes, Visibility } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  IconButton,
  CardHeader,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import { format } from "date-fns";
import { IUser } from "../../../../../../models";

import { IOrder, TypeOrder } from "../../../../../../models/orders.model";

import { useUpdateOrder } from "../../../hooks/useUpdateOrder";

import { ComboBoxUser } from "../../../components/ComboBoxUser.component";

import { useInvoiceStore } from "../../../store/invoiceStore";
import { InvoicesList } from "./InvoicesList.component";
import { useModal } from "../../../../../../hooks";
import { ModalEditOrder } from "./ModalEditOrder.component";
import { formatMoney } from "../../../../Common/helpers/format-money.helper";
import { OrderDetails } from "./OrderDetails.component";

interface PropsOrder {
  order: IOrder;
}

export const OrderSummary: FC<PropsOrder> = ({ order }) => {
  const { handleClose, handleOpen, isOpen } = useModal();

  const { step: activeStep } = useInvoiceStore((state) => state);

  const { updateOrder } = useUpdateOrder();

  const [showUser, setShowUser] = useState<boolean>(!!order.user);

  const handleShowUser = () => {
    setShowUser(!showUser);
  };

  const handleChangeUser = (user: IUser | null) => {
    console.log(user);

    if (!user) return;

    updateOrder({
      id: order.id,
      userId: user?.id || "none",
    });
  };

  return (
    <>
      <ModalEditOrder open={isOpen} closeModal={handleClose} order={order} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <OrderDetails order={order} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Card>
              <CardHeader
                titleTypographyProps={{ variant: "h3" }}
                title={`Pedido #${order.num}`}
                subheader={format(new Date(order.createdAt), "dd/MM/yyy HH:mm")}
                action={
                  <Button
                    onClick={handleOpen}
                    size="small"
                    startIcon={<Edit />}
                  >
                    Editar
                  </Button>
                }
              />

              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Tipo de orden</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="h6">
                      {order.type === TypeOrder.IN_PLACE
                        ? "Para servir"
                        : "Para llevar"}
                    </Typography>
                  </Grid>

                  {order.type === TypeOrder.IN_PLACE && (
                    <>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="secondary">
                          Mesa
                        </Typography>
                      </Grid>

                      <Grid item xs={8}>
                        <Typography variant="h6">
                          Mesa {order.table?.name || "No seleccionada"}
                        </Typography>
                      </Grid>
                    </>
                  )}

                  <Grid item xs={4}>
                    <Typography variant="body2" color="secondary">
                      Hora de entrega
                    </Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {format(new Date(order.deliveryTime), "dd/MM/yyy HH:mm")}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body2" color="secondary">
                      Personas
                    </Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="h6">{order.people}</Typography>
                  </Grid>

                  {order.notes && (
                    <>
                      <Grid item xs={12}>
                        <CardHeader
                          sx={{
                            px: 1,
                            py: 0.5,
                          }}
                          avatar={<Notes />}
                          title="Notas"
                          titleTypographyProps={{
                            variant: "subtitle2",
                          }}
                          subheaderTypographyProps={{
                            variant: "h5",
                            color: "inherith",
                          }}
                          subheader={order.notes}
                        />
                      </Grid>
                    </>
                  )}

                  <Grid
                    item
                    xs={12}
                    display="flex"
                    flexDirection="row"
                    gap={1}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Typography variant="h3">
                      {formatMoney(order.total)}
                    </Typography>
                  </Grid>
                </Grid>

                <Stack
                  justifyContent="center"
                  alignItems="flex-start"
                  mt={2}
                  spacing={1}
                  direction="column"
                ></Stack>
              </CardContent>
            </Card>

            <Card>
              <Stack spacing={1} divider={<Divider />}>
                {activeStep === 0 && (
                  <Box>
                    <CardHeader
                      title="Mesero"
                      action={
                        <IconButton onClick={handleShowUser} size="small">
                          {!showUser && order.user ? <Visibility /> : <Edit />}
                        </IconButton>
                      }
                    />

                    <CardContent>
                      {showUser && order.user ? (
                        <Stack spacing={0.5}>
                          <Typography variant="h5" fontWeight="bold">
                            {order.user?.person.firstName +
                              " " +
                              order.user?.person.lastName}
                          </Typography>
                          <Typography variant="body1">
                            {order.user?.person.numPhone || "Sin teléfono"}
                          </Typography>

                          <Typography variant="body1">
                            {order.user?.person.email || "Sin correo"}
                          </Typography>
                        </Stack>
                      ) : (
                        <ComboBoxUser
                          user={null}
                          handleChangeUser={handleChangeUser}
                        />
                      )}
                    </CardContent>
                  </Box>
                )}
              </Stack>
            </Card>

            {order.invoices.length > 0 && (
              <InvoicesList invoices={order.invoices} />
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
