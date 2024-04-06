import { FC } from "react";

import { Assignment, Circle, People, TableBar } from "@mui/icons-material";
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
import {
  DrawerOrder,
  LabelStatusOrder,
  orderStatusIconMap,
  colorStatusMap,
} from "../../../components";
import NiceModal from "@ebay/nice-modal-react";
import { format, formatDistance } from "date-fns";
import { es } from "date-fns/locale";

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

  const isAvailable = ordersTable.length === 0;

  const showOrdersTableDrawer = () => NiceModal.show(DrawerOrder, { table });

  return (
    <Card
      sx={
        {
          // border: (theme) =>
          //   isAvailable ? `1.5px solid ${theme.palette.success.light}` : "",
          //boxShadow: (theme) =>
          //isAvailable ? `0px 0px 4px ${theme.palette.success.light}` : "",
        }
      }
    >
      <CardActionArea onClick={showOrdersTableDrawer}>
        <CardHeader
          avatar={
            <TableBar
              fontSize="small"
              color={isAvailable ? "secondary" : "inherit"}
            />
          }
          title={`${table.name}`}
          titleTypographyProps={{
            variant: "h5",
          }}
        />
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
                  <Badge
                    key={order.id}
                    sx={{
                      border: "1px solid",
                      borderRadius: "5px",
                      borderColor: `${colorStatusMap.get(order.status)}.main`,
                    }}
                  >
                    {orderStatusIconMap.get(order.status)}{" "}
                    <Typography>

                   
                    </Typography>
                  </Badge>
                ))}
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <People fontSize="small" />
                <Typography fontSize="0.8rem">{people}</Typography>
              </Box>
            </Box>
          ) : (
            <Box
              alignItems="center"
              display="flex"
              sx={{
                color: `${isAvailable ? "secondary" : "error"}.main`,
              }}
              gap={1}
            >
              <Circle fontSize="small" sx={{ fontSize: 10 }} />
              <Typography fontSize="0.8rem">
                {isAvailable ? "Disponible" : "Ocupada"}
              </Typography>
            </Box>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};
