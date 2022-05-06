export function DescargarArchivo(AJson){
    const {
        url,
        nombreArchivo
    } = AJson;
    const ancla = document.createElement("a");
    ancla.href = url;
    ancla.setAttribute("download", nombreArchivo);
    ancla.click();
}