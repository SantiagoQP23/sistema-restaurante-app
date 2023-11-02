import { FC } from "react";

import { Assignment, PersonOutline } from "@mui/icons-material";
import { Card, CardActionArea, Box, Typography, Badge, Stack } from "@mui/material";
import { ITable, OrderStatus } from "../../../../../../models";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../../../../redux";
import { Label } from "../../../../../../components/ui";

interface Props {
  table: ITable;
  handleClickTable: (table: ITable) => void;
}

export const Table: FC<Props> = ({ table, handleClickTable }) => {
  const { orders } = useSelector(selectOrders);

  const ordersTable = orders.filter((order) => order.table?.id === table.id);

  const people = ordersTable.reduce((acc, order) => acc + order.people, 0);

  return (
    <Card>
      <CardActionArea onClick={() => handleClickTable(table)}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Mesa {table.name}</Typography>

          {!table.isAvailable && (
            <Box display="flex" gap={3}>
              {/* <Badge badgeContent={people} color="default">
                <PersonOutline fontSize="small" color="secondary" />
              </Badge> */}

              {ordersTable.map((order) => (
                <Badge
                  key={order.id}
                  // badgeContent={
                  //   <Stack spacing={1} direction='row' >
                  //     <Typography >
                  //       <PersonOutline fontSize="small" color="secondary" />
                  //     </Typography>
                  //       {order.people}
                  //   </Stack>
                  // }
                >
                  <Assignment
                    fontSize="small"
                    color={
                      order.status === OrderStatus.PENDING
                        ? "warning"
                        : order.status === OrderStatus.DELIVERED
                        ? "success"
                        : "info"
                    }
                  />
                </Badge>
              ))}
            </Box>
          )}

          {table.isAvailable && (
            <Label color={table.isAvailable ? "secondary" : "secondary"}>
              {table.isAvailable ? "Disponible" : "Ocupada"}
            </Label>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};
