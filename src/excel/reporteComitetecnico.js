import { utils, writeFileXLSX } from "xlsx";

const format_items = (data) => {
  let worksheet = [];
  let temp = [];
  let constador_categoria = 0;

  let comite = data[0].comite.map((e) => e.name);
  comite.push("Puntos");
  comite.push("Porcentaje %");

  for (let i = 0; i < data.length; i++) {
    if ((i + 1) % 1048575 === 0) {
    } else if (i === data.length - 1) {
      temp.push(["Numero de jurados votantes", data[i].general.nmct]);
      temp.push(["Numero maximo puntos", data[i].general.pmct]);
      temp.push(["Numero de trabajos", data[i].general.npc]);
      temp.push(["Numero de nominados", data[i].general.nominados]);
      temp.push(["Total votos", data[i].general.totalVotes]);
      temp.push(["Valor referente", data[i].general.vr]);
      temp.push(["Porcentaje referente", data[i].general.porcentaje]);
      worksheet.push(temp);
    } else {
      if (data[i]?.general.categoria === data[i]?.general.categoria && i != 0) {
        temp.push([
          data[i].datos.nombre,
          data[i].comite[0].vote,
          data[i].comite[1].vote,
          data[i].comite[2].vote,
          data[i].comite[3].vote,
          data[i].comite[4].vote,
          data[i].comite[5].vote,
          data[i].comite[6].vote,
          data[i].comite[7].vote,
          data[i].comite[8].vote,
          data[i].comite[9].vote,
          data[i].comite[10].vote,
          data[i].comite[11].vote,
          data[i].comite[12].vote,
          data[i].datos.votos,
          data[i].datos.porcentaje_postulacion,
        ]);
      }
      if (data[i]?.general.categoria != data[i + 1]?.general.categoria) {
        temp.push(["Numero de jurados votantes", data[i].general.nmct]);
        temp.push(["Numero maximo puntos", data[i].general.pmct]);
        temp.push(["Numero de trabajos", data[i].general.npc]);
        temp.push(["Numero de nominados", data[i].general.nominados]);
        temp.push(["Total votos", data[i].general.totalVotes]);
        temp.push(["Valor referente", data[i].general.vr]);
        temp.push(["Porcentaje referente", data[i].general.porcentaje]);
      }
      if (i == 0) {
        constador_categoria++;
        temp.push([constador_categoria, data[i].general.categoria]);
        temp.push(["Puntos por categoria", data[i]?.general.pmct]);
        temp.push(["Programas", ...comite]);
        temp.push([
          data[i].datos.nombre,
          data[i].comite[0].vote,
          data[i].comite[1].vote,
          data[i].comite[2].vote,
          data[i].comite[3].vote,
          data[i].comite[4].vote,
          data[i].comite[5].vote,
          data[i].comite[6].vote,
          data[i].comite[7].vote,
          data[i].comite[8].vote,
          data[i].comite[9].vote,
          data[i].comite[10].vote,
          data[i].comite[11].vote,
          data[i].comite[12].vote,
          data[i].datos.votos,
          data[i].datos.porcentaje_postulacion,
        ]);
      } else if (
        data[i].general.categoria != data[i + 1]?.general.categoria &&
        data[i].general.categoria != data[i + 2]?.general.categoria
      ) {
        i != 0 ? temp.push([" "]) : "";
        constador_categoria++;
        temp.push([constador_categoria, data[i + 1].general.categoria]);
        temp.push(["Puntos por categoria", data[i + 1]?.general.pmct]);
        temp.push(["Programas", ...comite]);
      }
    }
  }
  return worksheet;
};
export default function (datos) {
  const workbook = utils.book_new();
  const data = format_items(datos);

  for (let i = 0; i < data.length; i++) {
    const worksheet = utils.aoa_to_sheet([...data[i]]);
    utils.book_append_sheet(workbook, worksheet, `Hoja ${i + 1}`);
  }
  writeFileXLSX(workbook, "Resultados comité técnico.xlsx", { flag: "w+" });
}
