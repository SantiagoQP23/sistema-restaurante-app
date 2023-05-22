import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { IProduct } from "../../../../models";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import { UpdateProductImageDto, createProduct, updateProduct } from "../services/menu.service";


export const useProducts = () => {
}



export const useCreateProduct = () => {

  const {enqueueSnackbar} = useSnackbar();

  return useMutation<IProduct, unknown, CreateProductDto>((data) => createProduct(data), {

    onSuccess: (data) => {
      enqueueSnackbar('Se creó correctamente', {variant: 'success'})
    },
    onError: (error) => {
      enqueueSnackbar('No se pudo crear', {variant: 'error'})
    }
  });



}


export const useUpdateProduct = () => {

  const {enqueueSnackbar} = useSnackbar();

  return useMutation<IProduct, unknown, UpdateProductDto>((data) => updateProduct(data.id, data), {
    onSuccess: (data) => {
      enqueueSnackbar('Se actualizó correctamente', {variant: 'success'})
    },
    onError: (error) => {
      enqueueSnackbar('No se pudo actualizar', {variant: 'error'})
    }

  });


}


export const  useUpdateImageProduct = () => {

  const {enqueueSnackbar} = useSnackbar();

  return useMutation<IProduct, unknown, UpdateProductImageDto>((data) => updateProduct(data.id, data), {

    onSuccess: (data) => {
      enqueueSnackbar('Se actualizó correctamente', {variant: 'success'})
    },
    onError: (error) => {
      enqueueSnackbar('No se pudo actualizar', {variant: 'error'})
    }
    
  });



}