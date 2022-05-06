import { CambiaContenidoLista } from "../../funciones/CambiaContenidoLista.js";
import { ObtieneUrl } from "../../funciones/ObtieneUrl.js";

export async function ObtieneDatosRetos(){
    const resultado = [];
    const fecha =  document.getElementById("id-fechaProceso").value;
    const url = ObtieneUrl({
        "modulo": "heinekenstars",
        "pagina": "catalogoRetos.php",
        "parametros": `?fechaProceso=${fecha}`
    })
    await CambiaContenidoLista({
        "idLista": "id-reto",
        "url": url
    })
    return resultado;
}