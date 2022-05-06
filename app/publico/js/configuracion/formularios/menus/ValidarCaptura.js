export function ValidarCaptura() {
  let resultado = true;
  document.getElementById(`id-Men02-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  if (document.getElementById("id-men02").value === "") {
      document.getElementById(`id-Men02-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
  }
  document.getElementById(`id-Men04-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  if (document.getElementById("id-men04").value === "") {
      document.getElementById(`id-Men04-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
  }
  
  return resultado;
}