import { Outlet } from "react-router-dom"

import { Container } from '@mui/material';



const Balance = () => {



  return (
    <>
    <Container maxWidth='lg'>

      <Outlet />

    </Container>

    </>
  )
}

export default Balance