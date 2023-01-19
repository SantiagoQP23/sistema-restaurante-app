

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  //image: string;
  categoryId: string;
  stock: number;
}


export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  //image: string;
  categoryId?: string;
  stock?: number;
}