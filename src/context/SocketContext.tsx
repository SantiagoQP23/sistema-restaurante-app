import React, { createContext, FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../hooks/useRedux";
import { useSocket } from "../hooks/useSocket";
import { selectAuth } from "../redux/slices/auth";
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_WS_URL } = getEnvVariables();


interface ISocket{
  socket: Socket | null;
  online: boolean | undefined;
 
}

interface Props {
  children: React.ReactNode;
}

export const SocketContext = createContext({} as ISocket);



export const SocketProvider:FC<Props> = ({children}) => {

  const { socket, online, conectarSocket, desconectarSocket} = useSocket(VITE_WS_URL);

  const { status } = useSelector(selectAuth);

  //const {usuario, status} = useAppSelector(selectAuth);

  useEffect(() => {

    //console.log(usuario?.online)
     
    if(status === 'not-authenticated'){

      console.log("Desconectando socket");
      desconectarSocket();
    }

  }, [status, desconectarSocket]);
  

  useEffect(() => {
    
    if(status === 'authenticated'){
      console.log("conectando socket");
      conectarSocket();

    }  

  }, [status, conectarSocket])  



  return (

    <SocketContext.Provider value={{socket, online}}>
      {children}
    </ SocketContext.Provider>

  )
}