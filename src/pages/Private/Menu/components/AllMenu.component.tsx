import { FC } from "react";

import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectMenu } from "../../../../redux";
import { Sections } from "./Sections.component";
import { Category } from "./Category.component";
import { CategoriesOrMessage } from './Categories.component';

export const AllMenu: FC = () => {
  const { sections, activeSection, categories } = useSelector(selectMenu);


  return (
    <>
      <Grid item xs={12} >
        <Card>
          <CardContent>

            <Sections sections={sections} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item>

        {
          sections?.length === 0
            ? <>No se ha creado un menu</>
            : <>
              {
                activeSection
                  ? <CategoriesOrMessage categories={activeSection.categories} />
                  : <Typography variant='body1' textAlign='center'>Seleccione una sección</Typography>

              }
            </>

        }
      </Grid>



    </>
  )

}
