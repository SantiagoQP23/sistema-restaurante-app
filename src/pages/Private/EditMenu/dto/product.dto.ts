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
  id: string;
  name?: string;
  description?: string;
  price?: number;
  //image: string;
  categoryId?: string;
  status?: ProductStatus;
  isActive?: boolean;
}