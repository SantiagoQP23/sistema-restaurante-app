import { FC } from 'react';
import { Grid, Select, MenuItem } from '@mui/material';

import { useProducts } from '../../../../hooks';

interface Props {
  /*   categorias: ICategoria[];
    cambiarCategoria: (value: number) => void;
    categoria: number; */
}

export const Categories: FC<Props> = ({ }) => {


  const { idCategory, categoriasSeccion: categories, changeCategory} = useProducts();

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} lg={3}>
          <Select
            labelId="label-select-categoria"
            id="select-categoria"
            value={idCategory}
            label="Categoria"
            margin='dense'
            onChange={(e) => changeCategory(e.target.value)}
            fullWidth
          >
            {
              categories.length > 0 && (
                categories.map(categoria => (
                  <MenuItem
                    key={categoria.id!}
                    value={categoria.id!}
                  >
                    {categoria.name}
                  </MenuItem>

                )
                )
              )

            }
          </Select>

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
