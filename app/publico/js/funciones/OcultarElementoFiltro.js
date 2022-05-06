export function OcultarElementoFiltro(AJson) {
    const {
        checkBox,
        elemento,
        elementos
    } = AJson;
    const $checkBox = document.getElementById(checkBox);
    if (elemento != undefined) { //Modificar de manera que solo reciba un arreglo
      const $elemento = document.getElementById(elemento);
      ($checkBox.checked === false) ? 
      $elemento.classList.add("ocultar"): $elemento.classList.remove("ocultar");
    }
    if (elementos != undefined) elementos.forEach(elemento => {
      const $elemento = document.getElementById(elemento);
      ($checkBox.checked === false) ? 
      $elemento.classList.add("ocultar"): $elemento.classList.remove("ocultar");  
    });
}