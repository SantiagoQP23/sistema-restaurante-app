import { format } from 'date-fns';
import { useInvoices } from '../../../../Orders/hooks/useInvoices';
import { Card, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, TablePagination, IconButton, Box, TextField, MenuItem } from '@mui/material';
import { Description, Search, ShowChart, Visibility } from '@mui/icons-material';
import { Label } from '../../../../../../components/ui';
import { Grid, Select } from '@mui/material/';
import { ComboBoxClient } from '../../../../Orders/components';
import { ChangeEvent } from 'react';
import { PaymentMethod } from '../../../../Orders/models/Invoice.model';
import { useNavigate } from 'react-router-dom';


export const TableInvoices = () => {


  const { invoicesQuery, ...filters } = useInvoices();

  const navigate = useNavigate();


  const handleChangeNum = (e: ChangeEvent<HTMLInputElement>) => {

    filters.handleChangeTransactionNumber(e.target.value)

  }





  return (
    <>
      <Card>

        <Box
          p={2}
        >

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <ComboBoxClient
                handleChangeClient={filters.handleChangeClient}
                client={null}
              />
            </Grid>

            <Grid item xs={12} sm={2} display='flex'>

              <TextField
                type='text'
                label='Num comprobante'
                fullWidth
                value={filters.transactionNumber}
                onChange={handleChangeNum}


              />
              <IconButton>
                <Search />
              </IconButton>


            </Grid>

            <Grid item xs={12} sm={2} display='flex'>

              <TextField
                type='text'
                label='Nota de venta'
                fullWidth
              />
              <IconButton>
                <Search />
              </IconButton>


            </Grid>

            <Grid item xs={12} sm={2}>

              <Select
                value={filters.paymentMethod || ''}
                onChange={(e) => filters.handleChangePaymentMethod(e.target.value as PaymentMethod)}
              >
                <MenuItem value={''}>Todos</MenuItem>
                <MenuItem value={PaymentMethod.CASH}>Efectivo</MenuItem>
                <MenuItem value={PaymentMethod.TRANSFER}>Transferencia</MenuItem>

              </Select>

            </Grid>

          </Grid>

        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nro. Comprobante
                </TableCell>
                <TableCell>
                  Fecha
                </TableCell>
                <TableCell>
                  Cliente
                </TableCell>
                <TableCell>
                  Total
                </TableCell>
                <TableCell>
                  Forma de pago
                </TableCell>
                <TableCell>
                  Estado
                </TableCell>
                <TableCell>
                  Acciones
                </TableCell>

              </TableRow>
            </TableHead>

            <TableBody>

              {invoicesQuery.data?.invoices?.map(invoice => (
                <>
                  <TableRow>
                    <TableCell>
                      <Description />
                      {invoice.transactionNumber}
                    </TableCell>
                    <TableCell>
                      {format(new Date(invoice.createdAt), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      {invoice.client.person.lastName} {invoice.client.person.firstName}

                    </TableCell>
                    <TableCell>
                      $ {invoice.total}
                    </TableCell>
                    <TableCell>
                      {
                        invoice.paymentMethod === PaymentMethod.CASH 
                        ? 'Efectivo'
                        : 'Transferencia'
                      }
                    </TableCell>
                    <TableCell>
                      {

                        invoice.isActive
                          ? <>
                            <Label
                              color='success'

                            >
                              Válido
                            </Label>
                          </>
                          : <>
                            <Label
                              color='error'
                            >
                              Anulado
                            </Label>

                          </>

                      }
                    </TableCell>
                    <TableCell>
                      <IconButton
                      
                        onClick={() => navigate(`${invoice.id}`)}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>

                  </TableRow>

                </>


              ))}

            </TableBody>

          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={filters.rowsPerPage}
          component="div"
          count={invoicesQuery.data?.count || 0}
          page={filters.page}
          onPageChange={filters.handleChangePage}
          onRowsPerPageChange={filters.handleChangeRowsPerPage}

        />

      </Card>


    </>
  )
}