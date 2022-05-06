export async function ValidarCaptura(){
    let resultado = true;
    document.getElementById("id-Arc01-tarjeta-cabecera").classList.remove("grupoFormularioError");
    if(document.getElementById("id-arc01").value === ""){
        document.getElementById("id-Arc01-tarjeta-cabecera").classList.add("grupoFormularioError");
        resultado = false;
    }
    document.getElementById("id-Imp05-tarjeta-cabecera").classList.remove("grupoFormularioError");
    if(document.getElementById("id-imp05").value === ""){
        document.getElementById("id-Imp5-tarjeta-cabecera").classList.add("grupoFormularioError");
        resultado = false;
    }
    return resultado;
}