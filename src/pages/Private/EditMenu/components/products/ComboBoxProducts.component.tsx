import { useSelector } from "react-redux"
import { selectMenu } from "../../../../../redux";
import { Autocomplete, TextField, darken, lighten, styled } from "@mui/material";
import { IProduct } from "../../../../../models";
import { FC, useState } from "react";
import { findProductsByName, getCategories, getProducts } from "../../../../../helpers";
import { sharingInformationService } from "../../../Orders/services/sharing-information.service";


const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

interface Props {
  onFocus?: (event: React.FocusEvent<HTMLDivElement, Element>) => void;
}




export const ComboBoxProducts: FC<Props> = ({onFocus}) => {


  const { sections } = useSelector(selectMenu);

  const categories = getCategories(sections);

  const products = getProducts(sections);
  

  const [nameProduct, setNameProduct] = useState('');

  const filteredProducts = findProductsByName(nameProduct, products);



  const addProductoToOrder = (product: IProduct) => {

    sharingInformationService.setSubject(
      true,
      {
        product,
        quantity: 1
      }
    )
  }



  return (
    <>

      <Autocomplete
        id="combo-box-products"

        filterOptions={(x) => x}
        options={filteredProducts.sort((a, b) => -b.name.localeCompare(a.name))}
        groupBy={(option) => option.category.name}

        getOptionLabel={(option) => option.name}
        // value={client}

        onInputChange={(event, newInputValue) => {
          setNameProduct(newInputValue);

        }}

        onChange={(event, newValue: IProduct | null) => {

          if (newValue) {
            addProductoToOrder(newValue);
          }
        }}

        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}

        onFocus={onFocus}





        renderInput={(params) => <TextField {...params} label="Buscar producto" variant="outlined" />}
        fullWidth
      />


    </>


  )
}

// export const ComboBoxProducts = () => {


//   const { sections } = useSelector(selectMenu);

//   const products = getProducts(sections);
  

//   const [nameProduct, setNameProduct] = useState('');

//   const filteredProducts = findProductsByName(nameProduct, products);



//   const addProductoToOrder = (product: IProduct) => {

//     sharingInformationService.setSubject(
//       true,
//       {
//         product,
//         quantity: 1
//       }
//     )
//   }



//   return (
//     <>

//       <Autocomplete
//         id="combo-box-products"

//         filterOptions={(x) => x}
//         options={filteredProducts || []}
//         getOptionLabel={(option) => option.name}
//         // value={client}

//         onInputChange={(event, newInputValue) => {
//           setNameProduct(newInputValue);

//         }}

//         onChange={(event, newValue: IProduct | null) => {

//           if (newValue) {
//             addProductoToOrder(newValue);
//           }
//         }}





//         renderInput={(params) => <TextField {...params} label="Producto" variant="outlined" />}
//         fullWidth
//       />


//     </>


//   )
// }