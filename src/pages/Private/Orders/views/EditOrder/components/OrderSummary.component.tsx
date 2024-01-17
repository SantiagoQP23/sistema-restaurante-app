import { FC, useState } from "react";

import { CircleRounded, Edit, Notes, Visibility } from "@mui/icons-material";
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
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  styled,
  stepConnectorClasses,
  StepIcon,
} from "@mui/material";
import { format } from "date-fns";
import { IUser } from "../../../../../../models";

import {
  IOrder,
  OrderStatus,
  TypeOrder,
} from "../../../../../../models/orders.model";

import { useUpdateOrder } from "../../../hooks";

import { ComboBoxUser } from "../../../components/ComboBoxUser.component";

import { useInvoiceStore } from "../../../store/invoiceStore";
import { BillsList } from "./BillsList.component";
import { useModal } from "../../../../../../hooks";
import { ModalEditOrder } from "./ModalEditOrder.component";
import { formatMoney } from "../../../../Common/helpers/format-money.helper";
import { OrderDetails } from "./OrderDetails.component";
import { LabelStatusOrder } from "../../../components";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

interface PropsOrder {
  order: IOrder;
}

/**
 * Componente to show order summary
 * @version v1.1 22-12-2023 Adds bills
 */
export const OrderSummary: FC<PropsOrder> = ({ order }) => {
  const { handleClose, handleOpen, isOpen } = useModal();

  const [activeStatus, setActiveStatus] = useState(getStepIndex(order.status));

  const handleNext = () => {
    setActiveStatus((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStatus((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepIndex(status: OrderStatus) {
    switch (status) {
      case OrderStatus.PENDING:
        return 0;
      case OrderStatus.IN_PROGRESS:
        return 1;
      case OrderStatus.DELIVERED:
        return 2;
      default:
        return 0;
    }
  }

  const { step: activeStep } = useInvoiceStore((state) => state);

  const { mutate: updateOrder } = useUpdateOrder();

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
            <Timeline
              // sx={{
              //   m: 0,
              //   p: 3,
              //   [`& .${timelineItemClasses.root}:before`]: {
              //     flex: 0,
              //     padding: 0,
              //   },
              // }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary"  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <LabelStatusOrder status={OrderStatus.PENDING} />
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary"  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {activeStatus >= 1 ? (
                    <LabelStatusOrder status={OrderStatus.IN_PROGRESS} />
                    ) : (
                      "En preparación"
                      )}
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                      <TimelineConnector />
                  <TimelineDot color="primary"/>
                </TimelineSeparator>
                <TimelineContent>
                  {activeStatus >= 2 ? (
                    <LabelStatusOrder status={OrderStatus.DELIVERED} />
                  ) : (
                    "Entregado"
                  )}
                </TimelineContent>
              </TimelineItem>
            </Timeline>
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

            {order.bills.length > 0 && <BillsList bills={order.bills} />}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
