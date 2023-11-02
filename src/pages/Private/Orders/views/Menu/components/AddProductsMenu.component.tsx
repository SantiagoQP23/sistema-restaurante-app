import { Box, Stack, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectMenu } from "../../../../../../redux";
import { ComboBoxProducts } from "../../../../EditMenu/components/products/ComboBoxProducts.component";
import { Sections, AllMenu } from "../../../../Menu/components";
import { Categories } from "./";

export const AddProductsMenu = () => {
  const { sections, activeSection } = useSelector(selectMenu);

  return (
    <>
      <Box
        sx={{
          width: "250px",
        }}
      >
        <ComboBoxProducts />
      </Box>

      <Stack spacing={1} my={1}>
        <Sections sections={sections} />

        <Categories categories={activeSection?.categories || []} />
      </Stack>

      <Grid
        container
        spacing={1}
        sx={{ display: "flex", alignItems: "center", mb: 1 }}
      >
        <Grid item xs={12} mb={1}>
          <AllMenu />
        </Grid>
      </Grid>
    </>
  );
};
