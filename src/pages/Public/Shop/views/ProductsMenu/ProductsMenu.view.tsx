import { Box, Button, Grid } from "@mui/material";

import { ComboBoxProducts } from "../../../../Private/EditMenu/components/products/ComboBoxProducts.component";
import { TitlePage } from "../../../../Private/components";
import { Filter, FilterList } from "@mui/icons-material";
import { CartWidget, Product } from "../../../../Private/Orders/views";
import { getMenu } from "../../../../../services";
import { useDispatch, useSelector } from "react-redux";
import { ISection } from "../../../../../models";
import { loadMenu, selectMenu, setActiveCategory } from "../../../../../redux";
import { useAsync, useFetchAndLoad } from "../../../../../hooks";

export const ProductsMenu = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const { activeCategory } = useSelector(selectMenu);

  const dispatch = useDispatch();

  const loadMenuState = (sections: ISection[]) => {
    dispatch(loadMenu(sections));
    dispatch(setActiveCategory(sections[0].categories[0]));
  };

  const getMenuCall = async () => await callEndpoint(getMenu());

  useAsync(getMenuCall, loadMenuState, () => {}, []);

  return (
    <>
      <TitlePage title="Productos" />

      <Box>
        <ComboBoxProducts />
      </Box>

      <Box>
        <Button variant="text" endIcon={<FilterList />}>
          Filtros
        </Button>
      </Box>

      <Grid container spacing={3}>
        {activeCategory?.products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} lg={3} xl={2}>
            <Product product={product} onClick={() => {}}/>
          </Grid>
        ))}
      </Grid>

      <CartWidget badge={1} />
    </>
  );
};
