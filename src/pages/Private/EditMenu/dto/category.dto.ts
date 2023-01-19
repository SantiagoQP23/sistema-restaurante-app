
export interface CreateCategoryDto {
  name: string;
  sectionId: string;
}



export interface UpdateCategoryDto {
  name?: string;
  sectionId?: string;
}