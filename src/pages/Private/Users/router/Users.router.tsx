
import { lazy } from 'react'
import { RouteObject } from 'react-router'

import { PrivateRoutes } from '../../../../models/routes.model';
import { AddUser } from '../components/AddUser/AddUser.component';
import { UsersList } from '../pages/UsersList.page';

import { EditUser } from '../components/EditUser/EditUser.component';
import { Profile } from '../views/Profile/Profile.view';
import { Account } from '../views/Account/Account.view';
import { Roles } from '../../../../models';
import { ValidRoles } from '../../Common/models/valid-roles.model';

const Users = lazy(() => import('../Users.page'))

export const UsersRouter: RouteObject = {


  path: PrivateRoutes.USERS,
  element: <Users allowedRoles={[ValidRoles.admin]} />,
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
    {
      path: 'profile',
      element: <Profile/>
    },
    {
      path: 'account',
      element: <Account/>
    }
  ]
}