import { FC } from "react";

import { PersonOutline } from "@mui/icons-material"
import { Card, CardActionArea, Box, Typography, Chip } from "@mui/material"
import { ITable } from "../../../../../../models"
import { useSelector } from "react-redux";
import { selectOrders } from "../../../../../../redux";


interface Props {
  table: ITable;
  handleClickTable: (table: ITable) => void;

}

export const Table: FC<Props> = (
  { table, handleClickTable }
) => {


  const {orders} = useSelector(selectOrders);

  const ordersTable = orders.filter(order => order.table?.id === table.id); 



  return (


    <Card>
      <CardActionArea onClick={() => handleClickTable(table)}>

        <Box

          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}

        >

          <Typography variant='h4'>
            Mesa {table.name}
          </Typography>

          <Chip
            size='small'
            label={
              <Typography fontSize={12} display='flex' alignItems='center'>

                {
                  table.isAvailable

                    ? 'Disponible'
                    : <>
                      <PersonOutline
                        fontSize={'small'}
                      />
                      {ordersTable!.reduce((acc, order) => acc + order.people, 0)} - Ocupada

                    </>
                }
              </Typography>
            }
            color={table.isAvailable ? 'success' : 'default'}
          />
        </Box>


      </CardActionArea>

    </Card>

  )
}