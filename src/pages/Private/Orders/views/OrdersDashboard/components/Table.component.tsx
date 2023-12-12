import { FC } from "react";

import { Assignment } from "@mui/icons-material";
import { Card, CardActionArea, Box, Typography, Badge } from "@mui/material";
import { ITable, OrderStatus } from "../../../../../../models";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../../../../redux";
import { Label } from "../../../../../../components/ui";
import { LabelStatusOrder } from "../../../components";

interface Props {
  table: ITable;
  handleClickTable: (table: ITable) => void;
}

export const Table: FC<Props> = ({ table, handleClickTable }) => {
  const { orders } = useSelector(selectOrders);

  const ordersTable = orders.filter((order) => order.table?.id === table.id);

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
                  
                >
                  <LabelStatusOrder status={order.status} onlyIcon/>
                 
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
