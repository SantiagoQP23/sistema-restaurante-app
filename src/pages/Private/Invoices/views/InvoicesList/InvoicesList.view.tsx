import { Button } from "@mui/material"
import { TitlePage } from "../../../components/TitlePage.component"
import { TableInvoices } from "./components/TableInvoices.component"


export const InvoicesList = (



) => {
  return (

    <>

      <TitlePage
        title='Comprobantes'

        action={
          <Button
            variant='contained'
            color='primary'
          >
            Nuevo Comprobante

          </Button>
        }

      />

      <TableInvoices />




    </>
  )
}