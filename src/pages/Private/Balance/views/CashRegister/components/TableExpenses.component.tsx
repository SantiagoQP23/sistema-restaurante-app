import { Edit } from "@mui/icons-material"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, TablePagination } from "@mui/material"
import { format } from "date-fns"
import { PaymentMethod } from "../../../../Orders/models/Invoice.model"
import { CashRegister } from '../../../models/cash-register.model';
import { useExpenses } from "../../../hooks/useExpenses";
import { FC, useEffect } from "react";

interface Props {
  cashRegister: CashRegister;
}

export const TableExpenses: FC<Props> = ({cashRegister}) => {

  const { expensesQuery, ...filterExpenses } = useExpenses();


  useEffect(() => {
    filterExpenses.handleChangeCashRegister(cashRegister)
  }, [])



  return (
    <>

      <TableContainer>


        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Importe</TableCell>
              <TableCell>Forma de pago</TableCell>
              <TableCell>Acciones</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {
              expensesQuery.data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    <Typography variant='h5'>
                      {expense.transaction.description}
                    </Typography>

                    {
                      expense.supplier && (
                        <Typography variant='body2'>
                          {expense.supplier.person.firstName} {expense.supplier.person.lastName}
                        </Typography>
                      )
                    }
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {format(new Date(expense.createdAt), 'dd/MM/yyyy')}

                    </Typography>
                    <Typography>
                      {format(new Date(expense.createdAt), 'HH:mm')}

                    </Typography>
                  </TableCell>

                  <TableCell>$ {expense.transaction.amount}</TableCell>
                  <TableCell>{expense.transaction.paymentMethod === PaymentMethod.CASH ? 'Efectivo' : 'Transferencia'}</TableCell>
                  <TableCell>
                    {/* <IconButton
                      color='primary'
                      onClick={() => handleOpenDrawer(expense)}
                    >
                      <Edit />
                    </IconButton> */}
                  </TableCell>

                </TableRow>


              ))
            }


          </TableBody>

        </Table>


      </TableContainer>
      <TablePagination

        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={expensesQuery.data?.count || 0}
        rowsPerPage={filterExpenses.rowsPerPage}
        page={filterExpenses.page}
        onPageChange={() => { }}
        onRowsPerPageChange={() => { }}

      />
    </>
  )
}