import { ValidarCaptura } from "./VallidarCaptura.js";
import { LlamadoJson } from "./LlamadoJson.js";
import { ObtieneColumnasImportar } from "./ObtieneColumnasImportar.js";
import { ObtieneDatosArchivo } from "./ObtieneDatosArchivo.js";
import { ObtieneUrl } from "../funciones/ObtieneUrl.js";

export async function EnviarDatosExcel(AJson){
  if (await ValidarCaptura()){
    await ObtieneColumnasImportar({});
      const columnas = `?columnasExcel=${sessionStorage.getItem("columnasExcel")}`;
      const formulario = `&idFormulario=${sessionStorage.getItem("idFormulario")}`;
      const imp01 = `&imp01=${document.getElementById("id-imp01").value}`;
      const imp05 = `&imp05=${document.getElementById("id-imp05").value}`;
      const token = `&token=${sessionStorage.getItem("token")}`;
      const adicionales = (AJson["adicionales"]===undefined) ? "" : AJson["adicionales"];
      AJson["parametros"] = `${columnas}${formulario}${imp01}${imp05}${token}${adicionales}`;
      sessionStorage.setItem("urlExcel", ObtieneUrl(AJson));
      await ObtieneDatosArchivo({
        "elemento": document.getElementById("id-arc01"), 
        "funcion": LlamadoJson
        });
    }
}