import { Box, Button, Grid } from "@mui/material";

import { ComboBoxProducts } from "../../../../Private/EditMenu/components/products/ComboBoxProducts.component";
import { TitlePage } from "../../../../Private/components";
import { Filter, FilterList } from "@mui/icons-material";
import { CartWidget, Product } from "../../../../Private/Orders/views";
import { getMenu } from "../../../../../services";
import { useDispatch, useSelector } from "react-redux";
import { IProduct, ISection } from "../../../../../models";
import { loadMenu, selectMenu, setActiveCategory } from "../../../../../redux";
import { useAsync, useFetchAndLoad } from "../../../../../hooks";
import { useNavigate } from "react-router-dom";

export const ProductsMenu = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const { activeCategory } = useSelector(selectMenu);

  const navigate  = useNavigate();

  const dispatch = useDispatch();

  const loadMenuState = (sections: ISection[]) => {
    dispatch(loadMenu(sections));
    dispatch(setActiveCategory(sections[0].categories[0]));
  };

  const getMenuCall = async () => await callEndpoint(getMenu());

  const showProduct = (productId: string) => {
    navigate(`/shop/product/${productId}`);
  }

  useAsync(getMenuCall, loadMenuState, () => {}, []);

  const navigateToProduct = (product: IProduct) => {

    navigate(`/shop/product/${product.id}`);

  }


  return (
    <>
      <TitlePage title="Productos" />

      <Box
        sx={{
          width: "250px"
        }}
      >
        <ComboBoxProducts selectProduct={navigateToProduct} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button variant="text" endIcon={<FilterList />}
          color="inherit"
        >
          Filtros
        </Button>
      </Box>

      <Grid container spacing={3}>
        {activeCategory?.products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} lg={3} xl={2}>
            <Product product={product} onClick={showProduct}/>
          </Grid>
        ))}
      </Grid>

      <CartWidget badge={1} />
    </>
  );
};
