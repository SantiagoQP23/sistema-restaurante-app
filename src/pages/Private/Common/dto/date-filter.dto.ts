// import { Period } from "../../..//models/period.model";

import { Period } from "../../../../models/period.model";


export interface DateFilterDto {
  startDate?: Date | null;
  endDate?: Date | null;
  period?: Period;

}