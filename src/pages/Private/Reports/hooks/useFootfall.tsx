import { useQuery } from "@tanstack/react-query";
import { getFootfall } from "../services/footfall.service";



export const useFootfall = () => {
  return useQuery(['footfall'], getFootfall, { });
}