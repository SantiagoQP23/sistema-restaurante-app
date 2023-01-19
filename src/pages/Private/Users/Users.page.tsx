import { Container } from "@mui/material"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { PageTitleWrapper, PageTitle } from "../../../components/ui"
import { useAsync, useFetchAndLoad } from "../../../hooks"
import { IUser } from "../../../models"
import { loadUsers } from "../../../redux"
import { getUsers } from './services/users.service';

const Users = () => {

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();


  const getUsersCall = async () => await callEndpoint(getUsers())

  const loadUsersState = (data: IUser[]) => { dispatch(loadUsers(data)); }

  useAsync(getUsersCall, loadUsersState, () => { }, []);

  return (
    <div>

      <PageTitleWrapper>
        <PageTitle
          heading='Usuarios'
          subHeading='Administración de empleados del restaurante'
          
        />
      </PageTitleWrapper>

      <Container maxWidth='lg'>
        <Outlet />
      </Container>
    </div>
  )
}
export default Users