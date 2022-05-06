import ColocaTitulo from "./ColocaTitulo.js";
import { Ajax } from "./Ajax.js";
import { ObtieneFiltrosBotones } from "./ObtieneFiltrosBotones.js";
import { ObtieneFiltrosListas } from "./ObtieneFiltrosListas.js";
import { ObtieneFiltrosPeriodos } from "./ObtieneFiltrosPeriodos.js";
import { ObtieneUrl } from "./ObtieneUrl.js";
import { ObtieneParametrosUrl } from "./ObtieneParametrosUrl.js";
import { CerrarSession } from "../general/CerrarSession.js";

export async function ObtieneFiltros(AJson) {
    const {
      idLista,
      funcionEvento
    } = AJson;
    const $filtros = document.createElement("div"); //esta se cambio
    $filtros.className = `alineado`; //esto se agrego
    ColocaTitulo(sessionStorage.getItem("nombreFormulario"))

    await Ajax({
        "metodo": "OPTIONS",
        "url": ObtieneUrl({
            "modulo": "general",
            "pagina": "formulario.php"
        }) + ObtieneParametrosUrl({"parametrosFijos": {}}),//`?id=${id}&idEmpresa=${sessionStorage.getItem("idEmpresa")}`,
        cbSuccess: async(json) => {
            if(json.hasOwnProperty("error")){
             await CerrarSession(json.error.error);  
            }else{
            if (!json.hasOwnProperty("error")) $filtros.appendChild(await ObtieneFiltrosBotones({ // if (!json["botones"].hasOwnProperty("error")) $filtros.appendChild(await ObtieneFiltrosBotones({ // 
                "botones": json.botones,
                "funcionEvento": funcionEvento
            }));
            if (!json["listas"].hasOwnProperty("error")) $filtros.appendChild(await ObtieneFiltrosListas({
                "listas": json.listas,
                "idLista": idLista,
                "funcionEvento": funcionEvento
            }));
            if (!json["periodos"].hasOwnProperty("error")) $filtros.appendChild(ObtieneFiltrosPeriodos({
                "periodos": json.periodos,
                "funcionEvento": funcionEvento
            }));
           }  
        }
    });
    return $filtros;
}