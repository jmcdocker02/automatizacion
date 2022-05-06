import { Tabla } from "../componentes/Tabla.js";
import { CerrarSession } from "../general/CerrarSession.js";
import { Ajax } from "./Ajax.js";
import { ObtieneParametrosUrl } from "./ObtieneParametrosUrl.js";
import { ObtieneUrl } from "./ObtieneUrl.js";

export async function ObtieneDatosTabla(AJson) {
    const {
        id,
        idFormulario,
        parametros,
        funcion,
        resultado,
        pagina,
        modulo
    } = AJson;
    const idContenido = (id === undefined) ? "contenido" : id;
    const $cuerpo = document.getElementById(idContenido);
    const formulario = (idFormulario) ? idFormulario : sessionStorage.getItem("idFormulario");
    const parametroPagina = (pagina) ? pagina : "formulario.php";
    const parametroModulo = (modulo) ? modulo : "general";
    let datos;
    const regresaDatos = (resultado) ? true : false;
    await Ajax({
        "metodo": "GET",
        "url": ObtieneUrl({
            "modulo": parametroModulo,
            "pagina": parametroPagina
        }) + ObtieneParametrosUrl({"formulario":formulario, "parametrosFijos": parametros}),
        cbSuccess: async(json) => {
          if(json.hasOwnProperty("error")){
            await CerrarSession(json.error.error);  
           }else{

            if(regresaDatos){
              datos = json;
            }else {
              sessionStorage.setItem("token", json.token);
              $cuerpo.innerHTML = null;
                if(json.hasOwnProperty("resultado")){
                  $cuerpo.appendChild(Tabla({
                    "clases": [],
                    "json": json.resultado,
                    "funcion": funcion
                  }));
                }else{
                  $cuerpo.appendChild(Tabla({
                      "clases": [],
                      "json": json,
                      "funcion": funcion
                  }));
                }
            }
        }
      }
    })
    if(regresaDatos){
      return datos;
    }
}