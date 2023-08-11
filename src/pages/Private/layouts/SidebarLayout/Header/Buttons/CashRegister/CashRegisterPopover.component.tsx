import { ExpandLess, PointOfSale } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme, ListItemText, ListItemSecondaryAction, List, ListItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useCashRegisterStore } from '../../../../../Common/store/cashRegisterStore';
import { Popover, Button } from '@mui/material/';
import { useRef, useState } from 'react';
import { formatMoney } from '../../../../../Common/helpers/format-money.helper';
import { Label } from "../../../../../../../components/ui";



export const CashRegisterPopover = () => {

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const { activeCashRegister } = useCashRegisterStore();


  const navigate = useNavigate();
  const theme = useTheme();


  return (
    <>

      <IconButton
        ref={ref} onClick={handleOpen}
        sx={{
          display: {
            xs: 'flex',
            md: 'none',

          },
          border: `1px solid ${theme.palette.divider}`,
        }}

      // onClick={() => {
      //   navigate('/balance');
      // }}

      >
        <PointOfSale
          color={activeCashRegister ? 'success' : 'error'}

        />

      </IconButton>


      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >

        <Box
          sx={{
            p: 2,
            width: 250,
          }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"

        >
          <Typography variant="h4">Caja </Typography>
          <Stack direction='row' spacing={1} alignItems='center'>

            <IconButton
              onClick={handleClose}
            >
              <ExpandLess />
            </IconButton>

          </Stack>
        </Box>

        {
          activeCashRegister ? (
            <>
              <Box>

                <Typography variant="h3" textAlign='center'
                  color={activeCashRegister ? 'success.main' : 'error.main'}
                >
                  {formatMoney(activeCashRegister.balance)}
                </Typography>

                <List>
                  <ListItem>
                    <ListItemText>
                      Monto inicial
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Typography>
                        {formatMoney(activeCashRegister.initialAmount)}
                      </Typography>


                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem>
                    <ListItemText>
                      Ventas
                    </ListItemText>
                    <ListItemSecondaryAction>

                      <Label color="success">
                        {formatMoney(activeCashRegister.totalInvoicesCash)}

                      </Label>
                      <Typography>
                      </Typography>

                      </ListItemSecondaryAction>

                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      Ingresos
                    </ListItemText>
                    <ListItemSecondaryAction>

                      <Label color="success">
                        {formatMoney(activeCashRegister.totalIncomesCash)}

                      </Label>
                      <Typography>
                      </Typography>

                      </ListItemSecondaryAction>

                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      Gastos
                    </ListItemText>
                    <ListItemSecondaryAction>

                      <Label color="error">
                        {formatMoney(activeCashRegister.totalExpensesCash)}

                      </Label>
                      <Typography>
                      </Typography>

                      </ListItemSecondaryAction>

                  </ListItem>

                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{
                      mt: 2,
                    }}
                    startIcon={<PointOfSale />}
                  >
                    Ver detalle
                  </Button>

                </List>


             

              </Box>
            </>
          ) : (
            <>
              <Box>

                <Typography>
                  No hay caja abierta
                </Typography>



              </Box>
            </>
          )



        }

      </Popover>

    </>
  )
}