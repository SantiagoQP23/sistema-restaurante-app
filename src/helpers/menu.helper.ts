import { IProduct, ISection } from "../models";

export const getAllProducts= (sections: ISection[]) :IProduct[]  => {

  let products: IProduct[] = [];

  for (const section of sections) {
    for (const category of section.categories) {
      for (const product of category.products) {
        products.push(product);
        
      }
      
    }
    
  }

  return products;
}


export const findProductsByName = (name: string, listProducts: IProduct[]): IProduct[] => {

  let products: IProduct[] |  undefined = [];

  products = listProducts.filter(product => product.name.toLowerCase().includes(name.toLowerCase())) ;


  return products || [];

}
