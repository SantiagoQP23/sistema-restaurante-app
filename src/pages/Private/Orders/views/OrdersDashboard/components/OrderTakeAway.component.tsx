import { TimerOutlined, People, Receipt, MoreVert, Assignment } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardHeader,
  Typography,
  Stack,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { format, formatDistance, formatRelative } from "date-fns";
import { IOrder, TypeOrder } from "../../../../../../models";
import { FC } from "react";
import { LabelStatusOrder } from "../../../components/LabelStatusOrder.component";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../../../../Common/helpers/format-money.helper";
import { getTypeOrder } from "../../../../Common/helpers/get-type-order.helper";
import { LabelStatusPaid } from "../../../components";
import { es } from "date-fns/locale";

interface Props {
  order: IOrder;
  onClick?: () => void;
}

export const OrderTakeAway: FC<Props> = ({ order, onClick }) => {
  const navigate = useNavigate();

  const date = formatDistance(new Date(order.createdAt), new Date(), {locale: es});

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          onClick && onClick();
          navigate(`/orders/list/edit/${order.id}`);
        }}
      >
        <CardHeader
          title={
            order.type === TypeOrder.TAKE_AWAY
              ? getTypeOrder(order.type)
              : `Mesa ${order.table?.name}`
          }
          subheader={`${order.user.person.firstName} ${order.user.person.lastName} `}
          action={
            <>
              <Stack direction="row" spacing={1} alignItems="center">
                <LabelStatusOrder status={order.status} simple />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreVert />
                </IconButton>
              </Stack>
            </>
          }
        />
        <Stack spacing={2} px={1} mb={1}>
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
          <Box display="flex" alignItems="center">
            <TimerOutlined
              fontSize="small"
              sx={{ fontSize: 18, mr: 0.5 }}
              color="info"
            />
            <Typography fontSize="0.8rem" >
              {date}
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <People
              fontSize="small"
              sx={{ fontSize: 18, mr: 0.5 }}
              color="info"
            />
            <Typography fontSize="0.8rem" fontWeight="bold">
              {order.people}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={0.5}>
              <Assignment
                fontSize="small"
                sx={{ fontSize: 18, mr: 0.5 }}
                color="info"
              />
              <Typography>N° {order.num}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <LabelStatusPaid isPaid={order.isPaid} />
              <Divider orientation="vertical" flexItem />
              <Typography align="right" variant="h4">
                {formatMoney(order.total)}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  );
};
