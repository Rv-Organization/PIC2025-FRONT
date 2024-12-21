import { utils, writeFileXLSX } from "xlsx";

const format_items = (data) => {
  let worksheet = [];
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if ((i + 1) % 1048575 === 0) {
      worksheet.push(temp);
      temp = [];
      temp.push([
        data[i].categoria,
        data[i].nombre,
        data[i].canal,
        data[i].programa,
        data[i].porcentaje,
        data[i].votos,
      ]);
    } else if (i === data.length - 1) {
      temp.push([
        data[i].categoria,
        data[i].nombre,
        data[i].canal,
        data[i].programa,
        data[i].porcentaje,
        data[i].votos,
      ]);
      worksheet.push(temp);
    } else {
      temp.push([
        data[i].categoria,
        data[i].nombre,
        data[i].canal,
        data[i].programa,
        data[i].porcentaje,
        data[i].votos,
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
      ["Nombre categoria", "Postulacion", "Canal", "Programa ", "Porcentaje", "total de votos"],
      ...data[i],
    ]);
    utils.book_append_sheet(workbook, worksheet, `Hoja ${i + 1}`);
  }
  writeFileXLSX(workbook, "Reporte postulaciones.xlsx", { flag: "w+" });
}
