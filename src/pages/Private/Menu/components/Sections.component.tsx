import { FC, useContext, useEffect } from 'react';
import { Tabs, Tab, Box, Card, CardContent } from '@mui/material/';

import { ISection } from '../../../../models';

import { useProducts } from '../../../../hooks/';
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

  const { activeSection } = useSelector(selectMenu);

  const dispatch = useDispatch();


  const changeSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    dispatch(setActiveSection(section!))
    dispatch(setActiveCategories(section!.categories))

    if(section!.categories.length > 0){
      dispatch(setActiveCategory(section!.categories[0]))
  
      dispatch(setActiveProducts(section!.categories[0].products))
      
    }else {
      
      dispatch(setActiveProducts([]))
    }



  }

  useEffect(() => {
    sections.length > 0 && dispatch(setActiveSection(sections[0]))
  }, [])

  return (
    <>
      <Box >
        {
          activeSection &&
          <Tabs
            onChange={(e, value) => changeSection(value)}
            value={activeSection.id}
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
        }


      </Box>


    </>
  )
}
