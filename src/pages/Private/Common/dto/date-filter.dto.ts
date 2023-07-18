// import { Period } from "../../..//models/period.model";

import { GroupBy, Period } from "../../../../models/period.model";
import { groupBy } from 'rxjs';


export interface DateFilterDto {
  startDate?: Date | null;
  endDate?: Date | null;
  period?: Period;
  groupBy?: GroupBy;

}