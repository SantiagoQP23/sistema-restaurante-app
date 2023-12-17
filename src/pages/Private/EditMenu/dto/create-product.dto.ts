import { ProductStatus } from "../../../../models";

export interface CreateProductDto {
  name: string;
  price: number;
  categoryId: string;
  description?: string;
  status?: ProductStatus;
  productionAreaId: number;
}