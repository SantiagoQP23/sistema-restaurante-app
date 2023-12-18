import { Card, Typography, Box, styled, Link } from "@mui/material/";
import { FC } from "react";
import { IProduct } from "../../../../../../models";
import { ProductStatus } from "../../../../../../models/menu.model";
import { IconButton, Stack } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { sharingInformationService } from "../../../services/sharing-information.service";
import { LabelProductStatus } from "../../../../../../components/ui/LabelProductStatus.component";

interface Props {
  product: IProduct;
  onClick: (productId: string) => void;
}

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  borderRadius: 8,
  objectFit: "cover",
  position: "absolute",
});

export const Product: FC<Props> = ({ product, onClick }) => {
  const addProductoToOrder = () => {
    sharingInformationService.setSubject(true, {
      product,
      quantity: 1,
    });
  };

  return (
    <>
      <Card sx={{}}>
        <Box sx={{ pt: "100%", position: "relative" }}>
          {product.status !== ProductStatus.AVAILABLE && (
            <Box
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: "absolute",
              }}
            >
              <LabelProductStatus status={product.status} />
            </Box>
          )}

          <StyledProductImg
            alt={product.name}
            src={product.images || "/static/images/products/no-image.png"}
          />
        </Box>

        <Stack spacing={1} sx={{ p: 2 }}>
          <Typography fontSize={'0.8rem'} color='text.secondary'>{product.quantity} disponibles</Typography>
          <Link
            color="inherit"
            underline="hover"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => onClick(product.id)}
          >
            <Typography variant="h4">{product.name}</Typography>
          </Link>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">$ {product.price}</Typography>

            {product.status === ProductStatus.AVAILABLE && (
              <IconButton color="primary" onClick={addProductoToOrder}>
                <AddShoppingCart />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Card>
    </>
  );
};
