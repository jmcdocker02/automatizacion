import { Contenedor } from "../../componentes/Contenedor.js"
import { AsignaEventos } from "../../funciones/AsignaEventos.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { LimpiarContenido } from "../../funciones/LimpiarContenido.js";
import { ObtieneFiltros } from "../../funciones/ObtieneFiltros.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { TarjetaFormulario } from "../../componentes/TarjetaFormulario.js";
import { CajaTexto } from "../../componentes/CajaTexto.js";
import { Select } from "../../componentes/Select.js";
import { ObtieneFecha } from "../../funciones/ObtieneFecha.js";
import { ObtieneDatosRetos } from "./ObtieneDatosRetos.js";

export default async function ActualizacionRetos(){ // el nombre de la funcion varia dependiendo del nombre del archivo obligatorio
  const $formulario = document.createElement("form"); // Se crea un formulario para los filtros.
  const $filtros = document.getElementById("filtros"); // Se obtiene el div que se declara en el html origen para que ahi se puedan insertar los filtros dependiendo del modulo que se selecciona
  $formulario.id = "id-formulario-filtros"; // se le asigna un id al fomulario
  LimpiarContenido(); // funcion que se encarga de limpiar el contenido de la SPA
  const $fragmento =  await ObtieneFiltros({"funcionEvento": CambiarFiltros});
  $fragmento.appendChild(TarjetaFormulario({
    "textoEtiqueta": "Fecha",
    "funcionCheckBox": "0",
    "contenido": [
      CajaTexto({
        "type": "date",
        "name": "fechaProceso",
        "tamanio": "9rem",
        "value": ObtieneFecha(1)
      })
    ]
  }));
  $fragmento.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Reto",
      "funcionCheckBox": "0",
      "contenido": [
        Select({
          "id": "reto",
          "anchoLista": "20rem",
          "opciones": [],
          "valorDefault": 1,
          "funcion": CambiarFiltros
        })
      ]
  }));
  $fragmento.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Tipo",
      "funcionCheckBox": "0",
      "contenido": [
        Select({
          "id": "tipo",
          "anchoLista": "5rem",
          "opciones": [
            {
              "valor": 0, 
              "texto": "Avance"
            },
            {
              "valor": 1, 
              "texto": "Cierre"
            }
          ],
          "valorDefault": 0,
          "funcion": CambiarFiltros
        })
      ]
  }));

  $formulario.appendChild(Contenedor({ // Funcion contenedor que se encarga de organizar los elementos que se van a mostrar
      "marco": "borde02",
      "fragmento": $fragmento// Aqui se muestran los elementos filtros que se van a mostrar al usuario
  }));
  $filtros.appendChild($formulario);// Se inserta el foormulario a la seccion de filtros que se lel predestino en el HTML de origen
  document.getElementById("id-formularios").value = parseInt(sessionStorage.getItem("idFormulario"))
  document.getElementById("id-formularios").classList.add("ocultar");
  document.getElementById("id-Formularios-tarjeta").classList.add("ocultar");
  AsignaEventos({ // Funcion que se encarga de asignar los eventos a cada elemento dependiendo de que tipo de evento se va a asignar
    "eventos": [
        { "elemento": "id-Importar", "evento": "click" },
        { "elemento": "id-fechaProceso", "evento": "change" }
    ],
    "funcion": CambiarFiltros   
  });
  
  await ObtieneDatosRetos();

  await ObtieneDatosTabla({"funcion": CambiarFiltros}); // funcion que se encaga de mostrar los datos en una tabla en el contenido de cada modulo
}