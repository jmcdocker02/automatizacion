import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { TablaPermisos } from "./tablaPermisos.js";

export async function CargarPermisos(AIdCatalogo){
    const parametros = {"idCatalogo" : AIdCatalogo};
    const json = await ObtieneDatosTabla({
      "id": "modal-principal-cuerpo",  
      "funcion": CambiarFiltros,
      "modulo" : "configuracion",
      "pagina" : "usuarios.php",
      "parametros" : parametros,
      "resultado": true
    }); 
    document.getElementById("modal-principal-cuerpo").innerHTML = null;
    const $formularioCaptura = document.createElement("form");
    $formularioCaptura.id="id-formulario-captura";
    $formularioCaptura.appendChild(TablaPermisos({
        "registros": json.registros,
        "titulos": json.titulos
      }));
   document.getElementById("modal-principal-cuerpo").appendChild($formularioCaptura);
 }