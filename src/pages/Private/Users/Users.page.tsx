import { Container, Button } from '@mui/material';
import { useDispatch } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { PageTitleWrapper, PageTitle } from "../../../components/ui"
import { useAsync, useFetchAndLoad } from "../../../hooks"
import { IUser } from "../../../models"
import { loadUsers, resetActiveUser } from "../../../redux"
import { getUsers } from './services/users.service';
import { TitlePage } from "../components/TitlePage.component"
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useUsers } from './hooks/useUsers';

const Users = () => {

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();

  const navigate = useNavigate();



  const usersQuery = useUsers();


  // const getUsersCall = async () => await callEndpoint(getUsers())

  // const loadUsersState = (data: IUser[]) => { dispatch(loadUsers(data)); }

  // useAsync(getUsersCall, loadUsersState, () => { }, []);

  return (
    <div>

      <Container maxWidth='lg'>
       

        <Outlet />
      </Container>
    </div>
  )
}
export default Users