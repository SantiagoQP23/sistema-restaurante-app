import { Box, Typography, Button } from "@mui/material"
import { useClient } from "../../../../Clients/hooks/useClients"
import { useInvoiceStore } from "../../../store/invoiceStore";


export const BtnFinalConsumer = () => {

  const { data, isLoading } = useClient('0999999999', true);

  const {setClient} = useInvoiceStore(state => state)


  if (!data) return null;


  return (
    <>


      <Box
        sx={{
          border: '1px dotted',
          borderColor: 'secondary.main',
          borderRadius: 1,
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >{
          isLoading ?
            'Cargando...' :
            <>
              <Typography variant='h4'>
                {data.person.lastName} {data.person.firstName}
              </Typography>
              <Button
                variant='outlined'
                size='small'
                onClick={() => setClient(data)}
              >
                Seleccionar
              </Button>
            </>

        }

      </Box>
    </>
  )
}