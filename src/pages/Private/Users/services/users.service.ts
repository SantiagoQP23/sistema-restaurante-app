import { loadAbort } from '../../../../helpers/load-abort-axios.helper';
import { IUser } from '../../../../models/auth.model';
import restauranteApi from '../../../../api/restauranteApi';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { SubjectDeleteUser } from '../helpers/subjects-users.helper';


export const statusModalDeleteUser = new SubjectDeleteUser();


export const getUser = (term: string) => {
  const controller = loadAbort();
  return {
    call: restauranteApi.get<IUser>(`users/${term}`,

      { signal: controller.signal }),
    controller
  }
}

export const getUsers = () => {
  
    const controller = loadAbort();
  
    return {
      call: restauranteApi.get<IUser>(`users/`,
        { signal: controller.signal }),
      controller
    }
}


export const updateUser = (id: string, data: UpdateUserDto) => {
  const controller = loadAbort();
  return {
    call: restauranteApi.patch<IUser>(`users/${id}`,
      data,
      { signal: controller.signal }),
    controller
  }
}

export const createUser = (data: CreateUserDto) => {
  const controller = loadAbort();
  return {
    call: restauranteApi.post<IUser>(`users/`,
      data,
      { signal: controller.signal }),
    controller
  }
}


export const deleteUser = (id: string) => {
  const controller = loadAbort();
  return {
    call: restauranteApi.delete<IUser>(`users/${id}`,
      { signal: controller.signal }),
    controller
  }
}
  