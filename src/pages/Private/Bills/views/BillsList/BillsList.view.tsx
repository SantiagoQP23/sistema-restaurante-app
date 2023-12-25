import { Container, Grid } from "@mui/material";
import React from "react";
import { TitlePage } from "../../../components";
import { useBills } from "../../hooks/useBills";
import { BillCard } from "./components/BillCard.component";

export const BillsList = () => {
  const { data: bills, isLoading } = useBills();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container maxWidth="lg">
      <TitlePage title="Cuentas" />

      <Grid container spacing={2}>
        {bills?.map((bill) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={bill.id}>
            <BillCard bill={bill} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
