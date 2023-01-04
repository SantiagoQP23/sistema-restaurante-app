import { Card, CardContent, Accordion, AccordionSummary, Typography, AccordionDetails, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material"
import { FC, useContext, useState } from "react"
import { DriveFileRenameOutlineOutlined } from '@mui/icons-material';
import { useAsync, useFetchAndLoad } from "../../../../hooks";
import { ITable } from "../../../../models";
import { getTables } from "../../Tables/services";
import { OrderContext } from '../context/Order.context';

export const TableOrder: FC = () => {

  const {setTable, table} = useContext(OrderContext);

  const { loading, callEndpoint } = useFetchAndLoad();

  const [tables, setTables] = useState<ITable[]>([]);

  const getTablesCall = async () => await callEndpoint(getTables());

  const loadTablesState = (data: ITable[]) => {
   setTables(data);
  }


  const changeTable = (tableId: number) => {

    const table = tables.find(t => t.id === tableId);

    setTable(table!);


  }



  useAsync(getTablesCall, loadTablesState, () => {}, []);



  return (
    <>
      <Card>
        <CardContent>
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Mesa</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={table?.id}
                  label="Mesa del pedido"

                  onChange={ (e) => changeTable(Number(e.target.value))}

                >
                  {
                    tables.map(table => (
                      <MenuItem key={table.id} value={table.id}>Mesa {table.name}</MenuItem>

                    ))
                  }

                </Select>
              </FormControl>

            </AccordionDetails>
          </Accordion>

        </CardContent>
      </Card>


    </>
  )
}
