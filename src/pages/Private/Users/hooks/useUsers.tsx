import { useMutation, useQuery } from "@tanstack/react-query"
import { createUser, getUser, getUsers, resetPasswordUser, updateUser } from "../services/users.service"
import { IUser } from "../../../../models"
import { CreateUserDto, ResetPasswordUserDto, UpdateUserDto } from "../dto"
import { useDispatch } from "react-redux"
import { loadUsers } from "../../../../redux"
import { usePaginationAsync } from "../../../../hooks/usePaginationAsync"
import {useState} from 'react';




export const useUsers = () => {

  const dispatch = useDispatch();

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePaginationAsync();

  const [term, setTerm] = useState('');

  const handleChangeTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };



  const usersQuery = useQuery<{users: IUser[], count: number}>(
    ['users'],
    () => getUsers({ page, limit: rowsPerPage, term}),
    {
      onSuccess: (data) => {
        dispatch(loadUsers(data.users));
      }
    })


  


  return {
    usersQuery,
    page,
    term,

    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeTerm


  }

}



export const useUser = (term: string, enabled = true) => {
  return useQuery(['user', term], () => getUser(term), {
    enabled,
    retry: false,
  });

}


export const useCreateUser = () => {

  return useMutation<IUser, unknown, CreateUserDto>(createUser)
}


export const useUpdateUser = () => {

  return useMutation<IUser, unknown, UpdateUserDto>((data) => updateUser(data.id, data))
}

export const useResetPasswordUser = () => {

  return useMutation<IUser, unknown, ResetPasswordUserDto>((data) => resetPasswordUser(data))
}


export const useDeleteUser = () => {


  return {

  }
} 
