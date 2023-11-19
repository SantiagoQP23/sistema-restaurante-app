import React, { FC, ReactElement } from "react";
import { AppBar } from "../components/AppBar.component";
import { Cart } from "../Shop/views/Cart/Cart.view";
import { Container, Typography } from "@mui/material";
import { ProductsMenu } from "../Shop/views/ProductsMenu/ProductsMenu.view";
import { TitlePage } from "../../Private/components";

export const Home = () => {
  return (
    <>
      <AppBar />

      <Container maxWidth="lg">

        <Typography variant="h3">
          Restaurante Doña Yoli
        </Typography>
        {/* <>
        {getComponent(view)}
        </> */}

      </Container>
    </>
  );
};
