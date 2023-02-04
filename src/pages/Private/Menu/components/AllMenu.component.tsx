import { FC } from "react";

import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu, setActiveSection } from "../../../../redux";
import { Sections } from "./Sections.component";
import { Categories } from './Categories.compontent';
import { ListProducts } from './ListProducts.component';

export const AllMenu: FC = () => {



  const { sections, activeSection, categories, activeCategory } = useSelector(selectMenu);

  return (
    <>
      <Grid container xs={12} spacing={2}>

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
