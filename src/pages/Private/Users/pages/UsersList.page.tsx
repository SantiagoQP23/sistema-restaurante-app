import { Grid, Paper, InputBase, IconButton, CircularProgress, Button, MenuItem, Select } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useFetchAndLoad } from "../../../../hooks";
import { TypeIdentification } from "../../../../models/common.model";
import { resetActiveUser } from "../../../../redux";
import { createClient } from "../../Clients/services";

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { UsersTable } from "../components/UsersTable/UsersTable.component";
import { selectUsers } from '../../../../redux/slices/users/users.slice';
import { getUser } from '../services/users.service';
import { IUser } from '../../../../models/auth.model';
import { DeleteUser } from '../components/DeleteUser/DeleteUser.component';

export const UsersList = () => {

  const [identification, setIdentification] = useState<string>('');

  const { users } = useSelector(selectUsers);

  const [user, setUser] = useState<IUser>();


  const { loading, callEndpoint } = useFetchAndLoad();


  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();

  const createUser = () => {
    dispatch(resetActiveUser())
    navigate('add');

  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdentification(event.target.value);
  };




  const searchUser = async () => {
    if (identification.length === 0) {
      enqueueSnackbar('Ingrese un número de identificación', { variant: 'error' })
      return;
    }

    if (identification.length === 10 || identification.length === 13) {

      await callEndpoint(getUser(identification))
        .then((response) => {
          const { data } = response;
          setUser(data);
        })
        .catch((error) => {
          enqueueSnackbar('No se encontró al usuario', { variant: 'error' })
        })
    }else {
        enqueueSnackbar('El número de identificación es incorrecto', { variant: 'error' })
        return;
      }

  }

  return (
    <>

      <Grid container justifyContent="space-between" alignItems="center">




        <Grid item>

          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >

            <InputBase
              type='number'
              onChange={handleChange}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Número de identificación"
              inputProps={{ 'aria-label': 'Buscar cliente' }}
            />
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={searchUser}
            >
              {
                loading
                  ? <CircularProgress size={20} />
                  : <SearchIcon />
              }
            </IconButton>


          </Paper>
        </Grid>

        <Grid item>

          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={createUser}
          >
            Añadir usuario
          </Button>

        </Grid>

      </Grid>

      <UsersTable users={users} user={user}/>

      <DeleteUser />




    </>
  )
}