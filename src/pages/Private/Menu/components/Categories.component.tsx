import { FC, useContext, useEffect } from 'react';
import { Grid, Select, MenuItem, Accordion, AccordionDetails, AccordionSummary, Typography, Card } from '@mui/material';

import { useProducts } from '../../../../hooks';
import { MenuContext } from '../../../../context/MenuContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectSections } from '../../../../redux/slices/menu/sections.slice';
import { ICategory } from '../../../../models';
import { selectMenu, setActiveCategory, setActiveProducts } from '../../../../redux';
import { ExpandMore } from '@mui/icons-material';
import { Product } from './Product.component';
import { Category } from './Category.component';

interface Props {
  categories?: ICategory[];
  cambiarCategoria?: (value: number) => void;
  categoria?: number;
}

export const Categories: FC<Props> = ({ }) => {

  const { activeSection, activeCategory, categories } = useSelector(selectMenu);

  const dispatch = useDispatch();


  const changeCategory = (categoryId: string) => {
    const category = categories.find(s => s.id === categoryId);
    dispatch(setActiveCategory(category!))
    dispatch(setActiveProducts(category!.products))


  }

  /* useEffect(() => {
    categories.length > 0 && dispatch(setActiveCategory(categories[0]))
  }, [categories])
 */

  return (
    <>

      
        {


          activeSection && activeSection.categories.map(category => (

            <Category category={category}/>
              
           

          ))
        }
     








      {/*   <Card sx={{ minWidth: 275 }}>
          <CardContent>
            
            <Typography variant="h6" component="div">
              Productos 15   
            </Typography>
          
          </CardContent>
          
        </Card> */}



    </>
  )
}
