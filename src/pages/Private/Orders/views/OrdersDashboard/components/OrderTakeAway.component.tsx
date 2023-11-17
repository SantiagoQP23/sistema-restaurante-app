import { TimerOutlined, Person, Paid } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardHeader,
  Typography,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import { format } from "date-fns";
import { IOrder } from "../../../../../../models";
import { FC } from "react";
import { LabelStatusOrder } from "../../../components/LabelStatusOrder.component";
import { useNavigate } from "react-router-dom";

interface Props {
  order: IOrder;
}

export const OrderTakeAway: FC<Props> = ({ order }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          navigate(`/orders/list/edit/${order.id}`);
        }}
      >
        <CardHeader
          title={`Pedido #${order.num}`}
          subheader={`Mesero: ${order.user.username}`}
          action={<LabelStatusOrder status={order.status} />}
        />
        <Stack spacing={1} px={1} mb={1}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              maxWidth: "auto", // Establecer el ancho máximo aquí
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {order.details.map((detail, index) => (
              <Typography variant="body1" key={index}>
                {detail.quantity} {detail.product.name}
                {index < order.details.length - 1 ? "," : "."}
              </Typography>
            ))}
          </Stack>

          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12}>
              <Chip
                label={`${format(
                  new Date(order.deliveryTime),
                  "dd/MM/yyyy HH:mm"
                )}`}
                size="small"
                icon={<TimerOutlined />}
              />
            </Grid>

            <Grid item xs={6}>
              <Chip
                label={`Personas: ${order.people}`}
                size="small"
                icon={<Person />}
              />
            </Grid>

            <Grid item xs={6}>
              <Chip
                label={`Total: $${order.total}`}
                size="small"
                icon={<Paid />}
              />
            </Grid>
          </Grid>
        </Stack>
      </CardActionArea>
    </Card>
  );
};
