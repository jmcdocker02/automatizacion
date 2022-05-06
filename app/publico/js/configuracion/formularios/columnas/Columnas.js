import { Contenedor } from "../../../componentes/Contenedor.js"
import { ObtieneFiltros } from "../../../funciones/ObtieneFiltros.js";
import { ObtieneDatosTabla } from "../../../funciones/ObtieneDatosTabla.js";
import { RespaldaFormularioPrincipal } from "../../../funciones/RespaldaFormularioPrincipal.js";
import { CambiarFiltros } from "./CambiarFiltros.js";

export default async function Columnas(AJson){
  const { idFormulario, idColumnas} = AJson;
  const $formulario = document.createElement("form");
  const $filtros = document.createElement("div");
  RespaldaFormularioPrincipal({
    "for01": idColumnas,
    "for03": "Columnas"
  })
  $filtros.id = "id-modal-filtros";
  $formulario.id = "id-formulario-filtros";
  $formulario.appendChild(Contenedor({
      "marco": "borde02",
      "fragmento": await ObtieneFiltros({"funcionEvento": CambiarFiltros})
  }));
  document.getElementById("modal-secundaria-encabezado").appendChild($filtros);
  $filtros.appendChild($formulario);
  document.getElementById("id-formularios").value = idFormulario;
  document.getElementById("id-Formularios-tarjeta").style.display = "none";

  await ObtieneDatosTabla({
    "id": "modal-secundaria-cuerpo",
    "funcion": CambiarFiltros
  });
}