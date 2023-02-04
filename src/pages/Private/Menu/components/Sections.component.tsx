import { FC, useContext, useEffect } from 'react';
import { Tabs, Tab, Box, Card, CardContent, tabsClasses } from '@mui/material/';

import { ISection } from '../../../../models';

import { useAppSelector, useProducts } from '../../../../hooks/';
import { MenuContext } from '../../../../context/MenuContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenu, setActiveCategories, setActiveCategory, setActiveProducts, setActiveSection } from '../../../../redux';


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

    // dispatch(setActiveCategories(section!.categories))

    // if (section!.categories.length > 0) {
    //   dispatch(setActiveCategory(section!.categories[0]))

    //   dispatch(setActiveProducts(section!.categories[0].products))

    // } else {

    //   dispatch(setActiveProducts([]))
    // }



  }

  useEffect(() => {
    sections.length > 0 && dispatch(setActiveSection(sections[0]))
  }, [])

  return (
    <>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }} >
        {
          activeSection &&
          <Tabs
            onChange={(e, value) => changeSection(value)}
            value={activeSection.id}
            variant="scrollable"
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
        }


      </Box>


    </>
  )
}
