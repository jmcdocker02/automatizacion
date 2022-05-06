export function ValidarCaptura() {
  let resultado = true;
  document.getElementById(`id-Rep02-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  if (document.getElementById("id-rep02").value === "") {
      document.getElementById(`id-Rep02-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
  }
  return resultado;
}