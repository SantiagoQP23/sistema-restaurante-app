import { ValidHolidays } from '../models/holiday.model';


export interface CreateHolidayDto {
  name: ValidHolidays;
  date: string;
  value: number;
}