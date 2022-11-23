import { FC, useContext, useEffect } from 'react';
import { Grid, Select, MenuItem } from '@mui/material';

import { useProducts } from '../../../../hooks';
import { MenuContext } from '../../../../context/MenuContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectSections } from '../../../../redux/slices/menu/sections.slice';
import { ICategory } from '../../../../models';
import { selectMenu, setActiveCategory, setActiveProducts } from '../../../../redux';

interface Props {
    categories?: ICategory[];
    cambiarCategoria?: (value: number) => void;
    categoria?: number;
}

export const Categories: FC<Props> = ({  }) => {

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
      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          {
              activeCategory &&  <Select
              labelId="label-select-categoria"
              id="select-categoria"
              value={activeCategory.id}
              label="Categoria"
              margin='dense'
              onChange={(e) => changeCategory(e.target.value)}
              fullWidth
            >
              {
                categories.length > 0 && (
                  categories.map(categoria => (
                    <MenuItem
                      key={categoria.id}
                      value={categoria.id}
                    >
                      {categoria.name}
                    </MenuItem>

                  )
                  )
                )

              }
            </Select>
          }

        </Grid>

        {/*   <Card sx={{ minWidth: 275 }}>
          <CardContent>
            
            <Typography variant="h6" component="div">
              Productos 15   
            </Typography>
          
          </CardContent>
          
        </Card> */}
      </Grid>


    </>
  )
}
