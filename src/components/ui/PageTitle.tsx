import { FC } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Typography, Button, Grid } from '@mui/material';

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  docs?: string;
}

export const PageTitle: FC<PageTitleProps> = ({
  heading = '',
  subHeading = '',
  docs = '',
  ...rest
}) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" {...rest}>
      <Grid item>
        <Typography variant="h3" component="h5" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle1">
          {subHeading}
        </Typography>
      </Grid>


     {/* docs &&  <Grid item>
        <Button
          href={docs}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          {heading} Documentation
        </Button>
      </Grid>  */}
    </Grid>
  );
};