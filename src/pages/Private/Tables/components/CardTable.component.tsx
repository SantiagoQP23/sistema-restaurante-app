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

  const editTable = () => {
    dispatch(setActiveTable(table))
    navigate('edit');
  }


  const deleteTable = () =>{
    statusModalDeleteTable.setSubject(true, table);
    console.log('deleteTable')

  }

  return (
    <>
      <Card >
          
        <CardContent sx={{textAlign: 'center'}}>
          <Box display='flex' alignItems='center' justifyContent='center' >
            <TableRestaurantIcon />
            <Typography variant="body1" fontWeight="bold" pl={1}>
              Mesa {table.name}
            </Typography>

          </Box>
          <Divider sx={{my: 1}} />

          {
            table.isAvailable 
            ? <Label color='success'>Disponible</Label>
            : <Label color='error'>Ocupado</Label>

          }

          <Typography variant="body2" fontWeight="bold" >
            Asientos: {table.chairs}
          </Typography>
          <Typography variant="body2" fontWeight="normal">
            {table.description ? table.description : '...'}
          </Typography>

        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
          <IconButton
            onClick={editTable}
          >
            <EditOutlined fontSize="medium" />
          </IconButton>

          <IconButtonError onClick={deleteTable}>
            <DeleteTwoToneIcon fontSize="medium" />
          </IconButtonError>
        </CardActions>
      </Card>
    </>
  )
}