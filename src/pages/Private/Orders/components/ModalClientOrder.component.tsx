import { FC, useEffect, useState, useContext, useRef } from "react";

import { Typography, Accordion, AccordionSummary, AccordionDetails, Button, Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, TextField, Grid, Box } from '@mui/material';
import { Add, AddCardRounded, AddCircleOutlined, AddCircleRounded, AddRounded, DriveFileRenameOutlineOutlined } from "@mui/icons-material";
import { InputSearch } from "../../../../components/ui";
import { useFetchAndLoad } from "../../../../hooks";
import { IClient } from "../../../../models";
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
import { useClients } from "../../Clients/hooks/useClients";
import { queryClient } from '../../../../main';
import { LoadingButton } from "@mui/lab";
import { FormNewClientBasic } from './FormNewClientBasic.component';


interface Props {
  client?: IClient;
}

interface DataClientProps {
  client: IClient;
}




export const ModalClientOrder: FC<Props> = (
  { client: clientOrder }
) => {

  const [open, setOpen] = useState<boolean>(false);

  const suscription$ = statusModalClientOrder.getSubject();

  const { clientsQuery, term, setTerm } = useClients();


  const { client, setClient } = useContext(OrderContext);



  const { activeOrder } = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  const { socket } = useContext(SocketContext);

  const dispatch = useDispatch();


  const handleClose = () => {
    setOpen(false);
  }


  const setClientOrder = () => {

    const data: UpdateOrderDto = {
      id: activeOrder!.id,
      clientId: client!.id
    }

    socket?.emit(EventsEmitSocket.updateOrder, data, (res: SocketResponseOrder) => {
      console.log(res);
      if (res.ok) {
        dispatch(setActiveOrder(res.order!));
      } else {
        enqueueSnackbar('No se pudo actualizar el cliente', { variant: 'error' })
      }
    });
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

          {/* <Autocomplete
            id="combo-box-client"


            filterOptions={(x) => x}
            options={clientsQuery.data || []}
            getOptionLabel={(option) => option.person.firstName + ' ' + option.person.lastName}
            value={client}

            renderInput={(params) => <TextField {...params} label="Cliente" variant="outlined" />}

            onChange={(event, newValue: IClient | null) => {
              setClient(newValue);
              // setClients(newValue ? [newValue, ...clients] : clients)

            }}

            onInputChange={(event, newInputValue) => {
              setTerm(newInputValue);
            }}

          /> */}




              <FormNewClientBasic callback={handleClose} />

{/* 
          <Accordion sx={{ width: '100%' }} >
            <AccordionSummary
              expandIcon={<AddCircleOutlined />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ p: 0, m: 0 }}
            >
              <Typography variant='h5'>
                Nuevo cliente


              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, m: 0 }}>

            </AccordionDetails>
          </Accordion> */}

        </DialogContent>


        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant='outlined'
          >Cerrar</Button>
        </DialogActions>

      </Dialog>



    </>
  )
}
