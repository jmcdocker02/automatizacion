export function ValidarCaptura(){
    let resultado = true;
    document.getElementById("id-Reto-tarjeta-cabecera").classList.remove("grupoFormularioError");
    if(document.getElementById("id-reto").value === "0"){
        document.getElementById("id-Reto-tarjeta-cabecera").classList.add("grupoFormularioError");
        resultado = false;
    }
    return resultado;
}