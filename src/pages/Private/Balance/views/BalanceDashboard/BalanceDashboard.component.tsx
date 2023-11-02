import { Add, CreditCard, Lock, Paid, Visibility } from "@mui/icons-material";
import { TitlePage } from "../../../components/TitlePage.component";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { ExpensesList, IncomesList } from "./components";
import { AddExpense } from "../Expenses/components/AddExpense.component";
import { useNavigate } from "react-router-dom";
import { AddIncome } from "../Incomes/components/AddIncome.component";
import { useCashRegisterStore } from "../../../Common/store/cashRegisterStore";
import { CardAddCashRegister } from "./components/CardAddCashRegister.component";
import { useEffect, useState } from "react";

import { formatMoney } from "../../../Common/helpers/format-money.helper";
import { useIncomes } from "../../hooks/useIncomes";
import { useExpenses } from "../../hooks/useExpenses";

export enum AddTransactionTabs {
  INCOMES = "add-incomes",
  EXPENSES = "add-expenses",
}

export enum ViewTransactionTabs {
  INCOMES = "incomes",
  EXPENSES = "expenses",
  INVOICES = "invoices",
}

export const BalanceDashboard = () => {
  const navigate = useNavigate();

  const { activeCashRegister } = useCashRegisterStore((state) => state);

  const [tabAddTransaction, setTabAddTransaction] =
    useState<AddTransactionTabs>(AddTransactionTabs.EXPENSES);

  const { incomesQuery, ...filterIncomes } = useIncomes();

  const { ...filterExpenses } = useExpenses();

  const handleChangeTabAddTransaction = (value: AddTransactionTabs) => {
    setTabAddTransaction(value);
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const balanceTransfer = activeCashRegister
    ? activeCashRegister.totalIncomesTransfer +
      activeCashRegister.totalInvoicesTransfer -
      activeCashRegister.totalExpensesTransfer
    : 0;

  useEffect(() => {
    if (activeCashRegister) {
      filterIncomes.handleChangeCashRegister(activeCashRegister);
      filterExpenses.handleChangeCashRegister(activeCashRegister);
    }
  }, []);

  return (
    <>
      <TitlePage
        title="Balance"
        action={
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={() => navigateTo("cash-register")}
            >
              Cierres de caja
            </Button>
            {activeCashRegister && (
              <Button
                variant="contained"
                startIcon={<Lock />}
                onClick={() => navigateTo("close")}
              >
                Cerrar caja
              </Button>
            )}
          </Stack>
        }
      />

      {activeCashRegister === null ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <CardAddCashRegister />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title="Efectivo"
                titleTypographyProps={{
                  variant: "h5",
                }}
                avatar={<Paid color="success" fontSize="large" />}
              />
              <CardContent>
                <Typography variant="h3" mb={1}>
                  {formatMoney(activeCashRegister.balance)}
                </Typography>

                <Stack spacing={3} direction="row">
                  <Box>
                    <Typography variant="caption">Inicio</Typography>
                    <Typography variant="h5" color="success.main">
                      {formatMoney(activeCashRegister.initialAmount)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">Ingresos</Typography>
                    <Typography variant="h5" color="success.main">
                      {formatMoney(activeCashRegister.totalIncomesCash)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">Ventas</Typography>
                    <Typography variant="h5" color="success.main">
                      {formatMoney(activeCashRegister.totalInvoicesCash)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">Gastos</Typography>
                    <Typography variant="h5" color="error.main">
                      {formatMoney(activeCashRegister.totalExpensesCash)}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title="Transferencias"
                titleTypographyProps={{
                  variant: "h5",
                }}
                avatar={<CreditCard color="warning" fontSize="large" />}
              />
              <CardContent>
                <Typography variant="h3" mb={1}>
                  {formatMoney(balanceTransfer)}
                </Typography>

                <Stack spacing={3} direction="row">
                  <Box>
                    <Typography variant="caption">Ingresos</Typography>
                    <Typography variant="h5" color="success.main">
                      {formatMoney(activeCashRegister.totalIncomesTransfer)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">Ventas</Typography>
                    <Typography variant="h5" color="success.main">
                      {formatMoney(activeCashRegister.totalInvoicesTransfer)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">Gastos</Typography>
                    <Typography variant="h5" color="error.main">
                      {formatMoney(activeCashRegister.totalExpensesTransfer)}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Tabs
              value={tabAddTransaction}
              onChange={(e, value) => handleChangeTabAddTransaction(value)}
              sx={{
                mb: 1,
              }}
              indicatorColor="secondary"
            >
              <Tab label="Ingresos" value={AddTransactionTabs.INCOMES} />
              <Tab label="Gastos" value={AddTransactionTabs.EXPENSES} />
            </Tabs>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h4" mb={2}>
              Añadir transacciones
            </Typography>

            {tabAddTransaction === AddTransactionTabs.INCOMES ? (
              <>
                <AddIncome />
              </>
            ) : (
              <AddExpense />
            )}
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="h4">
                Transacciones{" "}
                {/* {incomesQuery.isLoading && <CircularProgress size={12} />}{" "} */}
              </Typography>

              <Button startIcon={<Add />} variant="contained">
                Añadir
              </Button>
            </Stack>

            {tabAddTransaction === AddTransactionTabs.INCOMES ? (
              <>
                {incomesQuery.data && (
                  <IncomesList
                    cashRegister={activeCashRegister}
                    editable
                    data={incomesQuery.data}
                    filterIncomes={filterIncomes}
                  />
                )}
              </>
            ) : (
              <ExpensesList cashRegister={activeCashRegister} editable />
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};
