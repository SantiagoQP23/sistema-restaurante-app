import React, { FC } from "react";
import { BillDetail } from "../../../../models/bill-detail.model";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import { formatMoney } from "../../Common/helpers/format-money.helper";

interface Props {
  details: BillDetail[];
}

export const BillDetailsTable: FC<Props> = ({ details }) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cantidad</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {details.map((detail) => (
            <TableRow key={detail.id}>
              <TableCell align="center">{detail.quantity}</TableCell>
              <TableCell>{detail.orderDetail.product.name}</TableCell>
              <TableCell align="right">
                {formatMoney(detail.orderDetail.price)}
              </TableCell>
              <TableCell align="right">{formatMoney(detail.total)}</TableCell>
            </TableRow>
          ))}

          {/* <TableRow>
            <TableCell
              colSpan={3}
              align="right"
              sx={{
                border: "none",
              }}
            >
              <Typography variant="subtitle1" color="textSecondary">
                Subtotal
              </Typography>
            </TableCell>
            <TableCell
              align="right"
              sx={{
                border: "none",
              }}
            >
              <Typography variant="subtitle1">
                {formatMoney(activeInvoice.amount)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              colSpan={3}
              align="right"
              sx={{
                border: "none",
              }}
              size="small"
            >
              <Typography variant="subtitle1" color="textSecondary">
                Descuento
              </Typography>
            </TableCell>
            <TableCell
              align="right"
              sx={{
                border: "none",
              }}
              size="small"
            >
              <Typography variant="h5" color="error">
                {" "}
                - {formatMoney(activeInvoice.discount || 0)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography variant="h6" color="textSecondary">
                Total
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h4">
                {formatMoney(activeInvoice.total || 0)}
              </Typography>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </>
  );
};
