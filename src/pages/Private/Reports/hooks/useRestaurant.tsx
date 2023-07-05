import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Restaurant } from "../models/restaurant.model";
import { getRestaurant, updateRestaurant } from "../services/rules.service";
import { UpdateRestaurantDto } from "../dto/update-restaurant.dto";



export const useRestaurant = () => {

  const { enqueueSnackbar } = useSnackbar();


  return useQuery<Restaurant, unknown>(['restaurant'], () => getRestaurant('1'), {
    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Error al obtener el restaurante', { variant: 'error' });
    }
  });




}


export const useUpdateRestaurant = () => {

  const { enqueueSnackbar } = useSnackbar();


  return useMutation<Restaurant, unknown, UpdateRestaurantDto>((data) => updateRestaurant('1', data), {
    onSuccess: (data) => {
      enqueueSnackbar('Restaurante actualizado', { variant: 'success' });
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Error al actualizar restaurante', { variant: 'error' });
    }

  }); 




}