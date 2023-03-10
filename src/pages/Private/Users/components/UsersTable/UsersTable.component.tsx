import { ChangeEvent, FC, useState } from "react";

import { Box, Card, Checkbox, IconButton, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { selectUsers, setActiveUser } from '../../../../../redux/slices/users/users.slice';
import { useSelector, useDispatch } from 'react-redux';
import { IUser } from '../../../../../models/auth.model';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/';
import { statusModalDeleteUser } from '../../services/users.service';
import useEffect from 'react';




export const TableRowUser: FC<{ user: IUser }> = ({ user }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const theme = useTheme();

  const editUser = (user: IUser) => {
    dispatch(setActiveUser(user));
    navigate('edit')
  }

  const deleteUser = () => {
    statusModalDeleteUser.setSubject(true, user);
  }


 
  return (
    <TableRow>
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
          {user.person.lastName} {user.person.firstName}
        </Typography>
      </TableCell>
      
     
      <TableCell>
        <Typography
          variant="body1"

          color="text.primary"
          gutterBottom
          noWrap
        >
          {user.person.identification.num}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"

          color="text.primary"
          gutterBottom
          noWrap
        >
          {user.username}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"

          color="text.primary"
          gutterBottom
          noWrap
        >
          {user.person.email}
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
            onClick={() => editUser(user)}
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
            onClick={deleteUser}
          >
            <DeleteTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>

    </TableRow>

  )
}



interface Props {
  user?: IUser;
  users: IUser[];
}

export const UsersTable: FC<Props> = ({ users, user }) => {

  const { loading, callEndpoint } = useFetchAndLoad();
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const theme = useTheme();


  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const editUser = (user: IUser) => {
    dispatch(setActiveUser(user));
    navigate('edit')
  }

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
                <TableCell>Apellidos y nombres</TableCell>
                <TableCell>N??mero de identificaci??n</TableCell>
                <TableCell>Nombre de usuario</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              {
                user
                  ? <TableRowUser user={user} />
                  : users.length > 0 && users.map(user => (
                    <TableRowUser key={user.id} user={user} />
                  ))


              }
            </TableBody>

          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={users.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>




    </Box>)
}