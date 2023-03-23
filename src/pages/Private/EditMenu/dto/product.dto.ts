import { ProductStatus } from '../../../../models/menu.model';


export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  //image: string;
  categoryId: string;
  status: ProductStatus;
  
}


export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  //image: string;
  categoryId?: string;
  status?: ProductStatus;
  isActive?: boolean;
}