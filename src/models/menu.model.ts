export interface ISection {
  id: string;
  name: string;
  categories?: ICategory[];

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
  products?: IProduct[]
  section: ISection;

}

export interface ICreateCategory {
  name: string;
  sectionId: string;
}






export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string;
  stock: number;
  
  category: ICategory;
  
  
}

export interface ICreateProduct{
  
  name: string;
  price: number;
  description: string;
  stock: number;
  categoryId: string;
  
}
