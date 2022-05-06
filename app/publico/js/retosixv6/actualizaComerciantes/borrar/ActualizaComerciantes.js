import { Contenedor } from "../../componentes/Contenedor.js"
import { AsignaEventos } from "../../funciones/AsignaEventos.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { LimpiarContenido } from "../../funciones/LimpiarContenido.js";
import { ObtieneFiltros } from "../../funciones/ObtieneFiltros.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";

export default async function ActualizaComerciantes(){ 
  const $formulario = document.createElement("form"); 
  const $filtros = document.getElementById("filtros");
  $formulario.id = "id-formulario-filtros"; 
  LimpiarContenido(); 
  $formulario.appendChild(Contenedor({ 
      "marco": "borde02",
      "fragmento": await ObtieneFiltros({"funcionEvento": CambiarFiltros})
  }));
  $filtros.appendChild($formulario);
  document.getElementById("id-procesosautomatizados").value = 2;
  document.getElementById("id-procesosautomatizados").classList.add("ocultar");
  document.getElementById("id-Procesosautomatizados-tarjeta").classList.add("ocultar");
  AsignaEventos({ 
    "eventos": [
        { "elemento": "id-Actualizar", "evento": "click" },
    ],
    "funcion": CambiarFiltros
  });

  await ObtieneDatosTabla({"funcion": CambiarFiltros}); 
}