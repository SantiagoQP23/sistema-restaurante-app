/* import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TAX_RATE = 0.00;

function ccyFormat(num = 0) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}




export default function TablaPedido( {pedido, detalles}) {



    
    return (
        <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="spanning table">
          <TableHead>
            
            <TableRow>
              <TableCell align="right">Unidad</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Suma</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detalles.map((detalle) => (
              <TableRow key={detalle.idDetalle}>
                <TableCell align="center">{detalle ? detalle.cantidad : 0 }</TableCell>
                <TableCell>{detalle.nombreProducto}</TableCell>
                <TableCell align="right">$ {ccyFormat( detalle ? detalle.precioProducto : 0 )}</TableCell>
                <TableCell align="right">$ {ccyFormat( detalle ? detalle.subtotal : 0 )}</TableCell>
              </TableRow>
            ))}
  
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">$ {ccyFormat(pedido ? pedido.total : 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Descuento</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{ccyFormat(0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">$ {ccyFormat(pedido ? pedido.total : 0)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
}
 */