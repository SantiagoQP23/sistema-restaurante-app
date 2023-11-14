import {
  Box,
  Stack,
  Grid,
  Button,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu } from "../../../../../../redux";
import { ComboBoxProducts } from "../../../../EditMenu/components/products/ComboBoxProducts.component";
import { Sections, AllMenu } from "../../../../Menu/components";
import { Categories } from "./";
import { IProduct } from "../../../../../../models";
import { sharingInformationService } from "../../../services/sharing-information.service";
import { FilterList } from "@mui/icons-material";
import NiceModal from "@ebay/nice-modal-react";
import { RegisteredModals } from "../../../../modals";

export const AddProductsMenu = () => {
  const { sections, activeSection, activeCategory } = useSelector(selectMenu);

  const dispatch = useDispatch();

  const addProductoToOrder = (product: IProduct) => {
    sharingInformationService.setSubject(true, {
      product,
      quantity: 1,
    });
  };

  const openDrawerProductsFilter = () => {
    NiceModal.show(RegisteredModals.DrawerProductsFilter);
  };

  return (
    <>
      <Box
        sx={{
          width: "250px",
        }}
      >
        <ComboBoxProducts selectProduct={addProductoToOrder} />
      </Box>

      <Stack spacing={1} my={1} direction="row" justifyContent="space-between">

        <Paper sx={{ p: 1 }}>
          {activeCategory && (
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Categoría:
              <Chip
                label={activeCategory.name}
                sx={{ ml: 1 }}
              />
            </Typography>
          )}
        </Paper>

        <Button startIcon={<FilterList />} onClick={openDrawerProductsFilter}>
          Filtros
        </Button>

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
