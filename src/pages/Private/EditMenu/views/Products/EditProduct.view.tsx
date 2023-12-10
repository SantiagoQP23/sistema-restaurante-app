import { Container } from "@mui/material/";

import { Navigate, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import { TitlePage } from "../../../components";
import { FormProduct } from "./components/FormProduct.component";

export const EditProduct = () => {

  const params = useParams();

  if (!params.id) {
    return <Navigate to="/menu/products" />;
  }

  const { data: product } = useProduct(params.id);

  if (!product) {
    return <>No se encontro el producto</>;
  }

  return (
    <>
      <TitlePage title={product.name} />

      <Container maxWidth="md">
        {product && <FormProduct product={product} />}
      </Container>
    </>
  );
};
