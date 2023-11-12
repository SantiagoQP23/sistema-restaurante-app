import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { IProduct } from "../../../../models";
import { CreateProductDto, UpdateProductDto } from "../dto/";
import {
  UpdateProductImageDto,
  createProduct,
  getProduct,
  updateProduct,
  updateProductImage,
} from "../services/menu.service";

export const useProducts = () => {};

export const useProduct = (id: string) => {
  return useQuery<IProduct, unknown>(["product", id], () => getProduct(id));
};

export const useCreateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IProduct, unknown, CreateProductDto>(
    (data) => createProduct(data),
    {
      onSuccess: () => {
        enqueueSnackbar("Se creó correctamente", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("No se pudo crear", { variant: "error" });
      },
    }
  );
};

export const useUpdateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IProduct, unknown, UpdateProductDto>(
    (data) => updateProduct(data.id, data),
    {
      onSuccess: () => {
        enqueueSnackbar("Se actualizó correctamente", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("No se pudo actualizar", { variant: "error" });
      },
    }
  );
};

export const useUpdateImageProduct = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IProduct, unknown, UpdateProductImageDto>(
    (data) => updateProductImage(data.id, data),
    {
      onSuccess: () => {
        enqueueSnackbar("Se actualizó correctamente", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("No se pudo actualizar la imagen", {
          variant: "error",
        });
      },
    }
  );
};
