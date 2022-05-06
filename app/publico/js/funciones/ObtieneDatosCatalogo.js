import { Ajax } from "./Ajax.js";
import { ObtieneParametrosUrl } from "./ObtieneParametrosUrl.js";
import { ObtieneUrl } from "./ObtieneUrl.js";

export async function ObtieneDatosCatalogo(AIdCatalogo){
  let respuesta ="";
  await Ajax({
    "metodo": "GET", 
    "url": ObtieneUrl({
      "modulo": "general",
      "pagina": "formulario.php"
    }) + ObtieneParametrosUrl({"parametrosFijos": {"idCatalogo": AIdCatalogo}}),//`?idCatalogo=${AIdCatalogo}&idEmpresa=${sessionStorage.getItem("idEmpresa")}`,//"https://dcsr.com.mx/emicofiBackEnd/general/formulario.php?idCatalogo=4",  
    cbSuccess: (json) => {
      respuesta = json[0];
    }
  });
  return respuesta;
}