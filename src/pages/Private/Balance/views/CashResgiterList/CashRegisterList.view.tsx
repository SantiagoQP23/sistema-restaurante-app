import { Button, Card, CardHeader, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import { TitlePage } from "../../../components/TitlePage.component"
import { useAllCashRegister } from "../../hooks/useCashRegister"
import { format } from "date-fns"
import { Label } from "../../../../../components/ui"
import { Visibility } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';



export const CashRegisterList = () => {

  const { cashRegisterQuery } = useAllCashRegister();

  const navigate = useNavigate();



  return (
    <>
      <TitlePage
        title="Cierre de  cajas"
        action={
          <Button
            variant="contained"
          >
            Descargar reporte
          </Button>
        }
      />

      <Grid container spacing={1}>

        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Lista"

            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Usuario</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Balance</TableCell>

                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    cashRegisterQuery.data?.map((cashRegister) => (

                      <TableRow key={cashRegister.id}>
                        <TableCell>
                          <Typography>{format(new Date(cashRegister.createdAt), 'dd/MM/yyyy hh:mm')}</Typography>
                          {
                            cashRegister.isClosed &&
                          <Typography>{format(new Date(cashRegister.closingDate), 'dd/MM/yyyy hh:mm')}</Typography>
                          }

                        </TableCell>
                        <TableCell>
                          {cashRegister.user.person.firstName} {cashRegister.user.person.lastName}
                        </TableCell>
                        <TableCell>{
                          cashRegister.isClosed 
                          ? (
                            <Label
                              color="error"
                            >
                              Cerrado
                            </Label>
                          ) : (
                            <Label
                              color="success"
                            >
                              Abierto
                            </Label>
                          )

                        }</TableCell>
                        <TableCell>{
                          cashRegister.balance
                        }</TableCell>

                        <TableCell>
                          <IconButton
                            onClick={() => navigate(`${cashRegister.id}`)}
                          >
                            <Visibility />
                          </IconButton>

                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>





            </TableContainer>



          </Card>

        </Grid>

      </Grid>

    </>

  )
}