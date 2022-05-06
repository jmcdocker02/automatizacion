import { ValidarCorreo } from "../../funciones/ValidarCorreo.js";

export function ValidarCaptura() { 
  let resultado = true;
  document.getElementById(`id-Usu02-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  if (document.getElementById("id-usu02").value === "") {
      document.getElementById(`id-Usu02-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
  }
  document.getElementById(`id-Usu06-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  if  (!ValidarCorreo(document.getElementById("id-usu06").value)) {
      document.getElementById(`id-Usu06-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
  }
  return resultado;
}