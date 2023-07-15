import { Container, Stack } from '@mui/material';
import { Outlet, useNavigate } from "react-router-dom"
import { PageTitle, PageTitleWrapper } from "../../../components/ui"
import { TitlePage } from "../components/TitlePage.component"
import { Button } from '@mui/material/';
import { Add } from '@mui/icons-material';


const Table = () => {

  const navigate = useNavigate();

  return (
    <>

      <Container maxWidth='lg'>
        <TitlePage
          title='Mesas'
          action={
            <Stack>
              <Button
                variant='contained'
                startIcon={<Add />}
                onClick={() => navigate('edit')}
              >
                Agregar
              </Button>

            </Stack>
          }

        />

        <Outlet />

      </Container>
    </>
  )
}
export default Table