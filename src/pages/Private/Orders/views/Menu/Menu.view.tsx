import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import {
  selectMenu,
  setActiveCategory,
  setActiveOrder,
  setActiveSection,
} from "../../../../../redux";

import { TitlePage } from "../../../components/TitlePage.component";

import { AddProductsMenu, CartWidget } from "./components";
import { useNewOrderStore } from "../../store/newOrderStore";

export const Menu = () => {
  const { sections } = useSelector(selectMenu);

  const details = useNewOrderStore((state) => state.details);



  const dispatch = useDispatch();

  const navigate = useNavigate();

 

  useEffect(() => {
    dispatch(setActiveSection(sections[0]));
    dispatch(setActiveCategory(sections[0]?.categories[0]));
    dispatch(setActiveOrder(null));
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <TitlePage title="Menú" />
        <AddProductsMenu />
      </Container>

      <CartWidget
        badge={details.reduce(
          (acc, detail) =>
            acc +
            Math.floor(detail.quantity) +
            (Number.isInteger(detail.quantity) ? 0 : 1),
          0
        )}
        onClick={() => {
          navigate("/orders/add");
        }}
      />
    </>
  );
};
