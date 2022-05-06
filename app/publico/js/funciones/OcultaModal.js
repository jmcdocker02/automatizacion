export function OcultaModal(AId) {
    const modal = document.getElementById(AId);
    const instanciaModal = bootstrap.Modal.getInstance(modal);
     instanciaModal.hide();
}