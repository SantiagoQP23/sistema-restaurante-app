import {useContext, FC} from 'react';

import { LoadingButton } from "@mui/lab"
import { Box, TextField, Typography, Select } from '@mui/material';
import { useForm } from "react-hook-form";
import { ICreateClient } from "../../../../models";
import { CreateClientDto } from "../../Clients/dto/create-client.dto";
import { useCreateCliente } from "../../Clients/hooks/useClients";
import { OrderContext } from "../context/Order.context";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../../redux";
import { useUpdateOrder } from "../hooks/useUpdateOrder";


interface Props {
  callback?: () => void;
}

export const FormNewClientBasic: FC<Props> = ({callback}) => {


  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateClientDto>({
    defaultValues: { lastName: '', firstName: '' }
  });

  const {setClient} = useContext(OrderContext);

  const {activeOrder} = useSelector(selectOrders);

  const {updateOrder} = useUpdateOrder();



  const clientAddMutation = useCreateCliente();

  const onSubmit = (data: CreateClientDto) => {

    clientAddMutation.mutateAsync(data).then((res) => {

      if(!activeOrder){

        setClient(res);
      }else {
        updateOrder({
          id: activeOrder.id,
          clientId: res.id
        });

      }
    
      callback && callback();
      reset();
    })
   

  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexDirection: 'column',
        }}
      >

        <TextField

          label="Nombres"
          fullWidth
          required
          {
          ...register('firstName', {
            required: 'Este campo es requerido',
            minLength: { value: 2, message: 'Minimo 2 caracteres' },
            validate: (value: any) => {
              if (!isNaN(value)) {
                return 'No se permiten números en este campo';
              }
            }



          })
          }
          helperText={<Typography color="red">{errors.firstName?.message} </ Typography>}
          onKeyDown={(e) => {


            if (!/^[a-zA-Z ]*$/.test(e.key)) {
              e.preventDefault();
            }
          }
          }
        />
     
        <TextField

          label="Apellidos"
          fullWidth
          required
          {
          ...register('lastName', {
            required: 'Este campo es requerido',
            minLength: { value: 2, message: 'Minimo 2 caracteres' },


            validate: (value: any) => {
              if (!isNaN(Number(value))) return 'No se permiten números en este campo';
              return true;
            },



          })


          }

          helperText={<Typography color="red">{errors.lastName?.message} </ Typography>}
          onKeyDown={(e) => {


            if (!/^[a-zA-Z ]*$/.test(e.key)) {
              e.preventDefault();
            }
          }
          }
        />



        <LoadingButton
          variant='contained'
          type="submit"
          loading={clientAddMutation.isLoading}
        >
          Crear
        </LoadingButton>

      </Box>

    </form>
  )
}