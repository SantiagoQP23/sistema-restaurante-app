import  { FC } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ICategoria } from '../../interfaces';

interface Props {
  categorias: ICategoria[];
  cambiarCategoria: (value: number) => void;
  categoria: number;
}

export const Categorias: FC<Props> = ({ categorias, categoria, cambiarCategoria }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} lg={3}>


          <Select
            labelId="label-select-categoria"
            id="select-categoria"
            value={categoria}
            label="Categoria"
            margin='dense'
            onChange={(e) => cambiarCategoria(e.target.value as number)}
            fullWidth
           
          >
            {
              categorias.length > 0 && (
                categorias.map(categoria => (
                  <MenuItem
                    key={categoria.idCategoria!}
                    value={categoria.idCategoria!}
                  >
                    {categoria.nombreCategoria}
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
