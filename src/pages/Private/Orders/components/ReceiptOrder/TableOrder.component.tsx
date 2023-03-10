import { Card, CardContent, Accordion, AccordionSummary, Typography, AccordionDetails, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material"
import { FC, useContext, useState, useEffect } from "react"
import { DriveFileRenameOutlineOutlined } from '@mui/icons-material';
import { useAsync, useFetchAndLoad } from "../../../../../hooks";
import { ITable } from "../../../../../models";
import { getTables } from "../../../Tables/services";
import { OrderContext } from '../../context/Order.context';
import { SocketContext } from '../../../../../context/SocketContext';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { useSnackbar } from 'notistack';
import { SocketResponseOrder } from '../../interfaces/responses-sockets.interface';
import { ChangeTable } from '../../interfaces/data-emit-sockets.interface';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, setActiveOrder } from '../../../../../redux/slices/orders/orders.slice';
import { UpdateOrderDto } from '../../dto/update-order.dto';
import { selectTables } from '../../../../../redux/slices/tables/tables.slice';

interface Props {
  table?: ITable;
}

export const TableOrder: FC<Props> = ({ table: tableOrder }) => {


  const { setTable, table } = useContext(OrderContext);

  const { socket } = useContext(SocketContext);

  const dispatch = useDispatch();

  const { activeOrder } = useSelector(selectOrders);

  const {tables} = useSelector(selectTables);

  const [tablesAvailable, setTablesAvailable] = useState<ITable[]>([])

  const { enqueueSnackbar } = useSnackbar();



  const filterTablesAvailable = (tables: ITable[]) => {

    const tablesAvailable = tables.filter(t => t.isAvailable);

    return tablesAvailable;
  }


  const changeTable = (tableId: string) => {

    const table = tables.find(t => t.id === tableId);

    console.log({ tableOrder })

    if (activeOrder) {

      console.log('emitiendo evento')

      const data: UpdateOrderDto = {
        id: activeOrder.id,
        tableId,
      }

      const tables : {previousTableId: string, newTableId: string} = {
        previousTableId: tableOrder!.id,
        newTableId: table!.id
      }
      
      console.log('Actualizando mesas')

      socket?.emit(EventsEmitSocket.changeTable, tables, ({ ok, msg, order }: SocketResponseOrder) => {

        console.log('response', ok);
        if (!ok) {
          enqueueSnackbar(msg, { variant: 'error' });
        }
      })


      socket?.emit(EventsEmitSocket.updateOrder, data, ({ ok, msg, order }: SocketResponseOrder) => {

        console.log('response', ok);
        if (ok) {
          setTable(table!);
          dispatch(setActiveOrder(order!))
        }
        else {
          enqueueSnackbar(msg, { variant: 'error' });
        }


      });




    } else {
      setTable(table!);
    }



  }

/* 
  useEffect(() => {
    if (tableOrder)
      setTable(tableOrder);

    filterTablesAvailable(tables); 
  },[])
 */
 /*  useEffect(() => {
    setTablesAvailable(filterTablesAvailable(tables));
  }, [tables]);
 */



  return (
    <>
      
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

    

    </>
  )
}
