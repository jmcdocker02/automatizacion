import { TablaExcel } from "../componentes/TablaExcel.js";
import { Ajax } from "../funciones/Ajax.js";
import { ObtieneParametrosUrl } from "../funciones/ObtieneParametrosUrl.js";
import { ObtieneUrl } from "../funciones/ObtieneUrl.js";

export async function ObtieneDatosTablaExcel(AJson) {
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
    let aux;
    const regresaDatos = (resultado) 
      ? true
      : false;
    await Ajax({
        "metodo": "GET",
        "url": ObtieneUrl({
            "modulo": parametroModulo,
            "pagina": parametroPagina
        }) + ObtieneParametrosUrl({"formulario":formulario, "parametrosFijos": parametros}),
        cbSuccess: async(json) => {
            if(regresaDatos){
              aux = json;
            }else {
              $cuerpo.innerHTML = null;
                if(json.hasOwnProperty("resultado")){
                  $cuerpo.appendChild(TablaExcel({
                    "clases": [],
                    "json": json.resultado,
                    "funcion": funcion
                  }));
                }else{
                  $cuerpo.appendChild(TablaExcel({
                      "clases": [],
                      "json": json,
                      "funcion": funcion
                  }));
                }
            }
        }
    })
    return aux;
}