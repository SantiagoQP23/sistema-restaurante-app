import { FC } from "react";

import { Grid, } from "@mui/material";
import { useSelector,  } from 'react-redux';
import { selectMenu,  } from "../../../../redux";
import { Sections } from "./Sections.component";
import { Categories } from './Categories.compontent';
import { ListProducts } from './ListProducts.component';

export const AllMenu: FC = () => {



  const { sections, activeSection,  activeCategory } = useSelector(selectMenu);

  return (
    <>
      <Grid container item  spacing={2}>

        <Grid item xs={12}  >


          <Sections sections={sections} />

        </Grid>
        <Grid item xs={12} >


          {
            activeSection &&
            <Categories categories={activeSection!.categories} />

          }
        </Grid>
        <Grid item xs={12} >

          {
            activeCategory &&
            <ListProducts products={activeCategory.products} />
          }
        </Grid>
      </Grid>


    </>
  )

}
