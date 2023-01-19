

export interface CreateTableDto {
  name: string;
  description: string;
  chairs: number;
}

export interface UpdateTableDto {
  name?: string;
  description?: string;
  chairs?: number;
}
