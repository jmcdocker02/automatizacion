export function MuestraMensajeError(mensaje) {
    alertify.set("notifier", "delay", 5);
    alertify.set("notifier", "position", "top-center");
    alertify.error(mensaje);
}