import { toast } from "react-toastify";

import { restauranteApi } from "../../../api";
import { ISection } from "../../../models";
import { AppThunk } from "../../store";

import { seccionAddNew, seccionDeleted, seccionLoaded, seccionUpdated } from "./sections.slice";


// Crear una nueva seccion
export const seccionStartCreated = (seccion: ISection): AppThunk => async (
  dispatch,
  getState) => {

  try {
    const { data } = await restauranteApi.post<{ seccion: ISection }>(`menu/secciones/crear`, { seccion });

    dispatch(seccionAddNew(data.seccion));

    //toast.success(body.msg)

  } catch (error) {
    console.log(error)
  }

};

// Actualizar una seccion
/* export const seccionStartUpdate = (seccion: ISection): AppThunk => async (
  dispatch,
  getState) => {

  try {
    const resp = await fetchConToken(`menu/secciones/actualizar/${seccion.idSeccion}`, seccion, 'PUT');
    const body = await resp.json();


    if (resp.ok) {
      dispatch(seccionUpdated(seccion));
      toast.success(body.msg)

    } else {
      toast.error(body.errors[0].msg);
    }

  } catch (error) {
    console.log(error)
  }


}; */

// Eliminar una seccion
/* export const seccionStartDelete = (idSeccion: number): AppThunk => async (
  dispatch,
  getState) => {

  try {
    const resp = await fetchConToken(`menu/secciones/eliminar/${idSeccion}`, {}, 'DELETE');
    const body = await resp.json();

    if (resp.ok) {
      dispatch(seccionDeleted(idSeccion));
      toast.success(body.msg)


    }
    else {
      toast.error(body.errors[0].msg);
    }

  } catch (error) {
    console.log(error);
  }

}; */





// Cargar todas las secciones
export const seccionStartLoad = (): AppThunk => async (
  dispatch,
  getState) => {

  try {

    const { data } = await restauranteApi.get<ISection[]>('menu/secciones');

    dispatch(seccionLoaded([{
      id: '1',
      name: 'Seccion 1'
    }]));


  } catch (e) {
    console.log(e);
  }

};
