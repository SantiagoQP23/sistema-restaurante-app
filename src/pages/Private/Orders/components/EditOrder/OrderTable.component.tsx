import { FC, useContext, useEffect, useState } from 'react';
import { ITable } from '../../../../../models/table.model';
import { useSelector, useDispatch } from 'react-redux';
import { selectTables } from '../../../../../redux/slices/tables/tables.slice';
import { selectOrders, setActiveOrder } from '../../../../../redux/slices/orders/orders.slice';
import { useSnackbar } from 'notistack';
import { Accordion, AccordionDetails, AccordionSummary, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { DriveFileRenameOutlineOutlined } from '@mui/icons-material';
import { UpdateOrderDto } from '../../dto/update-order.dto';
import { SocketContext } from '../../../../../context/SocketContext';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../interfaces/responses-sockets.interface';

interface Props{

}

interface ChangeTableDto {
  previousTableId?: string,
  newTableId: string
}



export const OrderTable: FC<Props> = () => {
  const { activeOrder } = useSelector(selectOrders);

  const [table, setTable] = useState<ITable>();

  const { tables } = useSelector(selectTables);

  const { socket } = useContext(SocketContext);

  const dispatch = useDispatch();





  const { enqueueSnackbar } = useSnackbar();



  const changeTable = (tableId: string) => {

    const newTable = tables.find(t => t.id === tableId);
    setTable(newTable);

    const updateTableDto: UpdateOrderDto = {
      id: activeOrder!.id,
      tableId: newTable!.id,
    }

    const changeTableDto: ChangeTableDto = {
      previousTableId: table?.id,
      newTableId: newTable!.id
    }

    emitUpdateTable(updateTableDto);



    //console.log('Actualizando mesas')

    emitChangeTable(changeTableDto);

  }

  const emitUpdateTable = (updateOrderDto: UpdateOrderDto ) => {
    socket?.emit(EventsEmitSocket.updateOrder, updateOrderDto, (res: SocketResponseOrder) => {

      console.log('response', res);
      
      if (res.ok){
        
        dispatch(setActiveOrder(res.order!));
      } 
      
      else{
        enqueueSnackbar(res.msg, { variant: 'error' });
      }

    });


    


  }

  const emitChangeTable = (tablesId: ChangeTableDto) => {
    socket?.emit(EventsEmitSocket.changeTable, tablesId, ({ ok, msg, order }: SocketResponseOrder) => {

      console.log('response', ok);
      
      if (ok){
      
       
      } 
      
      else{
        enqueueSnackbar(msg, { variant: 'error' });
      }
    })



  }


  useEffect(() => {

    setTable(activeOrder?.table);
    
  }, [activeOrder]);




  return (
    <Accordion sx={{ p: 0, m: 0 }}>
      <AccordionSummary
        expandIcon={<DriveFileRenameOutlineOutlined />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ p: 0, m: 0 }}
      >
        <Typography variant='body1'>Mesa <b>{table ? table.name : 'N.A.'}</b></Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, m: 0 }}>
        {
          tables.length === 0
            ? <Typography variant='body1' color='gray' align='center'>No hay mesas disponibles</Typography>
            : <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Mesa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={table?.id}
                label="Mesa del pedido"

                onChange={(e) => changeTable(e.target.value)}

              >
                {
                  tables.map(table => (

                    <MenuItem key={table.id} value={table.id}>Mesa {table.name}</MenuItem>

                  ))
                }

              </Select>
            </FormControl>
        }


      </AccordionDetails>
    </Accordion>

  )
}