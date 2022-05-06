import { Contenedor } from "../../../componentes/Contenedor.js"
import { CambiarFiltros } from "./CambiarFiltros.js";
import { ObtieneFiltros } from "../../../funciones/ObtieneFiltros.js";
import { ObtieneDatosTabla } from "../../../funciones/ObtieneDatosTabla.js";
import { RespaldaFormularioPrincipal } from "../../../funciones/RespaldaFormularioPrincipal.js";

export default async function Menus(AIdMenus){
  const $formulario = document.createElement("form");
  const $filtros = document.createElement("div");
  RespaldaFormularioPrincipal({
    "for01": AIdMenus,
    "for03": "Menus"
  })
  $filtros.id = "id-modal-filtros";
  $formulario.id = "id-modal-filtros";
  $formulario.appendChild(Contenedor({
      "marco": "borde02",
      "fragmento": await ObtieneFiltros({"funcionEvento":CambiarFiltros})
  }));
  document.getElementById("modal-secundaria-encabezado").appendChild($filtros);
  $filtros.appendChild($formulario);
  // document.getElementById("id-formularios").value = AIdMenus;
  // document.getElementById("id-Formularios-tarjeta").style.display = "none";

  await ObtieneDatosTabla({
    "id": "modal-secundaria-cuerpo",
    "funcion": CambiarFiltros
  });
}