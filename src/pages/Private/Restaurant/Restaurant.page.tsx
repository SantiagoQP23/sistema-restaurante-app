import React from "react";
import { TitlePage } from "../components";
import {
  Container,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useRestaurantStore } from "../Common/store/restaurantStore";
import { useForm } from "react-hook-form";
import { UpdateRestaurantDto } from "../Reports/dto/update-restaurant.dto";
import { useUpdateRestaurant } from "./hooks/useRestaurant";
import { LoadingButton } from "@mui/lab";

const Restaurant = () => {
  const { restaurant } = useRestaurantStore((state) => state);

  const updateRestaurantMutation = useUpdateRestaurant();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateRestaurantDto>({
    defaultValues: {
      name: restaurant?.name,
      capacity: restaurant?.capacity,
    },
  });

  const onSubmit = (data: UpdateRestaurantDto) => {
    console.log(data);

    updateRestaurantMutation.mutate(data);
  };

  return (
    <>
      <Container maxWidth="lg">
        <TitlePage title="Restaurante" />

        {restaurant ? (
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader title="Información" />

              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Nombre"
                      type="text"
                      fullWidth
                      required
                      {...register("name", {
                        required: "Este es un campo requerido",
                      })}
                      helperText={errors.name?.message}
                      error={!!errors.name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Capacidad"
                      type="number"
                      fullWidth
                      required
                      {...register("capacity", {
                        required: "Este es un campo requerido",
                        min: {
                          value: 1,
                          message: "La capacidad debe ser mayor a 0",
                        },
                        valueAsNumber: true,
                      })}
                      helperText={errors.capacity?.message}
                      error={!!errors.capacity}
                    />
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={updateRestaurantMutation.isLoading}
                >
                  Guardar
                </LoadingButton>
              </CardActions>
            </form>
          </Card>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              No se ha configurado un restaurante
            </Typography>
          </>
        )}
      </Container>
    </>
  );
};

export default Restaurant;
