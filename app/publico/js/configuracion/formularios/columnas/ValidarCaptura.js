import { ValidaTamanioTexto } from "../../../funciones/ValidaTamanioTexto.js";

export function ValidarCaptura() {
  let resultado = true;
  if (!ValidaTamanioTexto("col02")) resultado = false;
  if (!ValidaTamanioTexto("col03")) resultado = false;
  if (!ValidaTamanioTexto("col04")) resultado = false;
  if (!ValidaTamanioTexto("col05")) resultado = false;
  if (!ValidaTamanioTexto("col06")) resultado = false;
  return resultado;
}