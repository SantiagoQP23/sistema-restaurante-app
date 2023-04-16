import { FC, useContext, useEffect, useState } from 'react';
import { ITable } from '../../../../../../models/table.model';
import { useSelector, useDispatch } from 'react-redux';
import { selectTables } from '../../../../../../redux/slices/tables/tables.slice';
import { selectOrders, setActiveOrder } from '../../../../../../redux/slices/orders/orders.slice';
import { useSnackbar } from 'notistack';
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, FormControl, InputLabel, LinearProgress, MenuItem, Select, Typography } from '@mui/material';
import { DriveFileRenameOutlineOutlined } from '@mui/icons-material';
import { UpdateOrderDto } from '../../../dto/update-order.dto';
import { SocketContext } from '../../../../../../context/SocketContext';
import { EventsEmitSocket } from '../../../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../../interfaces/responses-sockets.interface';
import { TypeOrder } from '../../../../../../models/orders.model';
import { useUpdateOrder } from '../../../hooks/useUpdateOrder';

interface Props {

}

interface ChangeTableDto {
  previousTableId?: string,
  newTableId: string
}



export const OrderTable: FC<Props> = () => {

  const { activeOrder } = useSelector(selectOrders);

  const [table, setTable] = useState<string | undefined >(activeOrder?.table?.id);

  const { tables } = useSelector(selectTables);

  const { socket } = useContext(SocketContext);

  const dispatch = useDispatch();

  const { loading, updateOrder } = useUpdateOrder();





  const { enqueueSnackbar } = useSnackbar();



  const changeTable = (tableId: string) => {

  

    const updateOrderDto: UpdateOrderDto = {
      id: activeOrder!.id,
      tableId,
    }

    const changeTableDto: ChangeTableDto = {
      previousTableId: activeOrder?.table?.id,
      newTableId: tableId
    }

    updateOrder(updateOrderDto)
    //console.log('Actualizando mesas')

    emitChangeTable(changeTableDto);

  }



  const emitChangeTable = (tablesId: ChangeTableDto) => {
    socket?.emit(EventsEmitSocket.changeTable, tablesId, ({ ok, msg, order }: SocketResponseOrder) => {

      console.log('response', ok);

      if (ok) {


      }

      else {
        enqueueSnackbar(msg, { variant: 'error' });
      }
    })



  }


  useEffect(() => {

    setTable(activeOrder?.table?.id);

  }, [activeOrder]);




  return (
    <>
      {
        tables.length === 0
          ? (<Typography variant='body1' color='gray' align='center'>No hay mesas disponibles</Typography>)
          : <>
            {
              loading ? <CircularProgress size={20}/>
                :
                (<FormControl sx={{ width: 200 }}>
                  <InputLabel id="demo-simple-select-label">Mesa</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={table}
                    label="Mesa del pedido"

                    onChange={(e) => changeTable(e.target.value)}
                    disabled={activeOrder!.type !== TypeOrder.IN_PLACE}
                    size='small'

                  >
                    {
                      tables.map(table => (

                        <MenuItem key={table.id} value={table.id}>Mesa {table.name}</MenuItem>

                      ))
                    }

                  </Select>
                </FormControl>)}
          </>
      }

    </>


  )
}