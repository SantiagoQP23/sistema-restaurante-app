import { FC } from 'react';

import { Tabs, Tab, Box, Card, CardContent } from '@mui/material/';

import { ISeccion } from '../../interfaces';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


interface Props {
  secciones: ISeccion[];
  cambiarSeccion: (value: number) => void;
  seccion: number;
}

export const Secciones: FC<Props> = ({ secciones, cambiarSeccion, seccion }) => {
  return (
    <>
      <Box >
        <Card>
          <CardContent>
            <Tabs
              value={seccion}
              onChange={(e, value) => cambiarSeccion(value)}
              variant="scrollable"
              textColor='primary'
              scrollButtons="auto"
              indicatorColor='primary'


            >
              {
                secciones.map(seccion => (

                  <Tab
                    key={seccion.idSeccion}
                    label={seccion.nombreSeccion}
                    value={seccion.idSeccion}
                    wrapped
                  />

                ))
              }

            </Tabs>

          </CardContent>
        </Card>
      </Box>

      <ToastContainer />

    </>
  )
}
