import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Label } from "../../../../components/ui";
import { Paid, Pending } from "@mui/icons-material";

interface Props {
  isPaid: boolean;
}

export const LabelStatusPaid: FC<Props> = ({ isPaid }) => {
  return (
    <>
      <Typography variant="h4" display="flex" alignItems="center">
        <Label color={isPaid ? "success" : "warning"}>
          <Box mr={1}>
            {isPaid ? <Paid fontSize="small" /> : <Pending fontSize="small" />}
          </Box>
          {isPaid ? "Pagado" : "Por pagar"}
        </Label>
      </Typography>
    </>
  );
};
