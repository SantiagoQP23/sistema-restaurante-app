import { useEffect } from "react";
import { TitlePage } from "../../../components";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CreateProductDto } from "../../dto";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, selectMenu } from "../../../../../redux";
import { IProduct, ProductStatus } from "../../../../../models";
import { AttachMoney } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useCreateProduct } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useEditMenuStore } from "../../hooks/useEditMenuStore";

const initialForm: CreateProductDto = {
  name: "",
  description: "",
  price: 0,
  status: ProductStatus.AVAILABLE,
  categoryId: "",
};

export const CreateProduct = () => {
  const { sections, activeCategory } = useSelector(selectMenu);

  const { mutateAsync, isLoading } = useCreateProduct();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { findCategoryById, addProductToCategory } = useEditMenuStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateProductDto>({
    defaultValues: initialForm,
  });

  const updateCategoryProducts = (product: IProduct) => {
    const category = findCategoryById(product.category.id);

    if (!category) return;

    addProductToCategory(product, category);
  };

  const onSubmit = (data: CreateProductDto) => {
    console.log(data);
    mutateAsync(data).then((product) => {
      dispatch(addProduct(product));
      updateCategoryProducts(product);
      navigateToEditProduct(product.id);
    });
  };

  const navigateToEditProduct = (productId: string) => {
    navigate(`/menu/products/${productId}/edit`);
  };

  useEffect(() => {
    reset({
      ...initialForm,
      status: ProductStatus.AVAILABLE,
      categoryId: activeCategory?.id,
    });
  }, []);

  return (
    <>
      <TitlePage title="Crear producto" />

      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                            minLength: {
                              value: 2,
                              message: "Minimo 2 caracteres",
                            },
                          })}
                          helperText={errors.name?.message}
                          error={!!errors.name}
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
                              value: 2,
                              message: "Minimo 2 caracteres",
                            },
                          })}
                          helperText={errors.description?.message}
                          error={!!errors.description}
                        />
                      </Grid>
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
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Estados" />
                <CardContent>
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
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
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
                    fullWidth
                    type="number"
                    inputProps={{
                      step: 0.05,
                    }}
                    {...register("price", {
                      required: "Este campo es requerido",
                      min: {
                        value: 0.25,
                        message: "El valor debe ser mayor a $0.25",
                      },
                      valueAsNumber: true,
                    })}
                    helperText={errors.price?.message}
                    error={!!errors.price}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <LoadingButton
              variant="contained"
              type="submit"
              // disabled={isDirty && !isValid}
              loading={isLoading}
            >
              Crear
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </>
  );
};