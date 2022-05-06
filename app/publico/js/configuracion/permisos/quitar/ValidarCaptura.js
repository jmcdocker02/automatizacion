export function ValidarCaptura() { 
  let resultado = true;
  document.getElementById(`id-Est01-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  if (document.getElementById("id-est01").value === "") {
      document.getElementById(`id-Est01-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
  }
  document.getElementById(`id-Est02-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  if (document.getElementById("id-est02").value === "") {
      document.getElementById(`id-Est02-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
  }
  return resultado;
}