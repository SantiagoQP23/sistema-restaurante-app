import { Edit } from '@mui/icons-material';
import { Card, CardHeader, Button, CardContent, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, TablePagination } from '@mui/material';
import { useIncomes } from '../../../hooks/useIncomes';
import { format } from 'date-fns';
import { PaymentMethod } from '../../../../../../models';
import { Income } from '../../../models/income.model';
import {useState} from 'react';
import { useModal } from '../../../../../../hooks';
import { DrawerIncome } from './DrawerIncome.component';



export const IncomesList = () => {


  const { incomesQuery } = useIncomes();

  const [income, setIncome] = useState<Income | null>(null);

  const {isOpen, handleClose, handleOpen} = useModal();

  const handleOpenDrawer = (income: Income) => {

    setIncome(income);
    handleOpen();
  }
  




  return (
    <>

    {
      income && (
        <DrawerIncome
          open={isOpen}
          onClose={handleClose}
          income={income}

        />
      )
    }

      <Card
      >

        <CardHeader title='Lista de ingresos'
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
                incomesQuery.data?.incomes.map(income => (
                  <>

                    <TableRow key={income.id}>
                      <TableCell>
                        <Typography variant='h5'>
                          {income.transaction.description}
                          {
                            income.transaction.responsible
                          }
                        </Typography>

                        {
                          income.client && (
                            <Typography variant='body2'>
                              {income.client.person.firstName} {income.client.person.lastName}
                            </Typography>
                          )
                        }
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {format(new Date(income.createdAt), 'dd/MM/yyyy')}

                        </Typography>
                        <Typography>
                          {format(new Date(income.createdAt), 'HH:mm')}

                        </Typography>
                      </TableCell>

                      <TableCell>$ {income.transaction.amount}</TableCell>
                      <TableCell>{income.transaction.paymentMethod === PaymentMethod.CASH ? 'Efectivo' : 'Transferencia'}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenDrawer(income)}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>

                    </TableRow>



                  </>

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