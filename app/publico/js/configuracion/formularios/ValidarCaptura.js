export function ValidarCaptura() {
  let resultado = true;
  document.getElementById(`id-For03-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  if (document.getElementById("id-for03").value === "") {
      document.getElementById(`id-For03-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
  }
  return resultado;
}