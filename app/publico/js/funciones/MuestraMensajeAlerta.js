export function MuestraMensajeAlerta(mensaje) {
    alertify.set("notifier", "delay", 3);
    alertify.set("notifier", "position", "top-center");
    alertify.warning(mensaje);
}