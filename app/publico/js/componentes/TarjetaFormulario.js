import { CamelCase } from "../funciones/CamelCase.js";
import { CheckBox } from "./CheckBox.js";
import { Tarjeta } from "./Tarjeta.js";

export function TarjetaFormulario(AJson) {
    const {
        textoEtiqueta,
        funcionKeyUp,
        contenido,
        funcionCheckBox
    } = AJson;
    const $cabecera = document.createDocumentFragment();
    const $etiqueta = document.createElement("label");
    const nombre = (contenido[0]) ? contenido[0].name : 'desconocido';
    if (funcionCheckBox != undefined && funcionCheckBox != "0") {
        $cabecera.appendChild(CheckBox({
            "nombre": `cb${nombre}`,
            "valor": "on"
        }));
    }
    if (textoEtiqueta) {
        $etiqueta.innerText = textoEtiqueta;
    } else {
        $etiqueta.innerText = "";
    }
    $cabecera.appendChild($etiqueta);

    return Tarjeta({
        "id": `id-${CamelCase(nombre)}-tarjeta`,
        "clase": "margen",
        "titulo": $cabecera,
        "contenido": contenido
    });

}