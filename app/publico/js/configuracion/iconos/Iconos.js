import { Contenedor } from "../../componentes/Contenedor.js"
import { AsignaEventos } from "../../funciones/AsignaEventos.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { LimpiarContenido } from "../../funciones/LimpiarContenido.js";
import { ObtieneFiltros } from "../../funciones/ObtieneFiltros.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";

export default async function Iconos(){
  const $formulario = document.createElement("form");
  const $filtros = document.getElementById("filtros");

  $formulario.id = "id-formulario-filtros";
  LimpiarContenido(); 
  $formulario.appendChild(Contenedor({
      "marco": "borde02",
      "fragmento": await ObtieneFiltros({"funcionEvento": CambiarFiltros})
  }));
  $filtros.appendChild($formulario);
  
  AsignaEventos({
    "eventos": [
        { "elemento": "id-Agregar", "evento": "click" },
    ],
    "funcion": CambiarFiltros
  });

  await ObtieneDatosTabla({"funcion": CambiarFiltros});
}