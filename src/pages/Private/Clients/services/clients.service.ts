import { loadAbort } from "../../../../helpers"
import restauranteApi from '../../../../api/restauranteApi';
import { IClient } from "../../../../models";

export const getClient = (term: string) => {

  const controller = loadAbort();


  return {
    call: restauranteApi.get<IClient>(`clients/${term}`,
      { signal: controller.signal }),
    controller
  }


}