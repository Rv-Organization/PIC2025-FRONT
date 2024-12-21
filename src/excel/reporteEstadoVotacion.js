import { utils, writeFileXLSX } from "xlsx";

const format_items = (data) => {
  let worksheet = [];
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if ((i + 1) % 1048575 === 0) {
      worksheet.push(temp);
      temp = [];
      temp.push([
        data[i].category,
        data[i].channel,
        data[i].name,
        data[i].program,
        data[i].member,
        data[i].general,
        data[i].total,
      ]);
    } else if (i === data.length - 1) {
      temp.push([
        data[i].category,
        data[i].channel,
        data[i].name,
        data[i].program,
        data[i].member,
        data[i].general,
        data[i].total,
      ]);
      worksheet.push(temp);
    } else {
      temp.push([
        data[i].category,
        data[i].channel,
        data[i].name,
        data[i].program,
        data[i].member,
        data[i].general,
        data[i].total,
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
      ["Categoria", "Canal", "Nombre", "Programa", "Miembros Votantes", "Publico General", "Total"],
      ...data[i],
    ]);
    utils.book_append_sheet(workbook, worksheet, `Hoja ${i + 1}`);
  }
  writeFileXLSX(workbook, "Estado-votacion.xlsx", { flag: "w+" });
}
