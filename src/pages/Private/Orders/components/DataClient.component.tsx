import { FC, useState, useContext } from "react";

import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { DriveFileRenameOutlineOutlined } from "@mui/icons-material";
import { InputSearch } from "../../../../components/ui";
import { useFetchAndLoad } from "../../../../hooks";
import { IClient } from "../../../../models";
import { getClient } from "../../Clients/services";
import { OrderContext } from '../context/Order.context';

export const DataClient: FC = () => {


  const { loading, callEndpoint } = useFetchAndLoad();

  const [cedula, setCedula] = useState<string>('');

  const {client, setClient} = useContext(OrderContext);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCedula(event.target.value);
  };




  const searchClient = async () => {
    if (cedula.length === 10) {
      await callEndpoint(getClient(cedula))
        .then((resp) => {
          const { data } = resp;
          setClient(data);
          console.log(data);
        })
        .catch((err) => {
          //nqueueSnackbar('No se encontró al cliente', { variant: 'error' })

        })
    }

  }


  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='body1'>Cliente</Typography>

          <Accordion>
            <AccordionSummary
              expandIcon={<DriveFileRenameOutlineOutlined />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ p: 0, m: 0 }}
            >
              <Typography variant='body2'>
                { client
                  ? client?.firstNames + client?.lastNames
                  : 'No asignado'
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

              {client && !loading && (
                <>
                  <Typography variant='body1'><b>Nombre: </b> {client?.firstNames + client?.lastNames}</Typography>
                  <Typography variant='body1'><b>Cedula: </b> {client.cedula}</Typography>
                  <Typography variant='body1'><b>RUC: </b> {client.ruc}</Typography>
                  <Typography variant='body1'><b>Email: </b> {client.email}</Typography>
                  <Typography variant='body1'><b>Dirección: </b> {client.address}</Typography>
                </>
              )}

            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

    </>
  )
}
