import { ProductionArea } from "../pages/Private/Common/models/production-area.model";

export interface Menu {
  sections: ISection[];
  categories: ICategory[];
  products: IProduct[];
}

export interface ISection {
  id: string;
  name: string;
  categories: ICategory[];
  order: number;
  isPublic: boolean;
  isActive: boolean;
}

export interface ISectionCategory {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  name: string;
  products: IProduct[];
  section: ISectionCategory;
  isActive: boolean;
  isPublic: boolean;
}

export interface ICategoryProduct {
  id: string;
  name: string;
  section: ISectionCategory;
}

export interface ICreateCategory {
  name: string;
  sectionId: string;
}

export enum ProductStatus {
  AVAILABLE = "AVAILABLE",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  OUT_OF_SEASON = "OUT_OF_SEASON",
}
export enum ProductStatusSpanish {
  AVAILABLE = "Disponible",
  OUT_OF_STOCK = "Agotado",
  OUT_OF_SEASON = "Fuera de temporada",
}

/**
 * Product interface.
 * @author Santiago Quirumbay
 * @version 1.1 16/12/2023 Adds productionArea field.
 * @version 1.2 17/12/2023 Adds unitCost and quantity fields.
 */
export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string;
  status: ProductStatus;
  isActive: boolean;
  isPublic: boolean;
  category: ICategoryProduct;
  productionArea: ProductionArea;
  unitCost: number;
  quantity: number;
}

export interface ICreateProduct {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  status: ProductStatus;
  isActive: boolean;
}
