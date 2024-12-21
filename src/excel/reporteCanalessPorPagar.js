import { utils, writeFileXLSX } from "xlsx";

const format_items = (data) => {
  let worksheet = [];
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if ((i + 1) % 1048575 === 0) {
      worksheet.push(temp);
      temp = [];
      temp.push([
        data[i].nameClient,
        data[i].email,
        data[i].emailTwo,
        data[i].phone,
        data[i].celphone,
        data[i].contact,
        data[i].city,
        data[i].adress,
      ]);
    } else if (i === data.length - 1) {
      temp.push([
        data[i].nameClient,
        data[i].email,
        data[i].emailTwo,
        data[i].phone,
        data[i].celphone,
        data[i].contact,
        data[i].city,
        data[i].adress,
      ]);
      worksheet.push(temp);
    } else {
      temp.push([
        data[i].nameClient,
        data[i].email,
        data[i].emailTwo,
        data[i].phone,
        data[i].celphone,
        data[i].contact,
        data[i].city,
        data[i].adress,
      ]);
    }
  }
  return worksheet;
};
export default function (datos) {
  const workbook = utils.book_new();
  const data = format_items(datos);
  for (let i = 0; i < data.length; i++) {
    const worksheet = utils.aoa_to_sheet([
      ["Nombre", "Email", "Email 2", "Telefono", "Celular", "Contacto", "Ciudad", "Dirección"],
      ...data[i],
    ]);
    utils.book_append_sheet(workbook, worksheet, `Hoja ${i + 1}`);
  }
  writeFileXLSX(workbook, "Canales-no-pago.xlsx", { flag: "w+" });
}
