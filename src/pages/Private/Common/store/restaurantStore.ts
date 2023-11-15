import { Restaurant } from "../models/restaurant.model";
import { useRestaurant } from '../../Restaurant/hooks/useRestaurant';
import { create } from "zustand";



interface RestauranteState{

  restaurant: Restaurant | null;

  setRestaurant: (restaurant: Restaurant | null) => void;




}


export const useRestaurantStore = create<RestauranteState>((set, get) => ({
  title: 'Restaurant',
  restaurant: null,
  setRestaurant: (restaurant: Restaurant | null) => set({ restaurant }),

}));