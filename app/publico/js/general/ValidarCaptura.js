export function ValidarCaptura() { 
    let resultado = true;
    document.getElementById(`usuario-group`).classList.remove("grupoFormularioError");
    if (document.getElementById("usuario").value === "") {
        document.getElementById(`usuario-group`).classList.add("grupoFormularioError");
        resultado = false;
    }
    document.getElementById(`password-group`).classList.remove("grupoFormularioError");
    if (document.getElementById("password").value === "") {
        document.getElementById(`password-group`).classList.add("grupoFormularioError");
        resultado = false;
    }
    return resultado;
  }