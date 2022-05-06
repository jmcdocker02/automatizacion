import { CamelCase } from "./CamelCase.js";

export function ValidaTamanioTexto(AId){
  document.getElementById(`id-${CamelCase(AId)}-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  if (document.getElementById(`id-${AId}`).value === "") {
    document.getElementById(`id-${CamelCase(AId)}-tarjeta-cabecera`).classList.add("grupoFormularioError");
    return false;
  } else {
    return true;
  }
}