import React, { FC, ReactElement } from "react";
import { AppBar } from "../components/AppBar.component";
import { Cart } from "../Shop/views/Cart/Cart.view";
import { Container, Typography } from "@mui/material";
import { ProductsMenu } from "../Shop/views/ProductsMenu/ProductsMenu.view";

export const Home = () => {
  return (
    <>
      <AppBar />

      <Container maxWidth="lg">
        {/* <>
        {getComponent(view)}
        </> */}

        <ProductsMenu />
      </Container>
    </>
  );
};
