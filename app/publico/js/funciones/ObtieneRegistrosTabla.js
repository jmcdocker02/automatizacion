export function ObtieneRegistrosTabla(AJson) {
  const {
    idTabla,
    columnas,
    atributo
  } = AJson
  const $cuerpo = document.getElementById(idTabla);
  const totalColumnas = (columnas) 
    ? columnas //es oara verificar si se utiizara una columna mas
    : $cuerpo.rows[0].cells.length - 1
  let datos = "";
  let coma = "";
  for (let i = 1; i < $cuerpo.rows.length; i++) {
    const $boton = $cuerpo.rows[i].cells[totalColumnas].getElementsByTagName("button");
    datos += `${coma}${$boton[0].getAttribute(atributo)}`;
    coma = ";";
  }
  return datos;
}