import {useState} from 'react';

import { Edit } from '@mui/icons-material';
import { Card, CardHeader, Button, CardContent, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, TablePagination } from '@mui/material';
import { useExpenses } from '../../../hooks/useExpenses';
import { format } from 'date-fns';
import { PaymentMethod } from '../../../../Orders/models/Invoice.model';
import { Expense } from '../../../models/expense.model';
import { useModal } from '../../../../../../hooks';
import { DrawerExpense } from '../../Expenses/components/DrawerExpense.component';



export const ExpensesList = () => {

  const { expensesQuery } = useExpenses();


  const [activeExpense, setActiveExpense] = useState<Expense | null>(null);

  const {isOpen, handleClose, handleOpen} = useModal();

  const handleOpenDrawer = (activeExpense: Expense) => {

    console.log('change expense')
    console.log(activeExpense)
    setActiveExpense(activeExpense);
    handleOpen();
  }




  return (
    <>

    {
      activeExpense && (
        <DrawerExpense
          open={isOpen}
          onClose={handleClose}
          expense={activeExpense}

        />
      )
    }
      <Card>

        <CardHeader title='Lista de gastos'
        // action={
        //   <Button variant='outlined' size='small'>Añadir</Button>
        // }
        />


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
                expensesQuery.data?.map((expense) => (
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
                      <IconButton
                        color='primary'
                        onClick={() => handleOpenDrawer(expense)}
                      >
                        <Edit />
                      </IconButton>
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
          count={100}
          rowsPerPage={5}
          page={0}
          onPageChange={() => { }}
          onRowsPerPageChange={() => { }}

        />




      </Card>
    </>
  )
}