import { ValidHolidays } from '../models/holiday.model';


export interface UpdateHolidayDto {
  name?: ValidHolidays;
  date?: string;
  value?: number;
  isActive?: boolean;
}