import { FC, useEffect, useState, useContext } from "react";

import { Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { DriveFileRenameOutlineOutlined } from "@mui/icons-material";
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


interface Props {
  client?: IClient;
}

interface DataClientProps {
  client: IClient;
}


const DataClientOrder: FC<DataClientProps> = (
  { client }
) => {
  return (
    <>
      <Typography variant='body1'><b>Nombre: </b> {client.person.firstName + ' ' + client.person.lastName}</Typography>
      <Typography variant='body1'><b>{client.person.identification.type}: </b> {client.person.identification.num}</Typography>
      <Typography variant='body1'><b>Email: </b> {client.person.email}</Typography>
      <Typography variant='body1'><b>Dirección: </b> {client.address}</Typography>
    </>
  )


}

export const DataClient: FC<Props> = (
  { client: clientOrder }
) => {

  const { loading, callEndpoint } = useFetchAndLoad();

  const [cedula, setCedula] = useState<string>('');

  const { client, setClient } = useContext(OrderContext);

  const { activeOrder } = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  const { socket } = useContext(SocketContext);

  const dispatch = useDispatch();





  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCedula(event.target.value);
  };




  const searchClient = async () => {
    if (cedula.length === 10 || cedula.length === 13) {
      await callEndpoint(getClient(cedula))
        .then((resp) => {
          const { data } = resp;
          setClient(data);
          console.log(data);
        })
        .catch((err) => {
          enqueueSnackbar('No se encontró al cliente', { variant: 'error' })

        })
    } else {
      enqueueSnackbar('Ingrese un número de identificación válido', { variant: 'warning' })
    }

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
   

    return () => {
      setClient(undefined);
    }


  }, [])


  return (
    <>
     

          <Accordion sx={{width: '100%'}} >
            <AccordionSummary
              expandIcon={<DriveFileRenameOutlineOutlined />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ p: 0, m: 0 }}
            >
              <Typography variant='body2'>

                <b>Cliente: </b> 
                {clientOrder
                  ? clientOrder.person.firstName + ' ' + clientOrder.person.lastName
                  : client && !activeOrder && client.person.firstName + ' ' + client.person.lastName || ' No asignado'
                }
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, m: 0 }}>
              <InputSearch
                handleChange={handleChange}
                placeholder='Número de cédula'
                search={searchClient}
                loading={loading}
              />
              {
                client 
                ?  <DataClientOrder client={client} />
                : activeOrder?.client && <DataClientOrder client={activeOrder.client} />
              }

              
              {
                client && activeOrder && <Button variant="outlined" onClick={setClientOrder}>Actualizar cliente</Button>

              }

            </AccordionDetails>
          </Accordion>
       

    </>
  )
}
