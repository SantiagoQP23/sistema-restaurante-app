

import { AppThunk } from "../../store";
// import { fetchConToken } from "../helpers/fetch";
import { onChecking, onLogin, onLogout, clearErrorMessage } from ".";

import { restauranteApi } from '../../../api';
import { IFormLogin } from "../../../models";





export const startLogin = ({username, password}: IFormLogin): AppThunk => async (

  dispatch) => {

  dispatch(onChecking());

  try {
    const { data } = await restauranteApi.post('/auth/login', { username, password });

    
    localStorage.setItem('token', data.token);
    localStorage.setItem('token-init-date', String(new Date().getTime()));

    dispatch(onLogin(data.user));

  } catch (error) {
    dispatch(onLogout('Credenciales incorrectas'));
  }

}








export const startLogout = (msg: string = ''): AppThunk => (dispatch) => {

  dispatch(onLogout(msg));
  //dispatch(onLogoutChat());
  localStorage.clear();
  setTimeout(() => {
    dispatch(clearErrorMessage());
  }, 3000)


}




 /*    const resp = await fetchSinToken('auth/login', {
      nombreUsuario, password
  }, 'POST')

  const body = await resp.json();

  if (resp.ok) {
    
    localStorage.setItem('x-token', body.token);
    dispatch(authLogin(body.usuario))
    
  } else {
    dispatch(authError(body.msg))
    console.log('Error', body.msg, 'error');
  } 
  
};

*/

export const checkAuthToken = (): AppThunk => async (
  dispatch,
  getState) => {

    const token = localStorage.getItem('token');

    if(!token )
      return dispatch(onLogout(''));

    try {
      const {data} = await restauranteApi.get('auth/auth-renew')
      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', String(new Date().getTime()) );
  
      dispatch(onLogin(data.user));

    } catch (error) {
      localStorage.clear();
      dispatch(onLogout(''));
      
    }

    /* const resp = await fetchConToken('auth/renew');
    const body = await resp.json();
    
    if (resp.ok) {
      // Grabar el nuevo token en la memoria
      localStorage.setItem('x-token', body.token);
      
      const usuario = body.usuario as IUsuario;
      // Establecer informacion del usuario
      dispatch(authLogin(usuario));
      
    } else {
      console.log("Finalizando chequeo")
      dispatch(authCheckingFinish())
      
    } */
  };

  /* 
  
  export const startLogout = (): AppThunk => async (
    dispatch,
    getState) => {
      
      localStorage.removeItem('x-token');
      dispatch(authLogout());
      
};






export const usuarioStartLoad = (): AppThunk => async (
  dispatch,
  getState) => {

  try{
    const resp = await fetchConToken('auth/usuarios');
    const body = await resp.json();
  
    if (resp.ok) {
  
      dispatch(authUsuariosLoad(body.usuarios));
    }

  } catch (error) {
    console.log(error);
  }
  
  
};

export const usuarioStartAdd = ({ nombres, password, idCargo, nombreUsuario }: IUsuario): AppThunk => async (
  dispatch,
  getState) => {

    const resp = await fetchConToken(
      'auth/usuarios/crear',
      { nombres, password, idCargo, nombreUsuario },
      'POST');
      
      const body = await resp.json();
      
  if (resp.ok) {

    dispatch(authUsuarioAdd(body.usuario));
    toast.success(body.msg);
    
  } else {
    toast.error(body.errors[0].msg);
    
  }
  
};
*/
export const usuarioStartDelete = (): AppThunk => async (
  dispatch,
  getState) => {

};

export const usuarioStartUpdate = (): AppThunk => async (
  dispatch,
  getState) => {

};
