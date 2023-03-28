export interface ISection {
  id: string;
  name: string;
  categories: ICategory[];
  isActive: boolean;

}



export interface ISectionCategory {
  id: string;
  name: string;

}

export interface ICreateSection {
  name: string;
}

export interface IUpdateSection {
  name?: string;
}

export interface ICategory {
  id: string;
  name: string;
  products: IProduct[]
  section: ISectionCategory;
  isActive: boolean;

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
  AVAILABLE = 'AVAILABLE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  OUT_OF_SEASON = 'OUT_OF_SEASON',
}
export enum ProductStatusSpanish {
  AVAILABLE = 'DISPONIBLE',
  OUT_OF_STOCK = 'AGOTADO',
  OUT_OF_SEASON = 'FUERA DE TEMPORADA',
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string;
  status: ProductStatus;
  isActive: boolean;
  
  category: ICategoryProduct;
  
  
}

export interface ICreateProduct{
  
  name: string;
  price: number;
  description: string;
  categoryId: string;
  status: ProductStatus;
  
}
