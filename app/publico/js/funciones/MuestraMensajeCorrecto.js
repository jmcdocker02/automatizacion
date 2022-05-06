export function MuestraMensajeCorrecto(mensaje) {
    alertify.set("notifier", "delay", 3);
    alertify.set("notifier", "position", "top-center");
    alertify.success(mensaje);
}