
import { lazy } from 'react'

import { RouteObject } from 'react-router'
import { PrivateRoutes } from '../../../../models/routes.model';
import { AddUser } from '../components/AddUser/AddUser.component';
import { EditUser } from '../components/EditUser/EditUser.component';
import { UsersList } from '../pages/UsersList.page';


const Users = lazy(() => import('../Users.page'))

export const UsersRouter: RouteObject = {


  path: PrivateRoutes.USERS,
  element: <Users />,
  children: [
    {
      path: '',
      element: <UsersList />
    },
    {
      path: 'edit',
      element: <EditUser />
    },
    {
      path: 'add',
      element: <AddUser />
    },
  ]
}