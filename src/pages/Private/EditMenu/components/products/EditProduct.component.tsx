import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {

  DialogTitle, Button, TextField, Select, MenuItem,
  InputAdornment, Typography, Grid, InputLabel, styled, Box, Card, Avatar, Input, IconButton

} from '@mui/material/';

import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';


import { ArrowBack, AttachMoney } from '@mui/icons-material';


import { Controller, useForm } from 'react-hook-form';


import {  resetActiveProduct, selectCategories, selectMenu, selectProducts, setActiveProduct } from '../../../../../redux';
import { ICreateProduct, IProduct } from '../../../../../models/menu.model';
import { LoadingButton } from '@mui/lab';
import { BtnCancel } from '../../../components';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import {
  createProduct,
  updateProduct as updateProductS
} from '../../services/sections.service';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../hooks';
import { addProduct, updateProduct } from '../../../../../redux/slices/menu/menu.thunks';





const initialProduct = {
  name: '',
  price: 0,
  description: '',
  stock: 9999,
}




interface Props {
  /* producto: IProduct | null, */
}


const AvatarWrapper = styled(Card)(
  ({ theme }) => `
  
  position: absolute;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(0)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(22)};
      height: ${theme.spacing(18)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
  
  position: absolute;
  width: ${theme.spacing(4)};
  height: ${theme.spacing(6)};
  bottom: -${theme.spacing(1)};
  right: -${theme.spacing(1)}; 
    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);



export const EditProduct: FC<Props> = ({ }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { loading, callEndpoint, cancelEndpoint } = useFetchAndLoad();

  const { activeProduct, activeCategory, activeSection } = useSelector(selectMenu);

  let product: ICreateProduct;

  if (activeProduct) {

    const { id, category, images, ...restProduct } = activeProduct!;
    product = { ...restProduct, categoryId: activeProduct.category.id };

  } else {
    product = { ...initialProduct, categoryId: activeCategory!.id };
  }

  //  activeProduct ? { ...activeProduct, categoryId: activeProduct.category.id } : initialForm(activeCategory!.id!);

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<ICreateProduct>({
    defaultValues: product
  });

  // Actualizar o crear un producto
  async function onSubmit(form: ICreateProduct) {

    console.log(form);

    if (activeProduct) {
      await callEndpoint(updateProductS(activeProduct.id, form))
        .then((resp) => {
          const { data } = resp;
          console.log(data.product);
          dispatch(updateProduct(data.product))
          dispatch(setActiveProduct({...activeProduct, ...data.product}))
          enqueueSnackbar('El producto ha sido actualizada', { variant: 'success' })

        })
        .catch((err) => {
          console.log(err)
          enqueueSnackbar('Ya existe', { variant: 'error' })

        });

    } else {
      console.log('añadir')
      await callEndpoint(createProduct(form))
        .then((resp) => {
          const { data } = resp;
          console.log(data.product);
          dispatch(addProduct(data.product))
          enqueueSnackbar('El producto ha sido añadido', { variant: 'success' })
          reset()

        })
        .catch((err) => {
          console.log(err)
          enqueueSnackbar('Ya existe', { variant: 'error' })

        });
    }

  }
  const cancel = () => {
    //dispatch(resetActiveProduct())
  }


  return (
    <>


      <Grid container display='flex' justifyContent='space-between'>
        <Grid item display='flex' justifyContent='left' alignItems='center'>
          <Button onClick={() => navigate(-1)}>
            <ArrowBack />
          </Button>
          <Typography variant='h4'>{activeProduct ? activeProduct!.name : "Añadir Producto"}</Typography>

        </Grid>

      </Grid>




      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} mb={1}>

          <Grid item xs={12} sm={3}>

            <AvatarWrapper>
              <Avatar variant="rounded" alt={product.name} src={'/static/images/products/no-image.png'} />
              <ButtonUploadWrapper>
                <Input

                  id="icon-button-file"
                  name="icon-button-file"
                  type="file"
                  
                />
                <label htmlFor="icon-button-file">
                  <IconButton component="span" color="primary">
                    <UploadTwoToneIcon />
                  </IconButton>
                </label>
              </ButtonUploadWrapper>
            </AvatarWrapper>

          </Grid>

          <Grid container item xs={12} sm={9} spacing={1}>


            <Grid item xs={12} sm={8}>
              <TextField
                autoFocus
                margin="dense"
                label="Nombre del producto"
                type="text"
                fullWidth

                {
                ...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Minimo 2 caracteres' },


                })
                }
                helperText={<Typography color="red">{errors.name?.message} </ Typography>}
              />

            </Grid>
            <Grid item xs={12} sm={4}>

              <TextField
                label="Precio"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
                margin='dense'
                fullWidth
                type='number'
                inputProps={{
                  step: 0.25,
                }}

                {
                ...register('price', {
                  required: 'Este campo es requerido',
                  min: { value: 0, message: 'El valor debe ser mayor a 0' },
                  valueAsNumber: true,

                })
                }
                helperText={<Typography color="red">{errors.price?.message} </ Typography>}

              />
            </Grid>
            <Grid item xs={12} sm={8}>

              <TextField
                label="Descripcion del producto"
                margin="dense"
                multiline
                rows={4}
                fullWidth
                {
                ...register('description', {
                  minLength: { value: 10, message: 'Minimo 10 caracteres' },


                })
                }
                helperText={<Typography color="red">{errors.description?.message} </ Typography>}

              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Stock"
                margin='dense'
                fullWidth
                type='number'
                {
                ...register('stock', {
                  required: 'Este campo es requerido',

                  min: { value: 0, message: 'El valor debe ser mayor a 0' },
                  valueAsNumber: true

                })
                }
                helperText={<Typography color="red">{errors.stock?.message} </ Typography>}

              />

            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='categoryId'
                control={control}
                render={({ field: { onChange, onBlur, value } }) =>
                  <>
                    <InputLabel id='select-categoria'>Categoria</InputLabel>
                    <Select
                      label="select-categoria"
                      margin='dense'
                      fullWidth
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors.categoryId}
                    >
                      {
                        activeSection!.categories.map(categoria => (
                          <MenuItem key={categoria.id!} value={categoria.id!}>{categoria.name}</MenuItem>

                        ))
                      }
                    </Select>
                  </>
                }
              />

            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                variant='outlined'
                loading={loading}
                type='submit'
              >
                {activeProduct ? 'Editar' : "Crear"}
              </LoadingButton>


              {
                loading && <Button
                  color='error'
                  variant='outlined'
                  onClick={() => cancelEndpoint()}
                >
                  Cancelar
                </Button>
              }

            </Grid>
          </Grid>

        </Grid>












      </form>
    </>
  )
}


