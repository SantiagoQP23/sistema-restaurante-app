import { FC, useEffect, useState, useContext, useRef } from "react";

import { Typography, Accordion, AccordionSummary, AccordionDetails, Button, Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, TextField, Grid, Box } from '@mui/material';
import { Add, AddCardRounded, AddCircleOutlined, AddCircleRounded, AddRounded, DriveFileRenameOutlineOutlined } from "@mui/icons-material";
import { InputSearch } from "../../../../components/ui";
import { useFetchAndLoad } from "../../../../hooks";
import { IClient, ICreateClient } from "../../../../models";
import { getClient } from "../../Clients/services";
import { OrderContext } from '../context/Order.context';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, setActiveOrder } from '../../../../redux/slices/orders/orders.slice';
import { useSnackbar } from 'notistack';
import { SocketContext } from '../../../../context/SocketContext';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { statusModalClientOrder } from "../services/sharing-information.service";
import { useClients, useCreateCliente } from "../../Clients/hooks/useClients";
import { queryClient } from '../../../../main';
import { LoadingButton } from "@mui/lab";
import { FormNewClientBasic } from './FormNewClientBasic.component';
import { FormClient } from "../../Clients/components/FormClient.component";
import { TypeIdentification } from "../../../../models/common.model";
import { CreateClientDto } from "../../Clients/dto/create-client.dto";
import { useUpdateOrder } from "../hooks/useUpdateOrder";


interface Props {
  client?: IClient;
}

interface DataClientProps {
  client: IClient;
}


const initialClient: ICreateClient = {
  lastName: "",
  firstName: "",
  identification: {
    type: TypeIdentification.CEDULA,
    num: "",
  },
  numPhone: "",
  address: "",
  email: "",
}



export const ModalClientOrder: FC<Props> = (
  { client: clientOrder }
) => {

  const [open, setOpen] = useState<boolean>(false);

  const suscription$ = statusModalClientOrder.getSubject();

  const { clientsQuery, term, handleChangeTerm } = useClients();

  const clientForm = initialClient;



  const { client, setClient } = useContext(OrderContext);



  const { activeOrder } = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  const { socket } = useContext(SocketContext);

  const dispatch = useDispatch();


  const handleClose = () => {
    setOpen(false);
  }

  const {updateOrder} = useUpdateOrder();


  const clientAddMutation = useCreateCliente();

  const onSubmit = (data: ICreateClient) => {



    const { identification, ...dataClient } = data;

    if (data.address === "") delete dataClient.address;

    if (data.numPhone === "") delete dataClient.numPhone;

    if (data.email === "") delete dataClient.email;

    let newClient: CreateClientDto = {
      ...dataClient,
    }

    if (identification.type === TypeIdentification.CEDULA && identification.num.length === 10
      || identification.type === TypeIdentification.RUC && identification.num.length === 13
    ) {
      newClient = {
        ...newClient,
        typeIdentification: identification.type,
        numberIdentification: identification.num
      }
    }

    

    clientAddMutation.mutateAsync(newClient).then((res) => {

      if(!activeOrder){

        setClient(res);
      }else {
        updateOrder({
          id: activeOrder.id,
          clientId: res.id
        });

      }

      handleClose();
    })
   

  }





  useEffect(() => {

    clientsQuery.refetch();

  }, [term])

  useEffect(() => {

    const suscription = suscription$.subscribe(({ value }) => {

      console.log('abrir modal')
      setOpen(value);
    })

    return () => {
      setClient(null);
    }

  }, [])

  return (
    <>
      <Dialog open={open} onClose={handleClose} sx={{ width: 'auto' }}>

        <DialogTitle>
          <Typography variant='h4'>Nuevo cliente</Typography>
        </DialogTitle>

        <DialogContent>

  
              {/* <FormNewClientBasic callback={handleClose} /> */}
              <FormClient
              
                client={clientForm}
                onSubmit={onSubmit}
                loading={clientAddMutation.isLoading}
              
              />
   


        </DialogContent>


        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            }}
        >
          <Button
            onClick={() => setOpen(false)}
            variant='outlined'
            color='error'
          >Cancelar</Button>
        </DialogActions>

      </Dialog>



    </>
  )
}
