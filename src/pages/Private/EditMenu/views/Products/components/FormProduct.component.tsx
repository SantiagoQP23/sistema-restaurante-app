import React, { FC, useEffect, useState } from "react";
import { IProduct, ProductStatus } from "../../../../../../models";
import { AttachMoney } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Box,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { UpdateProductDto } from "../../../dto";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu, updateProduct } from "../../../../../../redux";

import { FormProductImage } from "./";
import { useUpdateProduct } from "../../../hooks/useProducts";
import { useEditMenuStore } from "../../../hooks/useEditMenuStore";

interface Props {
  product: IProduct;
}

const initialForm: UpdateProductDto = {
  id: "",
  name: "",
  description: "",
  price: 0,
  isActive: false,
  isPublic: false,
  status: ProductStatus.AVAILABLE,
  categoryId: "",
};

export const FormProduct: FC<Props> = ({ product }) => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(product);

  const { category, images, ...restProduct } = selectedProduct;

  const { sections } = useSelector(selectMenu);

  const { changeProductCategory } = useEditMenuStore();

  const dispatch = useDispatch();

  const { isLoading, mutateAsync } = useUpdateProduct();

  const getUpdateProductDto = (product: IProduct) => {
    const updateProductDto = {
      ...restProduct,
      categoryId: product.category.id,
    };
    return updateProductDto;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    control,
    reset,
  } = useForm<UpdateProductDto>({
    defaultValues: initialForm,
  });

  const onSubmit = (data: UpdateProductDto) => {
    console.log({ data });
    mutateAsync(data)
      .then((updatedProduct) => {
        reset(getUpdateProductDto(updatedProduct));
        dispatch(updateProduct(updatedProduct));
        setSelectedProduct(updatedProduct);

        const currentCategoryId = updatedProduct.id;
        const oldCategoryId = selectedProduct.category.id;

        if (currentCategoryId !== oldCategoryId) {
          changeProductCategory(updatedProduct, oldCategoryId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    reset(getUpdateProductDto(selectedProduct));
  }, [selectedProduct, sections]);

  useEffect(() => {
    reset(getUpdateProductDto(selectedProduct));
  }, []);

  return (
    <>
      <Box mb={1}>
        <Card>
          <CardHeader title="Imagenes del producto" />
          <CardContent>
            <FormProductImage product={product} />
          </CardContent>
        </Card>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={1}>
          <Card>
            <CardHeader title="Información del producto" />
            <CardContent>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Nombre del producto"
                      type="text"
                      fullWidth
                      {...register("name", {
                        required: "Este campo es requerido",
                        minLength: { value: 2, message: "Minimo 2 caracteres" },
                      })}
                      helperText={errors.name?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Descripcion del producto"
                      margin="dense"
                      multiline
                      rows={4}
                      fullWidth
                      {...register("description", {
                        minLength: {
                          value: 10,
                          message: "Minimo 10 caracteres",
                        },
                      })}
                      helperText={errors.description?.message}
                    />
                  </Grid>
                  {sections && sections.length > 0 && (
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="categoryId"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <>
                            <FormControl fullWidth>
                              <InputLabel htmlFor="grouped-select">
                                Categoría
                              </InputLabel>
                              <Select
                                id="grouped-select"
                                label="Categoría"
                                margin="dense"
                                fullWidth
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!errors.categoryId}
                              >
                                {sections.map((section) => [
                                  <ListSubheader
                                    key={section.id}
                                    sx={{
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {section.name}
                                  </ListSubheader>,

                                  ...section.categories.map((category) => (
                                    <MenuItem
                                      key={category.id}
                                      value={category.id}
                                      sx={{ pl: 3 }}
                                    >
                                      {category.name}
                                    </MenuItem>
                                  )),
                                ])}
                              </Select>
                            </FormControl>
                          </>
                        )}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Estados" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    label="Activo"
                    control={
                      <Controller
                        name="isActive"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Switch
                            checked={value}
                            onChange={onChange}
                            color="success"
                            // onClick={() => changeStatusProduct(producto)}
                            // color={activeProduct?.isActive ? 'success' : 'error'}
                          />
                        )}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    label="Público"
                    control={
                      <Controller
                        name="isPublic"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Switch
                            checked={value}
                            onChange={onChange}
                            color="success"
                            // onClick={() => changeStatusProduct(producto)}
                            // color={activeProduct?.isActive ? 'success' : 'error'}
                          />
                        )}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <FormControl fullWidth>
                          <InputLabel id="select-estado">Estado</InputLabel>

                          <Select
                            labelId="select-estado"
                            label="Estado"
                            fullWidth
                            margin="dense"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={!!errors.status?.type}
                          >
                            <MenuItem value={ProductStatus.AVAILABLE}>
                              Disponible
                            </MenuItem>
                            <MenuItem value={ProductStatus.OUT_OF_SEASON}>
                              Fuera de temporada
                            </MenuItem>
                            <MenuItem value={ProductStatus.OUT_OF_STOCK}>
                              Fuera de stock
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Precios" />
            <CardContent>
              <TextField
                label="Precio"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
                margin="dense"
                fullWidth
                type="number"
                inputProps={{
                  step: 0.05,
                }}
                {...register("price", {
                  required: "Este campo es requerido",
                  min: {
                    value: 0,
                    message: "El valor debe ser mayor a 0",
                  },
                  valueAsNumber: true,
                })}
                helperText={errors.price?.message}
              />
            </CardContent>
          </Card>
          <Box>
            <LoadingButton
              variant="contained"
              type="submit"
              disabled={!isValid || !isDirty}
              loading={isLoading}
            >
              Editar
            </LoadingButton>
          </Box>
        </Stack>
      </form>
    </>
  );
};