import { restauranteApi } from "../../../../api";
import { loadAbort } from "../../../../helpers";

import { ISection, ICreateSection, IUpdateSection, ICreateCategory, ICategory, IProduct, ICreateProduct } from "../../../../models";
import { UpdateCategoryDto, CreateCategoryDto } from '../dto/category.dto';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { UpdateSectionDto } from '../dto/update-section.dto';





export const createSection = (data: ICreateSection) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.post<ISection>('/sections',
    data,
    { signal: controller.signal }),
    controller
  }


}

export const updateSection = (id: string,data: UpdateSectionDto) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<ISection>(`/sections/${id}`,
    data,
    { signal: controller.signal }),
    controller
  }


}

export const deleteSection = (id: string) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.delete(`/sections/${id}`,
    { signal: controller.signal }),
    controller
  }


}




export const createCategory = (data: CreateCategoryDto) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.post<ICategory>('/categories',
    data,
    { signal: controller.signal }),
    controller
  }


}

export const updateCategory = (id: string, data: UpdateCategoryDto) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<ICategory>(`/categories/${id}`,
    data,
    { signal: controller.signal }),
    controller
  }


}

export const deleteCategory = (id: string) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.delete(`/categories/${id}`,
    { signal: controller.signal }),
    controller
  }
}

export const createProduct = (data: CreateProductDto) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.post<IProduct>('/products',
    data,
    { signal: controller.signal }),
    controller
  }

}

export const updateProduct = (id: string,data: UpdateProductDto) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<ISection>(`/products/${id}`,
    data,
    { signal: controller.signal }),
    controller
  }

}

export interface UpdateProductImageDto {
  file: File;
}


export const updateProductImage = (id: string, data: UpdateProductImageDto) => {

  console.log({data})

  const formData = new FormData();
  formData.append('file', data.file);

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<ISection>(`/files/product-image/${id}`,
    formData,
    { signal: controller.signal }),
    controller
  }


}


export const deleteProduct = (id: string) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.delete(`/products/${id}`,
    { signal: controller.signal }),
    controller
  }


}


