export function Texto(AJson){
    const {
        name,
        texto,
        asignado,
        clase
    } = AJson;
    const elemento = document.createElement("label");
    elemento.name = name;
    elemento.innerText = texto;
    elemento.for = asignado;
    elemento.classList.add(clase);
    return elemento;
}