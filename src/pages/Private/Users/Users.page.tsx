import {FC} from 'react';

import { Container, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { PageTitleWrapper, PageTitle } from "../../../components/ui"
import { useAsync, useFetchAndLoad } from "../../../hooks"
import { IUser, Roles } from "../../../models"
import { loadUsers, resetActiveUser, selectAuth } from "../../../redux"
import { getUsers } from './services/users.service';
import { TitlePage } from "../components/TitlePage.component"
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useUsers } from './hooks/useUsers';
import { UnauthorizedPage } from '../../Status/Unauthorized.page';
import { ValidRoles } from '../Common/models/valid-roles.model';

interface Props{
  allowedRoles: ValidRoles[]
}

const Users:FC<Props> = ({allowedRoles}) => {

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {user} = useSelector(selectAuth);



  const usersQuery = useUsers();


  // const getUsersCall = async () => await callEndpoint(getUsers())

  // const loadUsersState = (data: IUser[]) => { dispatch(loadUsers(data)); }

  // useAsync(getUsersCall, loadUsersState, () => { }, []);

  if( user && !allowedRoles.includes(user.role.name as ValidRoles)){
    return <UnauthorizedPage />
  }

  return (
    <div>

      <Container maxWidth='lg'>
       
        <Outlet />
      </Container>
    </div>
  )
}
export default Users