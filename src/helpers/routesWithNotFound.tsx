import { Routes, Route } from 'react-router-dom';
import { Layout } from '../pages/Private/components/Layout.component';
import Status404 from '../pages/Status/Status404/index';

interface Props {
  children: JSX.Element[] | JSX.Element;
}


export const RoutesWithNotFound = ({children}: Props) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={
        
         <Status404 />
        
      } />
    </Routes>
  )
}