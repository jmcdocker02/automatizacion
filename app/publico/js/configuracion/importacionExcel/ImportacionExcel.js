import { Contenedor } from "../../componentes/Contenedor.js"
import { CambiarFiltros } from "./CambiarFiltros.js";
import { ObtieneFiltros } from "../../funciones/ObtieneFiltros.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { RespaldaFormularioPrincipal } from "../../funciones/RespaldaFormularioPrincipal.js";

export default async function ImportacionExcel(AJson){ // el nombre de la funcion varia dependiendo del nombre del archivo obligatorio
  const { idFormulario, idImportaciones } = AJson;
  const $formulario = document.createElement("form"); // Se crea un formulario para los filtros.
  const $filtros = document.createElement("div"); // Se obtiene el div que se declara en el html origen para que ahi se puedan insertar los filtros dependiendo del modulo que se selecciona
  RespaldaFormularioPrincipal({
    "for01": idImportaciones,
    "for03": "Importacion Excel"
  })
  $filtros.id = "id-modal-filtros";
  $formulario.id = "id-formulario-filtros"; // se le asigna un id al fomulario
  $formulario.appendChild(Contenedor({ // Funcion contenedor que se encarga de organizar los elementos que se van a mostrar
      "marco": "borde02",
      "fragmento": await ObtieneFiltros({"funcionEvento": CambiarFiltros}) // Aqui se muestran los elementos filtros que se van a mostrar al usuario
  }));
  $filtros.appendChild($formulario);// Se inserta el foormulario a la seccion de filtros que se lel predestino en el HTML de origen
  document.getElementById("modal-secundaria-encabezado").appendChild($filtros);
  document.getElementById("id-formularios").value = idFormulario;
  document.getElementById("id-Formularios-tarjeta").style.display = "none";

  await ObtieneDatosTabla({
    "id": "modal-secundaria-cuerpo",
    "funcion": CambiarFiltros
  }); // funcion que se encaga de mostrar los datos en una tabla en el contenido de cada modulo
}