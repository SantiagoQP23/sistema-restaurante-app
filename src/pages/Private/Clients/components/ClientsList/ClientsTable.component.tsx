import { ChangeEvent, FC, useState } from 'react';

import {
  Box, Card, Checkbox, IconButton,
  LinearProgress, Switch, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow,
  Tooltip, Typography, useTheme
} from '@mui/material/';

import { useDispatch, } from 'react-redux';
import { useFetchAndLoad, } from '../../../../../hooks';
import { loadClients, setActiveClient, updateClient } from '../../../../../redux/slices/clients/clients.slice';
import { getClients } from '../../services';

import { IClient } from '../../../../../models/client.model';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useNavigate } from 'react-router-dom';
import { statusModalDeleteClient, updateClient as updateClientS } from '../../services/clients.service';
import { useSnackbar } from 'notistack';


interface Props {
  clientFound?: IClient;
  clients: IClient[];
}



const TableRowClient: FC<{ client: IClient }> = ({ client }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const theme = useTheme();

  const {enqueueSnackbar} = useSnackbar();

  const editClient = (client: IClient) => {
    dispatch(setActiveClient(client));
    navigate('edit')
  }



  const deleteClient = () => {
    console.log('deleteClient')
    statusModalDeleteClient.setSubject(true, client);
  }

  const submitChangeStatus = async (client: IClient) => {

    await callEndpoint(updateClientS( client.id, {isActive: !client.isActive}))
    .then((res) => {
      console.log(res);
      dispatch(updateClient({...client, isActive: !client.isActive}));

    })  
    .catch((err) => {
      console.log(err);
      enqueueSnackbar('Error al actualizar el estado del usuario', {variant: 'error'})
    })



  }




  return (
    < TableRow >
      <TableCell padding='checkbox'>
        <Switch checked={client.isActive} onClick={() => submitChangeStatus(client)} color={client.isActive ? 'success' : 'warning'} />


      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {client.person?.lastName} {client.person?.firstName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {client.person.identification.type}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"

          color="text.primary"
          gutterBottom
          noWrap
        >
          {client.person?.identification.num}

        </Typography>
      </TableCell>

      <TableCell>
        <Typography
          variant="body1"

          color="text.primary"
          gutterBottom
          noWrap
        >
          {client.address}
        </Typography>
      </TableCell>
     
      <TableCell>
        <Typography
          variant="body1"

          color="text.primary"
          gutterBottom
          noWrap
        >
          {client.person?.email}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Tooltip title="Edit Order" arrow>
          <IconButton
            sx={{
              '&:hover': {
                background: theme.colors.primary.lighter
              },
              color: theme.palette.primary.main
            }}
            color="inherit"
            size="small"
            onClick={() => editClient(client)}
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Delete Order" arrow>
          <IconButton
            sx={{
              '&:hover': { background: theme.colors.error.lighter },
              color: theme.palette.error.main
            }}
            color="inherit"
            size="small"
            onClick={deleteClient}
          >
            <DeleteTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip> */}
      </TableCell>




    </TableRow>
  )
}


export const ClientsTable: FC<Props> = ({ clientFound, clients }) => {

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };






  return (
    <Box sx={{ height: 400, width: '100%', my: 1 }} >

      <Card>

        <TableContainer>
          <Table>
            <TableHead>

              <TableRow>
                <TableCell padding="checkbox">
                  Estado
                </TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Tipo de identificación</TableCell>
                <TableCell>Número de identificación</TableCell>
                <TableCell>address</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              {
                clientFound
                  ? <TableRowClient client={clientFound} />
                  : clients.length > 0 && clients.map(client => (

                    <TableRowClient client={client} key={client.id} />))


              }
            </TableBody>

          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={clients.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>




    </Box>
  );
}