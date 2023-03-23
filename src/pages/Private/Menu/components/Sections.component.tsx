import { FC, useEffect } from 'react';
import { Tabs, Tab, Box, tabsClasses } from '@mui/material/';

import { ISection } from '../../../../models';

import { useAppSelector } from '../../../../hooks/';
import { useDispatch, } from 'react-redux';
import { selectMenu, setActiveCategory, setActiveSection } from '../../../../redux';


interface Props {
  sections: ISection[];
  /*
   cambiarSeccion: (value: number) => void;
   seccion: number; */
}

export const Sections: FC<Props> = ({ sections }) => {

  const { activeSection } = useAppSelector(selectMenu);

  const dispatch = useDispatch();


  const changeSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    dispatch(setActiveSection(section!))

    dispatch(setActiveCategory(section!.categories[0]))





  }

  useEffect(() => {
    sections.length > 0 && dispatch(setActiveSection(sections[0]))
  }, [])

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper' }} >
        {
          activeSection &&
          <Tabs
            onChange={(e, value) => changeSection(value)}
            value={activeSection.id}
            variant="fullWidth"
            scrollButtons
            allowScrollButtonsMobile
            indicatorColor='primary'
            

            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },

            }}
          >
            {
              sections.map(section => {

                if (section.categories.length > 0 && section.isActive)
                  return (
                    <Tab
                      key={section.id}
                      value={section.id}
                      label={section.name}
                      wrapped
                    />

                  )
              }
              )
            }

          </Tabs>
        }


      </Box>


    </>
  )
}
