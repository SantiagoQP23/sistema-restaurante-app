import { useState, FC } from "react";

import { Add, CancelOutlined } from "@mui/icons-material";
import { Button, Card, CardContent, Stack } from "@mui/material";
import { ComboBoxProducts } from "../../../../EditMenu/components/products/ComboBoxProducts.component";
import { IOrder, IProduct } from "../../../../../../models";
import { useDispatch } from "react-redux";
import { setActiveOrder } from "../../../../../../redux";
import { sharingInformationService } from "../../../services/sharing-information.service";

interface Props {
  order: IOrder;
}

export const BtnAddProduct: FC<Props> = ({ order }) => {
  const [clicked, setClicked] = useState(false);

  const dispatch = useDispatch();

  const handleClicked = () => {
    setClicked(!clicked);
  };

  const handleActiveOrder = () => {
    dispatch(setActiveOrder(order));
  };

  const handleAddProduct = () => {
    handleActiveOrder();
    handleClicked();
  };

  const handleCancel = () => {
    dispatch(setActiveOrder(null));
    handleClicked();
  };

  const addProductoToOrder = (product: IProduct) => {
    sharingInformationService.setSubject(true, {
      product,
      quantity: 1,
    });
  };


  return (
    <>
      <Card
        sx={{
          // bgcolor: 'transparent',
          boxShadow: "none",
        }}
      >
        {clicked ? (
          <>
            <CardContent>
              <Stack spacing={1}>
                <ComboBoxProducts onFocus={handleActiveOrder} selectProduct={addProductoToOrder} />
                <Button
                  color="inherit"
                  startIcon={<CancelOutlined />}
                  onClick={handleCancel}
                  size="small"
                  
                >
                  Cancelar
                </Button>
              </Stack>
            </CardContent>
          </>
        ) : (
          <Button
            startIcon={<Add />}
            fullWidth
            variant="text"
            onClick={handleAddProduct}
            color="inherit"
          >
            Añadir producto
          </Button>
        )}
      </Card>
    </>
  );
};
