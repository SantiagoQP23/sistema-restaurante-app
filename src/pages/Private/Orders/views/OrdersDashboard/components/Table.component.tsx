import { FC } from "react";

import { Assignment, People } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  Box,
  Typography,
  Badge,
  Stack,
  CardHeader,
} from "@mui/material";
import { ITable, OrderStatus } from "../../../../../../models";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../../../../redux";
import { Label } from "../../../../../../components/ui";
import { LabelStatusOrder, orderStatusIconMap } from "../../../components";

interface Props {
  table: ITable;
  handleClickTable: (table: ITable) => void;
}

export const Table: FC<Props> = ({ table, handleClickTable }) => {
  const { orders } = useSelector(selectOrders);

  const ordersTable = orders.filter((order) => order.table?.id === table.id);

  const people = ordersTable.reduce((acc, order) => {
    return acc + order.people;
  }, 0);

  return (
    <Card>
      <CardActionArea onClick={() => handleClickTable(table)}>
        <CardHeader title={`Mesa ${table.name}`} />
        <Box
          sx={{
            p: 1,
          //   display: "flex",
          //   flexDirection: "column",
          //   gap: 1,
          //   justifyContent: "center",
          //   alignItems: "center",
          }}
        >
          {ordersTable.length > 0 ? (
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" gap={1}>
                {ordersTable.map((order) => (
                  <Badge key={order.id}>
                    {orderStatusIconMap.get(order.status)}
                  </Badge>
                ))}
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <People fontSize="small" />
                <Typography fontSize="0.8rem">{people}</Typography>
              </Box>
            </Box>
          ) : (
            <Label color={table.isAvailable ? "secondary" : "secondary"}>
              {table.isAvailable ? "Disponible" : "Ocupada"}
            </Label>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};
