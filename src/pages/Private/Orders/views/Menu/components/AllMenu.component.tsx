import { FC } from "react";

import { Grid, } from "@mui/material";
import { useSelector,  } from 'react-redux';
import { selectMenu,  } from "../../../../../../redux";

import { ListProducts } from './';

export const AllMenu: FC = () => {

  const { activeCategory } = useSelector(selectMenu);

  return (
    <>
      <Grid container item  spacing={2}>

        <Grid item xs={12} >

          {
            activeCategory && <ListProducts products={activeCategory.products} />
          }
        </Grid>
      </Grid>


    </>
  )

}
