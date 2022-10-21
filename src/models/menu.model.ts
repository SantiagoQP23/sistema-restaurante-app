export interface ISection{
  id: string;
  name: string;
  categories?: ICategory[];

}

export interface ICategory{
  id: string;
  name: string;
  products?: IProduct[]
  section: ISection;

}


export interface IProduct{
  id: string;
  name: string;
  price: number;
  description: string;

  category: ICategory;
  

}
