import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, Roles } from "../models";


interface Props{
  rol: Roles;

}



const RolGuard = ({rol}: Props) => {

  // Obtener la información del usuario

  return user.rol.name === rol ? <Outlet /> : <Navigate replace to={PrivateRoutes.MENU}/>; 
}
export default RolGuard