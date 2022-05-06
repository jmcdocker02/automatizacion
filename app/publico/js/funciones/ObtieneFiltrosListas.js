import { Catalogo } from "../componentes/Catalogo.js";

export async function ObtieneFiltrosListas(AJson){
 const {
    listas,
    idLista,
    funcionEvento
  } = AJson;
  const parametros = {};
  let $respuesta = document.createDocumentFragment();  //esta se cambio
  for(let i = 0 ; i < listas.length ; ++i){
    $respuesta.appendChild(await Catalogo({     //esta se cambio
      "fijo": listas[i].fil07,
      "textoEtiqueta": listas[i].fil04,
      "checado": listas[i].fil08,
      "datos": listas[i],
      "id": idLista,
      "anchoLista": "100%",
      "mantenimiento": (parseInt(listas[i].fil05) === 1) ? listas[i].fil06 : undefined,//listas[i].fil11,
      "FuncionEvento": funcionEvento
    }));
    parametros[listas[i].for06] = [listas[i].fil09];
  }
  sessionStorage.setItem("parametros", JSON.stringify(parametros));
  return $respuesta;
}