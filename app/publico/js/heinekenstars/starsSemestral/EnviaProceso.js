import { ObtieneUrl } from "../../funciones/ObtieneUrl.js";
import { Ajax } from "../../funciones/Ajax.js";
import { MuestraMensajeAcepta } from "../../funciones/MuestraMensajeAcepta.js";
import { MuestraMensajeError } from "../../funciones/MuestraMensajeError.js";
import { ObtieneParametrosUrl } from "../../funciones/ObtieneParametrosUrl.js";

export async function EnviaProceso(AOpcion){
  const anio = (AOpcion==2)?document.getElementById("id-anio").value:"";
  const semestre = (AOpcion==2)?document.getElementById("id-Semestre").value:"";
const url = ObtieneUrl({
        "modulo": "heinekenstars",
        "pagina": `StarsSemestral.php`,
      }) + ObtieneParametrosUrl({"parametrosFijos":{"opcion":AOpcion,"anio":anio,"semestre":semestre}});
    await Ajax({
        "metodo": "GET",
        "url": url,
        cbSuccess: async (json) =>{
          if(json.hasOwnProperty("error")){
            MuestraMensajeError(json.error);
          }else{
            await MuestraMensajeAcepta({"mensaje": json.resultado});
          }
        }
    });
}