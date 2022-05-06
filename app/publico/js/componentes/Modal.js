export function Modal(AJson) {
    const {
        titulo,
        contenido,
        claseModal,
        botones,
        funcion,
        tablero
    } = AJson;
    const ventana = (tablero === undefined) ? "principal" : tablero;
    const modal = document.getElementById(`modal-${ventana}`);
    const $pie = document.getElementById(`modal-${ventana}-pie`);

    document.getElementById(`modal-${ventana}-titulo`).innerHTML = titulo;
    if (contenido != undefined) document.getElementById(`modal-${ventana}-cuerpo`).innerHTML = contenido.outerHTML;
    $pie.removeEventListener("click", funcion);
    $pie.addEventListener("click", funcion);
    if (botones) {
        $pie.innerHTML = botones.outerHTML;
    }
    if (claseModal != undefined) {
        document.getElementById(`modal-${ventana}-dialog`).className = `modal-dialog ${ (claseModal) && claseModal }`;
    } else {
        document.getElementById(`modal-${ventana}-dialog`).className = `modal-dialog`;
    }

    let myModal = new bootstrap.Modal(modal);

    myModal.toggle();
}