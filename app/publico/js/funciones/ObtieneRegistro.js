import { Ajax } from "./Ajax.js";
import { ObtieneParametrosUrl } from "./ObtieneParametrosUrl.js";
import { ObtieneUrl } from "./ObtieneUrl.js";

export async function ObtieneRegistro(AJson){
  const {
    idFormulario,
    idTabla,
    pagina,
    modulo
  } = AJson;
  const parametroPagina = (pagina) ? pagina : "formulario.php";
  const parametroModulo = (modulo) ? modulo : "general";
  let respuesta;
  await Ajax({
    "metodo": "GET",
    "url": ObtieneUrl({
      "modulo": parametroModulo,
      "pagina": parametroPagina
    })+ObtieneParametrosUrl({"formulario": idFormulario,"parametrosFijos": {"idTabla": idTabla}}),
    cbSuccess: async(json) => {
      if(json.hasOwnProperty("registro")){
        respuesta = json.registro;
      } else {
        respuesta = json.error;
      }
    }
  })
  return respuesta;
}