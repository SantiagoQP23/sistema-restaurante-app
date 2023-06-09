import { useState, FC } from 'react';

import { Add } from "@mui/icons-material"
import { Button, Card, CardContent, Stack } from '@mui/material';
import { ComboBoxProducts } from '../../../../EditMenu/components/products/ComboBoxProducts.component';
import { IOrder } from '../../../../../../models';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from '../../../../../../redux';


interface Props {
  order: IOrder;
}


export const BtnAddProduct: FC<Props> = ({ order }) => {


  const [clicked, setClicked] = useState(false);

  const dispatch = useDispatch();



  const handleClicked = () => {
    setClicked(!clicked);
  }

  const handleActiveOrder = () => {
    dispatch(setActiveOrder(order));
  }

  const handleAddProduct = () => {
    handleActiveOrder();
    handleClicked();

  }

  const handleCancel = () => {
    dispatch(setActiveOrder(null));
    handleClicked();
  }

  const onFocus = (event: React.FocusEvent<HTMLDivElement, Element>) => {
    handleActiveOrder();
  }

  return (
    <>
      <Card
        sx={{
          // bgcolor: 'transparent',
        }}
      >
        {
          clicked
            ?
            (<>

              <CardContent
                
              >
                <Stack spacing={1}>

                  <ComboBoxProducts onFocus={handleActiveOrder} />
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={handleCancel}
                    size='small'
                  >
                    Cancelar
                  </Button>
                </Stack>
              </CardContent>
            </>)
            : (<Button
              startIcon={<Add />}
              fullWidth
              variant="outlined"
              onClick={handleAddProduct}
              color='secondary'


            >
              Añadir producto

            </Button>)

        }



      </Card>


    </>
  )
}