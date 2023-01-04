import { ExpandMore } from '@mui/icons-material';
import { Card, Accordion, AccordionSummary, Typography, AccordionDetails, Grid } from '@mui/material';
import { FC } from 'react';
import { ICategory } from '../../../../models/';
import { Product } from './Product.component';


interface Props{
  category: ICategory
}

export const Category: FC<Props> = ({category}) => {
  return (
    <Card>
      <Accordion>

        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{category.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>


          {
            category.products.length > 0 && (
              <Grid container spacing={1}>
                {
                  category.products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} lg={4}>
                      <Product  product={product} />

                    </Grid>
                  ))
                }
              </Grid>

            )
          }
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}