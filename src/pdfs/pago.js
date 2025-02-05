import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { formatNum_ } from "../global";

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : null;

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import moment from "moment";

let estructure_image = (image) => {
  let format = { width: "13%", margin: [0, 2, 0, 2], alignment: "start" };
  if (!image) format.stack = [{ text: "" }];
  else {
    format.fit = [50, 50];
    format.image = image;
  }

  return { ...format };
};

let table_body = (listado = []) => {
  let items_pdf = [];

  listado.forEach((item) => items_pdf.push(format_item(item)));

  return items_pdf;
};
let format_item = (item) => {
  return [
    { text: item.quantity, fontSize: 9, bold: true, alignment: "center" },
    { text: item.nameCategory, fontSize: 9, bold: true, alignment: "center" },
    {
      text: formatNum_(item.price),
      fontSize: 9,
      bold: true,
      alignment: "center",
    },
  ];
};
export default function (items, logo, name) {
  let data = items.filter((e) => e.quantity);
  let total = items[items.length - 1];
  return new Promise((resolve) => {
    let headers = ["Cantidad", "Postulación", "Valor a pagar"].map((el) => {
      return { text: el, fontSize: 10, bold: true, alignment: "center" };
    });
    var dd = {
      //   watermark: { text: "PREMIOS INDIA CATALINA 39°", color: "black", opacity: 0.2 },
      pageSize: {
        width: 300,
        height: 500,
      },
      info: {
        title: "Ticket",
        author: "eonia",
        subject: "Información de comprobate",
        keywords: "keywords for document",
      },
      pageMargins: [10, 80, 10, 10],
      header: function () {
        return {
          margin: [40, 30, 40, 0],
          stack: [
            {
              columns: [
                estructure_image(logo),
                {
                  text: name,
                  fontSize: 15,
                  bold: true,
                  alignment: "center",
                },
              ],
            },
          ],
        };
      },
      content: [
        {
          margin: [10, 30, 10, 0],
          style: "tableExample",
          table: {
            widths: ["25%", "48%", "33%"],
            body: [
              headers,
              ...table_body(data),
              [
                { text: "", fontSize: 9, bold: true, alignment: "center" },
                {
                  text: "Total :",
                  fontSize: 9,
                  bold: true,
                  alignment: "center",
                },
                {
                  text: formatNum_(total),
                  fontSize: 9,
                  bold: true,
                  alignment: "center",
                },
              ],
            ],
          },
          layout: "lightHorizontalLines",
        },
      ],
    };
    pdfMake.createPdf(dd).open();
    pdfMake.createPdf(dd).download();

    resolve(true);
  });
}
