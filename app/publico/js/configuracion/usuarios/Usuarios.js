import { Contenedor } from "../../componentes/Contenedor.js"
import { AsignaEventos } from "../../funciones/AsignaEventos.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { LimpiarContenido } from "../../funciones/LimpiarContenido.js";
import { ObtieneFiltros } from "../../funciones/ObtieneFiltros.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";

export default async function Usuarios(){ // el nombre de la funcion varia dependiendo del nombre del archivo obligatorio
  const $formulario = document.createElement("form"); // Se crea un formulario para los filtros.
  const $filtros = document.getElementById("filtros"); // Se obtiene el div que se declara en el html origen para que ahi se puedan insertar los filtros dependiendo del modulo que se selecciona

  $formulario.id = "id-formulario-filtros"; // se le asigna un id al fomulario
  LimpiarContenido(); // funcion que se encarga de limpiar el contenido de la SPA
  $formulario.appendChild(Contenedor({ // Funcion contenedor que se encarga de organizar los elementos que se van a mostrar
      "marco": "borde02",
      "fragmento": await ObtieneFiltros({"funcionEvento": CambiarFiltros}) // Aqui se muestran los elementos filtros que se van a mostrar al usuario
  }));
  $filtros.appendChild($formulario);// Se inserta el foormulario a la seccion de filtros que se lel predestino en el HTML de origen
  AsignaEventos({ // Funcion que se encarga de asignar los eventos a cada elemento dependiendo de que tipo de evento se va a asignar
    "eventos": [
        { "elemento": "id-Agregar", "evento": "click" },
    ],
    "funcion": CambiarFiltros
  });

  await ObtieneDatosTabla({
    "pagina": "usuarios.php",
    "modulo": "configuracion",
    "funcion": CambiarFiltros
  }); // funcion que se encaga de mostrar los datos en una tabla en el contenido de cada modulo
}