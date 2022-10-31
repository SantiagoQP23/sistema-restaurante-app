import { restauranteApi } from "../../../../api";
import { loadAbort } from "../../../../helpers";
import { ICreateTable, ITable } from "../../../../models";






export const getTables = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<ITable>('/tables',
    { signal: controller.signal }),
    controller
  }


}


export const createTable = (data: ICreateTable) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.post<ITable>('/tables',
    data,
    { signal: controller.signal }),
    controller
  }


}

export const updateTable = ({id, data }: {id: number,data: ICreateTable}) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<ITable>(`/tables/${id}`,
    data,
    { signal: controller.signal }),
    controller
  }


}

export const deleteTable = (id: number) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.delete(`/tables/${id}`,
    { signal: controller.signal }),
    controller
  }


}