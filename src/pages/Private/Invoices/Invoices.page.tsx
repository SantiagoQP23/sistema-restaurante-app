import { Container } from '@mui/material';
import { TitlePage } from '../components/TitlePage.component';
import { TableInvoices } from './views/InvoicesList/components/TableInvoices.component';
import { Outlet } from 'react-router-dom';



const Invoices = () => {


  return (

    <Container maxWidth='lg'>

      <Outlet />

    
    </Container>
  )
}
export default Invoices