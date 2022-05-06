import { ValidaTamanioTexto } from "../../../funciones/ValidaTamanioTexto.js";

export function ValidarCaptura() {
  let resultado = true;
  switch(parseInt(document.getElementById("id-fil03").value)){
    case 1:
      resultado = ValidarLista();
      break;
  }
  return resultado;
}

function ValidarLista(){
  let resultado = true;
  if (!ValidaTamanioTexto("fil04")) resultado = false;
  if (!ValidaTamanioTexto("fil09")) resultado = false;
  return resultado;
}