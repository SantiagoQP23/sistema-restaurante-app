import {Card, CardContent, Typography, CardMedia} from '@mui/material/';
import { FC } from 'react';
import { IProducto } from '../../interfaces';


interface Props {
  producto: IProducto
}


export const Producto : FC<Props> = ({ producto }) => {
  return (
    < >

     {/*  <CardMedia
        component="img"
        height="200"
        image="https://sainfoinc.com/wp-content/uploads/2018/02/image-not-available.jpg"
        alt={producto.nombre}
      /> */}
      <Card >
        <CardContent>
          
          <Typography variant='h6'>
            {producto.nombre}
          </Typography>
          <Typography >
          {producto.precio}
          </Typography>
          <Typography variant="body2">
           {producto.descripcion}
          </Typography>
        </CardContent>

      </Card>

    
      {/* 

      ESTO PUEDE SERVIR PARA UNA VENTANA MODAL PARA MOSTRAR MAS INFORMACIÓN DEL PRODUCTO
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://www.goya.com/media/6910/easy-seafood-and-rice.jpg?quality=80"
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {producto.nombre}
          </Typography>

          <Typography sx={{ height: 70 }} variant="body2" color="text.secondary">
            {producto.descripcion}
          </Typography>

          <Typography variant="h6" component="div" align='right'>
            $ {producto.precio}
          </Typography>

        </CardContent>

      </Card> */}
    </>
  );
}