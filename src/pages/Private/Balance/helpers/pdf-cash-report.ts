import { ICreatePDF, Img, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import { Expense } from "../models/expense.model";
import { Income } from "../models/income.model";
import { ActiveCashRegister } from "../services/cash-register.service";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { getPaymentMethod } from "../../Common/helpers/get-payment-method";
import { formatMoney } from '../../Common/helpers/format-money.helper';


import logo from '../../../../assets/logo3.png';


export const generatePdfCashReport = async (cash: ActiveCashRegister, incomes: Income[], expenses: Expense[]): Promise<ICreatePDF> => {



  PdfMakeWrapper.setFonts(pdfFonts);

  const pdf = new PdfMakeWrapper();

  pdf.pageSize('A4');
  // pdf.pageMargins([10, 10, 10, 10]);
  pdf.defaultStyle({
    fontSize: 10,
  });

  pdf.add(
    await new Img(logo).width(50).height(50).alignment('center').margin([0, 0, 0, 10]).build()
  )

  pdf.add(
    new Txt('Restaurant Doña Yoli').alignment('center').bold().end
  );

  pdf.add(
    new Txt('Reporte de caja').alignment('center').bold().fontSize(15).margin([0, 10, 0, 1]).end
  );

  // Fecha de generación del reporte
  pdf.add(
    new Txt(`Generado en: ${format(new Date(), 'dd MMMM yyyy HH:mm', { locale: es })}`).margin([0, 0, 0, 10]).alignment('center').fontSize(8).end
  );


  pdf.add(
    new Txt(`Información de apertura`).bold().margin([0, 0, 0, 10]).end
  )

  pdf.add(
    new Txt(`Fecha: ${format(new Date(cash.createdAt), 'dd MMMM yyyy HH:mm', { locale: es })}`).end
  );
  pdf.add(
    new Txt(`Aperturado por: ${cash.user.person.firstName} ${cash.user.person.lastName}`).margin([0, 5, 0, 5]).end

  );


  pdf.add(
    new Txt(`Resumen de transacciones en efectivo`).bold().margin([0, 10, 0, 10]).end
  )

  pdf.add(
    new Txt(`Monto inicial: ${formatMoney(cash.initialAmount)}`).margin([0, 0, 0, 5]).end
  );
  pdf.add(
    new Txt(`Ingresos ${formatMoney(cash.totalIncomesCash)}`).margin([0, 10, 0, 5]).end
  );
  pdf.add(
    new Txt(`Ventas ${formatMoney(cash.totalInvoicesCash)}`).margin([0, 10, 0, 5]).end
  );

  pdf.add(
    new Txt(`Egresos ${formatMoney(cash.totalExpensesCash)}`).margin([0, 10, 0, 5]).end
  );

  pdf.add(
    new Txt(`Balance: ${formatMoney(cash.balance)}`).margin([0, 0, 0, 5]).bold().end
  );



  pdf.add(
    new Txt(`Resumen de transacciones en transferencias`).bold().margin([0, 10, 0, 10]).end
  )

  pdf.add(
    new Txt(`Ingresos ${formatMoney(cash.totalIncomesTransfer)}`).margin([0, 10, 0, 5]).end
  );

  pdf.add(
    new Txt(`Ventas ${formatMoney(cash.totalInvoicesTransfer)}`).margin([0, 10, 0, 5]).end
  );

  pdf.add(
    new Txt(`Egresos ${formatMoney(cash.totalExpensesTransfer)}`).margin([0, 10, 0, 5]).end
  );


  if (cash.isClosed) {

    pdf.add(
      new Txt(`Información de cierre`).bold().margin([0, 10, 0, 10]).end
    )

    pdf.add(
      new Txt(`Monto final: ${formatMoney(cash.finalAmount)}`).margin([0, 0, 0, 5]).end
    );

    pdf.add(
      new Txt(`Diferencia: ${formatMoney(cash.discrepancy)}`).margin([0, 0, 0, 5]).end
    );

    pdf.add(
      new Txt(`Cerrado por: ${cash.closingUser.person.firstName} ${cash.closingUser.person.lastName}`).margin([0, 0, 0, 5]).end
    );
  }


  pdf.add(
    new Txt(`Ingresos`).alignment('center').bold().margin([0, 10, 0, 5]).end
  );

  const transactionsHeaders = ['Fecha', 'Monto', 'Descripción', 'Método de pago', 'Responsable'];
  const incomesData = incomes.map(income => [format(new Date(income.createdAt), 'dd MMMM yyyy HH:mm', { locale: es }), formatMoney(income.transaction.amount), income.transaction.description, getPaymentMethod(income.transaction.paymentMethod), `${income.transaction.responsible.person.firstName} ${income.transaction.responsible.person.lastName}`]);

  pdf.add(
    new Table([
      transactionsHeaders,
      ...incomesData
    ]).widths(['auto', 'auto', '*', 'auto', '*']).end
  );

  pdf.add(
    new Txt(`Egresos`).alignment('center').bold().margin([0, 10, 0, 5]).end
  );


  const expensesHeader = ['Fecha', 'Monto', 'Descripción', 'Método de pago', 'Responsable'];
  const expensesData = expenses.map(expense => [format(new Date(expense.createdAt), 'dd MMMM yyyy HH:mm', { locale: es }), formatMoney(expense.transaction.amount), expense.transaction.description, getPaymentMethod(expense.transaction.paymentMethod), `${expense.transaction.responsible.person.firstName} ${expense.transaction.responsible.person.lastName}`]);

  pdf.add(
    new Table([
      expensesHeader,
      ...expensesData
    ]).widths(['auto', 'auto', '*', 'auto', '*']).end
  );









  return pdf.create();




}