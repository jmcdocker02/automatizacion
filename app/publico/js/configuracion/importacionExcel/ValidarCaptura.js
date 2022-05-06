export function ValidarCaptura() {
  let resultado = true;  
  const $elemento = document.getElementById("id-imp04").value;
  if($elemento === "2"){
    document.getElementById("id-Imp06-tarjeta-cabecera").classList.remove("grupoFormularioError");
    if (document.getElementById("id-imp06").value === "") {
      document.getElementById(`id-Imp06-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
    }
    document.getElementById(`id-Imp03-tarjeta-cabecera`).classList.remove("grupoFormularioError");
    if (document.getElementById("id-imp03").value === "") {
        document.getElementById(`id-Imp03-tarjeta-cabecera`).classList.add("grupoFormularioError");
        resultado = false;
    }
  } else {
    document.getElementById(`id-Imp03-tarjeta-cabecera`).classList.remove("grupoFormularioError");
    if (document.getElementById("id-imp03").value === "") {
        document.getElementById(`id-Imp03-tarjeta-cabecera`).classList.add("grupoFormularioError");
        resultado = false;
    }
  }
  return resultado;
}