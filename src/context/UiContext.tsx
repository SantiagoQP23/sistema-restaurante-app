import { createContext} from 'react';

export interface IUi{
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const UiContext = createContext({} as IUi);


