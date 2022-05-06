import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { TablaPermisos } from "./TablaPermisos.js";

export async function ObtieneDatosPermisos() {

    document.getElementById("id-empresas").value = document.getElementById("id-Empresas").value;
    document.getElementById("id-mesnu").value = document.getElementById("id-Menus").value;
    const formularios = await ObtieneDatosTabla({
        "resultado":true,
        "modulo": "php/heinekenstars",
        "pagina": "Usuarios.php"
    });
     $cuerpo.innerHTML = null;
      $cuerpo.appendChild(TablaPermisos({
       "registros": json.registros,
       "titulos": json.titulos,
        "checado": AChecado
      }));
}