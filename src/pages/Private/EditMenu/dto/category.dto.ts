
export interface CreateCategoryDto {
  name: string;
  sectionId: string;
}



export interface UpdateCategoryDto {
  id: string;
  name?: string;
  sectionId?: string;
  isActive?: boolean;
}