import { Box, Typography, Stack, Breadcrumbs, Link } from '@mui/material';
import { FC } from "react"


interface Props {
  title: string,
  action?: React.ReactNode; 
}

export const TitlePage: FC<Props> = ({ title, action}) => {

  return (
    <Stack my={2} direction='row' alignItems='center' justifyContent='space-between'>

      <Stack>
        <Typography variant='h3' >{title}</Typography>
        <Breadcrumbs >
          <Link>
            {title}
          </Link>
        </Breadcrumbs>
      </Stack>

      {action}
      {/* <Typography variant='subtitle1'> <b>Menú</b> {" >"} <b>Productos</b> </Typography> */}
    </Stack>

  )
}