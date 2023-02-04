import { Grid } from "@mui/material"
import { FC } from "react"
import { IProduct } from "../../../../../../models"
import { ProductAddToOrder } from "./ProductAddToOrder.component"


interface ProductsListProps {
  products: IProduct[]
}

export const ProductListAddToOrder: FC<ProductsListProps> = ({ products }) => {



  return (
    <>
      <Grid container spacing={1}>
        {
          products.map(product => (
            <Grid key={product.id} item xs={12} md={4}>
              <ProductAddToOrder product={product} />

            </Grid>
          ))
        }
      </Grid>

    </>
  )

}