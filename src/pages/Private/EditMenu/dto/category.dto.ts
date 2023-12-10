export interface CreateCategoryDto {
  name: string;
  sectionId: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  id: string;
  isActive?: boolean;
  isPublic?: boolean;
}
