import { FC, useContext } from 'react';
import { Grid, Select, MenuItem } from '@mui/material';

import { useProducts } from '../../../../hooks';
import { MenuContext } from '../../../../context/MenuContext';

interface Props {
  /*   categorias: ICategoria[];
    cambiarCategoria: (value: number) => void;
    categoria: number; */
}

export const Categories: FC<Props> = ({ }) => {


  const { activeCategory,  categories, changeCategory } = useContext(MenuContext);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          {
            activeCategory && <Select
              labelId="label-select-categoria"
              id="select-categoria"
              value={activeCategory!.id}
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
