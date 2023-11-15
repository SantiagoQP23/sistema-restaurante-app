import { restauranteApi } from "../../../../api";
import { UpdateRestaurantDto } from "../../Reports/dto/update-restaurant.dto";
import { Restaurant } from "../../Reports/models/restaurant.model";

export const getRestaurant = async (): Promise<Restaurant> => {
  const resp = await restauranteApi.get<Restaurant>(`restaurant/`);

  return resp.data;
};

export const updateRestaurant = async (
  restaurantId: string,
  restaurant: UpdateRestaurantDto
): Promise<Restaurant> => {
  const resp = await restauranteApi.patch<Restaurant>(
    `restaurant/${restaurantId}`,
    restaurant
  );
  return resp.data;
};
