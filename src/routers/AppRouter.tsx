import { lazy, useEffect } from 'react';
import { Navigate, Route, useRoutes } from 'react-router-dom';

import { checkAuthToken, selectAuth } from '../redux/slices/auth';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { RoutesWithNotFound } from '../helpers';
import { PublicRoutes } from '../models';
import { PublicRouter } from '../pages/Public/router/public.router';


const Login = lazy(() => import('../pages/Public/pages/Login/Login.page'))
const Signup = lazy(() => import('../pages/Public/pages/Signup/Signup.page'))
const Private = lazy(() => import('../pages/Private/Private'))


export const AppRouter = () => {

  const dispatch = useAppDispatch();

  const content = useRoutes(PublicRouter);

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
              <Route path={PublicRoutes.SIGNUP} element={<Signup />}></Route>
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
