import { FC } from 'react';
import { Tabs, Tab, Box, Card, CardContent } from '@mui/material/';

import { ISection } from '../../../../models';

import { useProducts } from '../../../../hooks/';


interface Props {
 /*  secciones: ISection[];
  cambiarSeccion: (value: number) => void;
  seccion: number; */
}

export const Sections: FC<Props> = ({  }) => {

  const {sections, idSection, changeSection} = useProducts();

  return (
    <>
      <Box >
        <Card>
          <CardContent>
            <Tabs
              value={idSection}
              onChange={(e, value) => changeSection(value)}
              variant="scrollable"
              textColor='primary'
              scrollButtons="auto"
              indicatorColor='primary'
            >
              {
                sections.map(section => (
                  <Tab
                    key={section.id}
                    value={section.id}
                    label={section.name}
                    wrapped
                  />

                ))
              }

            </Tabs>

          </CardContent>
        </Card>
      </Box>

   
    </>
  )
}
