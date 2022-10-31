import { lazy, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { checkAuthToken, selectAuth } from '../redux/slices/auth';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { RoutesWithNotFound } from '../helpers';
import { PublicRoutes } from '../models';


const Login = lazy(() => import('../pages/Login/Login.page'))
const Private = lazy(() => import('../pages/Private/Private'))


export const AppRouter = () => {

  const dispatch = useAppDispatch();

  const { status } = useAppSelector(selectAuth);


  useEffect(() => {
    dispatch(checkAuthToken());
  }, [])

/* 
  if (status === 'checking') {
    return <h3>Cargando...</h3>
  }
 */

  return (

    <RoutesWithNotFound>
      {
        (status === 'not-authenticated')
          ? (
            <>

              <Route path={PublicRoutes.LOGIN} element={<Login />}></Route>
              
              <Route path='/*' element={<Navigate to={PublicRoutes.LOGIN} />} />
            </>
          )
          : (
           
              <Route path='/*' element={<Private />} />
            
            


          )
      }

    </RoutesWithNotFound>


  )
}
