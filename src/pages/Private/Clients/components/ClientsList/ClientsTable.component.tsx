import { ChangeEvent, FC, useState } from 'react';

import { Box, Card, Checkbox, IconButton, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography, useTheme } from '@mui/material/';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchAndLoad, useAsync } from '../../../../../hooks';
import { loadClients, selectClients, setActiveClient } from '../../../../../redux/slices/clients/clients.slice';
import { getClients } from '../../services';

import { IClient } from '../../../../../models/client.model';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useNavigate } from 'react-router-dom';
import { statusModalDeleteClient } from '../../services/clients.service';


interface Props {
  client?: IClient;
  clients: IClient[];
}



const TableRowClient: FC<{ client: IClient }> = ({ client }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const theme = useTheme();

  const editClient = (client: IClient) => {
    dispatch(setActiveClient(client));
    navigate('edit')
  }

  const deleteClient = () => {
    console.log('deleteClient')
    statusModalDeleteClient.setSubject(true, client);
  }


  return (
    < TableRow >
      <TableCell padding='checkbox'>
        <Checkbox
          color="primary"
        />

      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {client.person.firstName}
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
          {client.person.lastName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"

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
          {client.person.identification.num}
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
          {client.person.email}
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
        <Tooltip title="Delete Order" arrow>
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
        </Tooltip>
      </TableCell>





    </TableRow>
  )
}


export const ClientsTable: FC<Props> = ({ client, clients }) => {


  const dispatch = useDispatch();


  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const { loading, callEndpoint } = useFetchAndLoad();


  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };




  const getClientsCall = async () => await callEndpoint(getClients())

  const loadClientsState = (data: IClient[]) => { dispatch(loadClients(data)); }

  //useAsync(getClientsCall, loadClientsState, () => { }, []);





  return (
    <Box sx={{ height: 400, width: '100%', my: 1 }} >

      {
        loading &&
        <LinearProgress />
      }
      <Card>

        <TableContainer>
          <Table>
            <TableHead>

              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"

                  />
                </TableCell>
                <TableCell>Apellidos</TableCell>
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
                client
                  ? <TableRowClient client={client} />
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