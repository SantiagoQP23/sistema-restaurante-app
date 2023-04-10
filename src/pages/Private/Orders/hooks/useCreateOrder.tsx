import { useState, useContext } from "react";
import { SocketContext } from "../../../../context";
import {  CreateOrderDto } from "../dto/create-order.dto";
import { EventsEmitSocket } from "../interfaces/events-sockets.interface";
import { useDispatch } from "react-redux";
import { setActiveOrder } from "../../../../redux";
import { useSnackbar } from "notistack";
import { SocketResponseOrder } from "../interfaces/responses-sockets.interface";
import { OrderContext } from "../context/Order.context";
import { useNavigate } from "react-router-dom";



export const useCreateOrder = () => {

  const [loading, setLoading] = useState(false);

  const { socket } = useContext(SocketContext);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const {reset} = useContext(OrderContext);

  const navigate = useNavigate();


 const createOrder = async (order: CreateOrderDto) => {

    setLoading(true);

    socket?.emit(EventsEmitSocket.createOrder, order, (resp: SocketResponseOrder) => {

      console.log('orden creada', resp)

      setLoading(false);
      if (resp.ok) {

        navigate('/orders');
        reset();
      } else {
        enqueueSnackbar(resp.msg, { variant: 'error' });
      }


    });

  }



  return {
    loading,
    createOrder
  }





}