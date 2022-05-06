import { Ajax } from "./Ajax.js";
import { ObtieneParametrosUrl } from "./ObtieneParametrosUrl.js";
import { ObtieneUrl } from "./ObtieneUrl.js";

export async function ObtieneOpcionesSelect(AJson) {
  const {
    idFormulario,
    parametros,
    tabla,
    campoLlave,
    campoDescripcion,
    $select
  } = AJson;
  const url = ObtieneUrl({
      "modulo": "general",
      "pagina": "formulario.php"
  }) + ObtieneParametrosUrl({"formulario": idFormulario,"parametrosFijos": parametros});
  $select.innerHTML = null;
  const fragmento = document.createDocumentFragment();
  await Ajax({
    "metodo": "GET",
    "url": url,
    cbSuccess: async(json) => {
      if (json.hasOwnProperty("registros")) {
        if(json.registros.error){
          const $option = document.createElement('option');
          $option.value = "0";
          $option.innerText = json.registros.error;
          $select.appendChild($option);
        }else{
          json.registros.forEach(opt => {
            const $option = document.createElement('option');
            $option.id = `opcion${opt[campoLlave]}${tabla.substring(0,1)}` //Modificado
            $option.value = opt[campoLlave];
            $option.innerText = opt[campoDescripcion];
            $select.appendChild($option);
          });
        }
      } else {
          const $option = document.createElement('option');
          $option.value = 0;
          $option.innerText = json.error.error;
          fragmento.appendChild($option);
      }
    }
  });
  $select.appendChild(fragmento);
  return $select;
}