import { utils, writeFileXLSX } from "xlsx";

const format_items = (data) => {
  let worksheet = [];
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if ((i + 1) % 1048575 === 0) {
      worksheet.push(temp);
      temp = [];
      temp.push([
        data[i].nameCategory,
        data[i].nominados,
        data[i].npc,
        data[i].pmct,
        data[i].postulationsCount,
        data[i].totalVotes,
        data[i].vrPorcentual,
      ]);
    } else if (i === data.length - 1) {
      temp.push([
        data[i].nameCategory,
        data[i].nominados,
        data[i].npc,
        data[i].pmct,
        data[i].postulationsCount,
        data[i].totalVotes,
        data[i].vrPorcentual,
      ]);
      worksheet.push(temp);
    } else {
      temp.push([
        data[i].nameCategory,
        data[i].nominados,
        data[i].npc,
        data[i].pmct,
        data[i].postulationsCount,
        data[i].totalVotes,
        data[i].vrPorcentual,
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
      [
        "Nombre categoria",
        "Nominados",
        "Npc",
        "Pmct",
        "Conteo de postulacion",
        "total de votos",
        "Porcentaje",
      ],
      ...data[i],
    ]);
    utils.book_append_sheet(workbook, worksheet, `Hoja ${i + 1}`);
  }
  writeFileXLSX(workbook, "Reporte Votos.xlsx", { flag: "w+" });
}
