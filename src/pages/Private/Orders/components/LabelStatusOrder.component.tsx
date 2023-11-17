import { FC } from "react";

import { Label } from "../../../../components/ui";
import { OrderStatus } from "../../../../models";
import { Box, Typography } from "@mui/material";
import { LocalDining, Pending, PendingActions, SoupKitchen } from "@mui/icons-material";

const colorStatusOrderMap: {
  [key: string]:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | undefined;
} = {
  PENDING: "warning",
  IN_PROGRESS: "info",
  unpaid: "warning",
  DELIVERED: "success",
  CANCELLED: "error",
};

const textStatusOrderMap: { [key: string]: string } = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En preparación",
  unpaid: "Por pagar",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

interface Props {
  status: OrderStatus;
  onlyIcon?: boolean;
}

export const LabelStatusOrder: FC<Props> = ({ status, onlyIcon = false}) => {
  return (
    // <Chip
    //   color={colorStatusOrderMap[status]}
    //   label={textStatusOrderMap[status]}
    //   icon={status === OrderStatus.PENDING
    //     ? <Pending />
    //     : status === OrderStatus.IN_PROGRESS
    //       ? <SoupKitchen />
    //       : <LocalDining />
    //   }

    //   size="small"
    // />

    <Typography variant="h4" fontWeight="bold">
      <Label color={colorStatusOrderMap[status]}>
        <Box mr={ onlyIcon ? 0 : 1}>
          {status === OrderStatus.PENDING ? (
            <PendingActions fontSize="small" />
          ) : status === OrderStatus.IN_PROGRESS ? (
            <SoupKitchen fontSize="small" />
          ) : (
            <LocalDining fontSize="small" />
          )}
        </Box>

        {!onlyIcon && textStatusOrderMap[status]}
      </Label>
    </Typography>
  );
};
