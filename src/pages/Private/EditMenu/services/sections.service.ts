import { restauranteApi } from "../../../../api";
import { loadAbort } from "../../../../helpers";

import { ISection, ICreateSection, IUpdateSection, ICreateCategory, ICategory, IProduct, ICreateProduct } from "../../../../models";





export const createSection = (data: ICreateSection) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.post<ISection>('/sections',
    data,
    { signal: controller.signal }),
    controller
  }


}

export const updateSection = (id: string,data: ICreateSection) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<ISection>(`/sections/${id}`,
    data,
    { signal: controller.signal }),
    controller
  }


}
export const createCategory = (data: ICreateCategory) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.post<ICategory>('/categories',
    data,
    { signal: controller.signal }),
    controller
  }


}

export const updateCategory = (id: string,data: ICreateCategory) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<ICategory>(`/categories/${id}`,
    data,
    { signal: controller.signal }),
    controller
  }


}
export const createProduct = (data: ICreateProduct) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.post<IProduct>('/products',
    data,
    { signal: controller.signal }),
    controller
  }


}

export const updateProduct = (id: string,data: ICreateProduct) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<ISection>(`/products/${id}`,
    data,
    { signal: controller.signal }),
    controller
  }


}


