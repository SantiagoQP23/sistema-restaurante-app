import { Subject } from "rxjs";
import { IClient } from '../../../../models/client.model';
import { ITable } from '../../../../models/table.model';



export class SubjectDeleteTable {
  subject$ = new Subject<{value: boolean, table: ITable}>();

  getSubject(){

    return this.subject$.asObservable();
  }

  setSubject(value: boolean, table: ITable){
    this.subject$.next({value, table});
  }
}


