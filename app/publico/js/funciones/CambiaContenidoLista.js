import { Ajax } from "./Ajax.js";

export async function CambiaContenidoLista(AJson){
    const {
        idLista,
        url
    } = AJson;
    const $select = document.getElementById(idLista);
    const fragmento = document.createDocumentFragment();
    $select.innerHTML = null;
    await Ajax({
        "metodo": "GET",
        "url": url,
        "cbSuccess": json =>{
            if (json.hasOwnProperty("registros")) {
                if(json.registros.error){
                  const $option = document.createElement('option');
                  $option.value = "0";
                  $option.innerText = json.registros.error;
                  $select.appendChild($option);
                }else{
                  json.registros.forEach(opt => {
                    const $option = document.createElement('option');
                    $option.id = `opcion${opt[json["for11"]]}${json["for06"].substring(0,1)}` //Modificado
                    $option.value = opt[json["for11"]];
                    $option.innerText = opt[json["for12"]];
                    $select.appendChild($option);
                  });
                }
              } else {
                  const $option = document.createElement('option');
                  $option.value = 0;
                  $option.innerText = "error";
                  fragmento.appendChild($option);
              }
        }
    })
    $select.appendChild(fragmento);
}