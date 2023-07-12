import { Container } from '@mui/material';
import { TitlePage } from '../components/TitlePage.component';
import { TableInvoices } from './components/TableInvoices.component';



const Invoices = () => {


  return (

    <Container maxWidth='lg'>

      <TitlePage 
        title='Comprobantes'

      />

      <TableInvoices />

    </Container>
  )
}
export default Invoices