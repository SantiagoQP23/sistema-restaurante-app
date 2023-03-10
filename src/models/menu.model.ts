export interface ISection {
  id: string;
  name: string;
  categories: ICategory[];

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
  OUTOFSTOCK = 'OUT_OF_STOCK',
  OUTOFSEASON = 'OUT_OF_SEASON',
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string;
  status: ProductStatus;
  
  category: ICategoryProduct;
  
  
}

export interface ICreateProduct{
  
  name: string;
  price: number;
  description: string;
  stock: number;
  categoryId: string;
  
}
