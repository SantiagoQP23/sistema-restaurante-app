
import { lazy } from 'react'
import { RouteObject } from 'react-router'

import { PrivateRoutes } from '../../../../models/routes.model';
import { AddUser } from '../components/AddUser/AddUser.component';
import { UsersList } from '../pages/UsersList.page';

import { EditUser } from '../components/EditUser/EditUser.component';

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