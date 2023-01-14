import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom';

import { checkAuthToken, selectAuth } from '../redux/slices/auth';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { RoutesWithNotFound } from '../helpers';
import { PublicRoutes } from '../models';


const Login = lazy(() => import('../pages/Public/Login/Login.page'))
const Signup = lazy(() => import('../pages/Public/Signup/Signup.page'))
const ForgotPassword = lazy(() => import('../pages/Public/ForgotPassword/ForgotPassword.page'));
const ResetPassword = lazy(() => import('../pages/Public/ResetPassword/ResetPassword.page'));

const Private = lazy(() => import('../pages/Private/Private'));

export const AppRouter = () => {

  const dispatch = useAppDispatch();

  const { status } = useAppSelector(selectAuth);


  useEffect(() => {
    dispatch(checkAuthToken());
  }, [])

  return (

    <Routes>
      {
        (status === 'checking' || status === 'not-authenticated')
          ? (
            <>

              <Route path={ PublicRoutes.LOGIN} element={<Login />}></Route>
              <Route path={ PublicRoutes.SIGNUP} element={<Signup />}></Route>
              <Route path={ PublicRoutes.FORGOT_PASSWORD} element={<ForgotPassword />}></Route>
              <Route path={ PublicRoutes.RESET_PASSWORD} element={<ResetPassword />}></Route>
              <Route path='/*' element={<Navigate to={PublicRoutes.LOGIN} />} />
            </>
          )
          : (

            <Route path='/*' element={<Private />} />

          )
      }

    </Routes>


  )
}
