import { useEffect, useState } from 'react';

import { useAppSelector } from './useRedux';
import { selectCategories, selectProducts, selectSections } from '../redux/slices/menu';
import { ICategory, IProduct } from '../models';


/* const menuInitial = {
  seccion: 2,
  categoria: 8
} */

interface IMenuState{
  idSection: string;
  idCategory: string;
}

export const useProducts = () => {

  // Cargar menu
  const [menu, setMenu] = useState<IMenuState>({ idSection: '', idCategory: '' });

  const { idCategory, idSection } = menu;

  const [categoriasSeccion, setCategoriasSeccion] = useState<ICategory[]>([]);

  const [productosCategoria, setProductosCategoria] = useState<IProduct[]>([]);

  const { sections } = useAppSelector((selectSections));
  const { categories } = useAppSelector((selectCategories));
  const { products } = useAppSelector((selectProducts));

  const changeSection = (idSection: string) => {
    setMenu({ ...menu, idSection });
  };

  const changeCategory = (idCategory: string) => {
    setMenu({ ...menu, idCategory });
  }

  const cargarCategoriasBySeccion = (idSection: string) => {

    if (sections.length > 0) {
      const categoriesActive = categories.filter(category => category.section.id === idSection);

      if (categoriesActive.length > 0) {
        setMenu({...menu, idCategory: categoriesActive[0].id! })
      }

      setCategoriasSeccion(categoriesActive);

    }

  }

  const cargarProductosByIdCategoria = (idCategory: string) => {

    if (sections.length > 0) {
      let productosCategoria = products.filter(product => product.category.id === idCategory);

      setProductosCategoria(productosCategoria);

    }


  }

  useEffect(() => {
    cargarCategoriasBySeccion(idSection);

  }, [idSection, categories])


  useEffect(() => {
    cargarProductosByIdCategoria(idCategory)

  }, [idCategory, products])


  useEffect(() => {
    cargarCategoriasBySeccion(sections[0].id);

  }, [])



  return {
    changeCategory,
    changeSection,
    categoriasSeccion,
    idCategory,
    idSection,
    productosCategoria,
    sections,
  }


}
