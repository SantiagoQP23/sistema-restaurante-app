import { Button, Card, CardActions, CardContent, IconButton, lighten, styled, Typography } from "@mui/material"
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { EditOutlined } from "@mui/icons-material";

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);



export const CardTable = () => {
  return (
    <>
      <Card title="Mesa 1">
        <CardContent>
          <Typography variant="h4" fontWeight="normal">
            Mesa 1
          </Typography>
          <Typography variant="body1" fontWeight="normal">
            Lorem ipsum dolor sit amet consectetur
          </Typography>
        </CardContent>
        <CardActions >
          <IconButton>
            <EditOutlined fontSize="medium"/>
          </IconButton>

          <IconButtonError>
            <DeleteTwoToneIcon fontSize="medium" />
          </IconButtonError>
        </CardActions>
      </Card>
    </>
  )
}