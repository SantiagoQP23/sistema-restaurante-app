import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NiceModal from "@ebay/nice-modal-react";

import { useNavigate } from "react-router-dom";

import { Button, Container } from "@mui/material";

import {
  selectMenu,
  setActiveCategory,
  setActiveOrder,
  setActiveSection,
} from "../../../../../redux";

import { TitlePage } from "../../../components/TitlePage.component";

import { AddProductsMenu, CartWidget } from "./components";
import { useNewOrderStore } from "../../store/newOrderStore";
import { Add } from "@mui/icons-material";
import { RegisteredModals } from "../../../modals";

export const Menu = () => {
  const { sections } = useSelector(selectMenu);

  const details = useNewOrderStore((state) => state.details);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const showModalCreateProduct = () => {
    NiceModal.show(RegisteredModals.ModalCreateProduct);
  };

  useEffect(() => {
    dispatch(setActiveSection(sections[0]));
    // dispatch(setActiveCategory(sections[0]?.categories[0]));
    dispatch(setActiveOrder(null));
  }, [sections]);

  return (
    <>
      <Container maxWidth="xl">
        <TitlePage
          title="Menú"
          action={
            <>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={showModalCreateProduct}
              >
                Nuevo producto
              </Button>
            </>
          }
        />
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
