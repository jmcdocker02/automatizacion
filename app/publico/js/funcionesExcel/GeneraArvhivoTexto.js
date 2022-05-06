import { Ajax } from "../funciones/Ajax.js";
import { DescargarArchivo } from "../funciones/DescargarArchivo.js";
import { ObtieneParametrosUrl } from "../funciones/ObtieneParametrosUrl.js";
import { ObtieneUrl } from "../funciones/ObtieneUrl.js";

export async function GeneraArchivoTexto(e){
    const idTabla = e.target.getAttribute("data-id");
    await Ajax({
        "metodo": "GET",
        "url": ObtieneUrl({
          "modulo": "heinekenstars",
          "pagina": "exportarArchivoTexto.php"
        })+ObtieneParametrosUrl({"parametrosFijos": {"idTabla": idTabla}}),
        cbSuccess: async(json) => {
            if(json.hasOwnProperty("resultado")){
            DescargarArchivo({
                "url":json.resultado.url, 
                "nombreArchivo":json.resultado.archivo});
          } else {
            respuesta = json.error;
          }
        }
    });
}