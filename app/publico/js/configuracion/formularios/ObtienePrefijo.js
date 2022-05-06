export function ObtienePrefijo(AId){
  const valor = document.getElementById(AId).value;
  return (valor != "") ? valor.substring(0,3) : "";
}