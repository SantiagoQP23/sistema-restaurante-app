
import { FC } from "react";

import { Label } from "../../../../../../components/ui";
import { OrderStatus } from "../../../../../../models";
import { Chip } from '@mui/material';
import { LocalDining, Pending, SoupKitchen } from "@mui/icons-material";


const colorStatusOrderMap: {
  [key: string]: "primary" | "secondary" | "error" | "warning" | "success" | "info" | undefined
} = {
  'PENDING': 'warning',
  'IN_PROGRESS': 'info',
  'unpaid': 'warning',
  'DELIVERED': 'success',
  'CANCELLED': 'error',
};

const textStatusOrderMap: { [key: string]: string } = {
  'PENDING': 'Pendiente',
  'IN_PROGRESS': 'En preparación',
  'unpaid': 'Por pagar',
  'DELIVERED': 'Entregado',
  'CANCELLED': 'Cancelado',

};


interface Props {
  status: OrderStatus | "unpaid";
}

export const LabelStatusOrder: FC<Props> = (
  {
    status,
  }

) => {



  return (
    <Chip
      color={colorStatusOrderMap[status]}
      label={textStatusOrderMap[status]}
      icon={status === OrderStatus.PENDING
        ? <Pending />
        : status === OrderStatus.IN_PROGRESS
          ? <SoupKitchen />
          : <LocalDining />
      }

    />

  )
}