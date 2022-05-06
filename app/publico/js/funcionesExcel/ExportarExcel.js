import { ObtieneUrl } from "../funciones/ObtieneUrl.js";
import { Ajax } from "../funciones/Ajax.js";
import { DescargarArchivo } from "../funciones/DescargarArchivo.js";
import { MuestraMensajeError } from "../funciones/MuestraMensajeError.js";
import { ObtieneParametrosUrl } from "../funciones/ObtieneParametrosUrl.js";

export async function ExportarExcel(AJson){
  const {modulo, pagina}=AJson;
  const url = ObtieneUrl({
        "modulo": modulo,
        "pagina": pagina
      }) + ObtieneParametrosUrl({});
    await Ajax({
        "metodo": "OPTIONS",
        "url": url,
        cbSuccess: async (json) =>{
          //console.log(json.error);
          if(json.hasOwnProperty("error")){
            MuestraMensajeError(json.error);
          }else{
            DescargarArchivo({
              "url":json.resultado.url, 
              "nombreArchivo":json.resultado.nombreArchivo});
          }
        }
    });
}