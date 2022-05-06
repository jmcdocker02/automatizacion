export function AsignaEvento(AJson) {
    const {
        elemento,
        evento,
        funcion
    } = AJson;
    const $elemento = document.getElementById(elemento);
    $elemento.removeEventListener(evento, funcion);
    $elemento.addEventListener(evento, funcion);
}