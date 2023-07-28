import { Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, lighten, styled, Typography } from "@mui/material"
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { EditOutlined } from "@mui/icons-material";
import { ITable } from "../../../../models";
import { FC } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveTable } from "../../../../redux/slices/tables";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Box } from "@mui/system";
import { Label } from '../../../../components/ui/Label';
import { statusModalDeleteTable } from '../services/tables.service';
import { useUpdateTable } from "../hooks/useTables";
import { UpdateTableDto } from "../dto/table.dto";

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

interface Props {
  table: ITable
}




export const CardTable: FC<Props> = ({ table }) => {


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const updateTableMutation = useUpdateTable();

  const editTable = () => {
    dispatch(setActiveTable(table))
    navigate('edit');
  }


  const deleteTable = () => {
    statusModalDeleteTable.setSubject(true, table);
    console.log('deleteTable')

  }

  const enableTable = () => {

    const data: UpdateTableDto = {
      isActive: true,
      id: table.id
    }

    updateTableMutation.mutate(data);


  }

  return (
    <>
      <Card >

        <CardHeader
          title={`Mesa ${table.name}`}
          avatar={

            <TableRestaurantIcon />
          }
          subheader={`Asientos: ${table.chairs}`}
          titleTypographyProps={{
            variant: 'h5'
          }}

          action={


            <Box display='flex' alignItems='center'>
              {
                table.isActive
                  ? (<>
                    <IconButton
                      onClick={editTable}
                      color="primary"
                    >
                      <EditOutlined fontSize="medium" />
                    </IconButton>

                    <IconButtonError onClick={deleteTable}>
                      <DeleteTwoToneIcon fontSize="medium" />
                    </IconButtonError>

                  </>)
                  : (<Button
                    variant="outlined"
                    size="small"
                    onClick={enableTable}

                  >
                    Habilitar
                  </Button>)
              }

            </Box>
          }
        />


      </Card>
    </>
  )
}