import { TextFields } from "@mui/icons-material"
import { Box, Button, Card, CardContent, CardHeader, InputLabel, Stack, Typography, TextField } from '@mui/material';
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers"
import { format } from "date-fns"


export const CashRegisterSummary = () => {



  return (
    <Card>
      <CardHeader title='Caja' 
        action={
          <>
            <DesktopDatePicker 
              value={new Date()}
              onChange={() => {}}
              renderInput={(params) => <TextField size="small" {...params} />}
              


            />
          </>
        }
      />
      <CardContent>
        <Stack direction='column' spacing={2} justifyContent='flex-end'>
          <Box>

            <InputLabel id="date">Fecha</InputLabel>
            <Typography variant='h6' >{format(new Date(), 'yyyy-MM-dd')}</Typography>
          </Box>

          <Box>

            <InputLabel id="date">Monto inicial</InputLabel>
            <Typography variant='h5'  >$ 500.00</Typography>

          </Box>

          <Box>

            <InputLabel id="date">Ventas</InputLabel>
            <Typography variant='h4' color='success.main' >$ 500.00</Typography>
          </Box>
          <Box>

            <InputLabel id="date">Ingresos</InputLabel>
            <Typography variant='h4' color='success.main'>$ 500.00</Typography>

          </Box>

          <Box>

            <InputLabel id="date">Gastos</InputLabel>
            <Typography variant='h4' color='error.main'>$ 500.00</Typography>

          </Box>
          <Box>

            <InputLabel id="date">Monto final</InputLabel>
            <Typography variant='h3' >$ 777.00</Typography>
          </Box>


          <Button
            variant='contained'
          >
            Cerrar caja
          </Button>
        </Stack>
      </CardContent>



    </Card>

  )
}