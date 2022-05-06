export function ValidarCaptura() {
  let resultado = true;
  document.getElementById(`id-Ico01-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  console.log(document.getElementById("id-ico01").value)
  if (document.getElementById("id-ico01").value === "") {
    console.log(document.getElementById(`id-Ico01-tarjeta-cabecera`))
      document.getElementById(`id-Ico01-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
  }
  document.getElementById(`id-Ico02-tarjeta-cabecera`).classList.remove("grupoFormularioError");
  if (document.getElementById("id-ico02").value === "") {
      document.getElementById(`id-Ico02-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
  }
  return resultado;
}