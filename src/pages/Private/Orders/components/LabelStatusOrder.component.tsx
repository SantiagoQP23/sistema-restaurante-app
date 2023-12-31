import { FC } from "react";

import { Label } from "../../../../components/ui";
import { OrderStatus } from "../../../../models";
import { Box, Typography, useTheme } from "@mui/material";
import {
  Circle,
  LocalDining,
  Pending,
  PendingActions,
  SoupKitchen,
} from "@mui/icons-material";

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
  simple?: boolean;
}

const colorStatusMap = new Map<OrderStatus, string>();
colorStatusMap.set(OrderStatus.PENDING, "warning");
colorStatusMap.set(OrderStatus.IN_PROGRESS, "info");
colorStatusMap.set(OrderStatus.DELIVERED, "success");
colorStatusMap.set(OrderStatus.CANCELLED, "error");


export const LabelStatusOrder: FC<Props> = ({
  status,
  onlyIcon = false,
  simple = false,
}) => {
  return (
    <>
      {/* // //   color={colorStatusOrderMap[status]}
    // //   label={textStatusOrderMap[status]}
    // //   icon={status === OrderStatus.PENDING
    // //     ? <Pending />
    // //     : status === OrderStatus.IN_PROGRESS
    // //       ? <SoupKitchen />
    // //       : <LocalDining />
    // //   }

    // //   size="small"
    // // /> */}
      {simple ? (
        <>
          <Typography
            alignItems="center"
            display="flex"
            sx={{ color: `${colorStatusMap.get(status)}.main` }}
            gap={1}
          >
            <Circle fontSize="small" sx={{ fontSize: 12 }} />
            <Typography>{textStatusOrderMap[status]}</Typography>
          </Typography>
        </>
      ) : (
        <Typography variant="h4" fontWeight="bold">
          <Label color={colorStatusOrderMap[status]}>
            <Box mr={onlyIcon ? 0 : 1}>
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
      )}
    </>
  );
};
