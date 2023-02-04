import { FC, useState } from 'react';
import { ICategory } from '../../../../models/menu.model';
import { Box, Button, Grid, Typography } from '@mui/material';
import { MenuBook } from '@mui/icons-material';
import { Product } from './Product.component';
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu, setActiveCategory } from '../../../../redux/slices/menu/menu.slice';
import { useAppDispatch } from '../../../../hooks/useRedux';



interface Props {
  categories: ICategory[]
}



export const Categories: FC<Props> = ({ categories }) => {

  const { activeSection, activeCategory } = useSelector(selectMenu);

  const dispatch = useDispatch();

  const changeCategory = (category: ICategory) => {
    dispatch(setActiveCategory(category));
  }

  if (!activeCategory) {

    return (
      <Typography variant='body1' textAlign='center'>Seleccione una sección</Typography>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {
          categories.map((category, index) => (

            /*  <Box key={category.id} sx={{border: 1, p: 2 , borderRadius: 2, mr: 3}}>
 
               {category.name}
               
               </Box> */
            <Button
              variant={activeCategory.id === category.id ? "contained" : "outlined"}
              key={category.id}
              sx={{
                mr: 3,
                
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white'
                }

              }}
              onClick={() => changeCategory(category)}

            >
              {category.name}
            </Button>

          ))

        }
      </Box>

  

    </>
  )
}