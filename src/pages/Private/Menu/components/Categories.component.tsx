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
  categories: ICategory[];
 
}

export const CategoriesOrMessage: FC<Props> = ({ categories}) => {
 

  return (
    <>
      {
        categories.length > 0
          ?
          <>

            <Grid container spacing={1} >

              {
                categories.map(category => (
                  <Grid item key={category.id} xs={12}>
                    <Category category={category} />

                  </Grid>

                ))
              }

            </Grid>

          </>
          : <><Typography variant='body1' textAlign='center'>Sin categorías</Typography></>
      }
    </>
  )
}
