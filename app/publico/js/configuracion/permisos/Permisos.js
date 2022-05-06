import { Contenedor } from "../../componentes/Contenedor.js"
import { CambiarFiltros } from "./CambiarFiltros.js";
import { ObtieneFiltros } from "../../funciones/ObtieneFiltros.js";
import { RespaldaFormularioPrincipal } from "../../funciones/RespaldaFormularioPrincipal.js";
import { AsignaEventos } from "../../funciones/AsignaEventos.js";
import { Hidden } from "../../componentes/Hidden.js";
import { CargarPermisos } from "./CargarPermisos.js";

export default async function Permisos(AJson){ // el nombre de la funcion varia dependiendo del nombre del archivo obligatorio
  const {
    idFormulario,
    idUsuario
  } = AJson;
  const $formulario = document.createElement("form"); // Se crea un formulario para los filtros.
  const $filtros = document.createElement("div"); // Se obtiene el div que se declara en el html origen para que ahi se puedan insertar los filtros dependiendo del modulo que se selecciona
  const parametros = {
    "idCatalogo" : idUsuario
  };
  sessionStorage.setItem("idUsuarioPermiso", idUsuario);
  RespaldaFormularioPrincipal({
    "for01": idFormulario,
    "for03": "Permisos"
  })
  $filtros.id = "id-modal-filtros";
  $formulario.id = "id-formulario-filtros"; // se le asigna un id al fomulario
  $formulario.appendChild(Contenedor({ // Funcion contenedor que se encarga de organizar los elementos que se van a mostrar
      "marco": "borde02",
      "fragmento": await ObtieneFiltros({"funcionEvento": CambiarFiltros}) // Aqui se muestran los elementos filtros que se van a mostrar al usuario
  }));
  $formulario.appendChild(Hidden({
    "name" : "catalogo",
    "valor" : idUsuario
  }));
  document.getElementById("modal-principal-encabezado").appendChild($filtros);
  $filtros.appendChild($formulario);// Se inserta el foormulario a la seccion de filtros que se lel predestino en el HTML de origen

  AsignaEventos({
    "eventos": [
        { "elemento": "id-menus", "evento": "change" },
    ],
    "funcion": CambiarFiltros
});

CargarPermisos(idUsuario);
}