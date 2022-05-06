import { Contenedor } from "../../componentes/Contenedor.js"
import { AsignaEventos } from "../../funciones/AsignaEventos.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { LimpiarContenido } from "../../funciones/LimpiarContenido.js";
import { ObtieneFiltros } from "../../funciones/ObtieneFiltros.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { TarjetaFormulario } from "../../componentes/TarjetaFormulario.js";
import { Select } from "../../componentes/Select.js";

export default async function StarsSemestral(){ 
  const $formulario = document.createElement("form"); 
  const $filtros = document.getElementById("filtros");
  $formulario.id = "id-formulario-filtros"; 
  LimpiarContenido();
  const $fragmento =  await ObtieneFiltros({"funcionEvento": CambiarFiltros});
  $fragmento.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Año",
      "funcionCheckBox": "0",
      "contenido": [
        Select({
          "id": "anio",
          "anchoLista": "5rem",
          "opciones": [
            {
              "valor": 2022, 
              "texto": "2022"
            },
            {
              "valor": 2023, 
              "texto": "2023"
            }
          ],
          "valorDefault": 2022,
          "funcion": CambiarFiltros
        })
      ]
  }));
  $fragmento.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Semestral",
      "funcionCheckBox": "0",
      "contenido": [
        Select({
          "id": "Semestre",
          "anchoLista": "10rem",
          "opciones": [
            {"valor": 1,"texto": "Enero-Junio"},
            {"valor": 2,"texto": "Julio-Dciciembre"}
          ],
          "valorDefault": 1,
          "funcion": CambiarFiltros
        })
      ]
  }));


  $formulario.appendChild(Contenedor({ 
      "marco": "borde02",
      "fragmento": $fragmento
    }));    
  $filtros.appendChild($formulario);
  document.getElementById("id-formularios").value = parseInt(sessionStorage.getItem("idFormulario"))
  document.getElementById("id-formularios").classList.add("ocultar");
  document.getElementById("id-Formularios-tarjeta").classList.add("ocultar");
  AsignaEventos({ 
    "eventos": [
        { "elemento": "id-Actualizar", "evento": "click" },
    ],
    "funcion": CambiarFiltros
  });

  await ObtieneDatosTabla({"funcion": CambiarFiltros}); 
}