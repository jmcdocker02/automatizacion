import { Boton } from "./Boton.js";

export function ListaBotones(AJson) {
    const {
        nombre,
        claseMargen,
        claseBoton,
        textoBoton,
        contenido,
        funcionEvento
    } = AJson;
    const $listaBotonesContenedor = document.createElement('div');
    const margen = (claseMargen) ? "" : "margen";
    const $listaBotonesBoton = Boton({
        "name": nombre,
        "type": "button",
        "clases": `btn btn-secondary dropdown-toggle btn-sm ${claseBoton}`,
        "atributos": [{
                "atributo": "data-bs-toggle",
                "valor": "dropdown"
            },
            {
                "atributo": "aria-expanded",
                "valor": "false"
            }
        ],
        "texto": textoBoton
    });
    const $listaBotonesOpciones = document.createElement('ul');

    $listaBotonesContenedor.className = `dropdown ${margen}`;
    $listaBotonesOpciones.className = 'dropdown-menu';
    $listaBotonesOpciones.setAttribute('aria-labelledby', `id-${nombre}`);
    contenido.forEach(elemento => {
        $listaBotonesOpciones.appendChild(elemento);
    });
    $listaBotonesContenedor.appendChild($listaBotonesBoton);
    $listaBotonesContenedor.appendChild($listaBotonesOpciones);
    return $listaBotonesContenedor;
}

// let atributos = [];
// if(elemento.acc08 !=""){
//     const atributosBoton = JSON.parse(elemento.acc08);
//     Object.keys(atributosBoton).forEach(registro => {
//         atributos[atributos.length + 1] = { 
//         "atributo": atributosBoton[registro].atributo, 
//         "valor": atributosBoton[registro].valor 
//         }
//     })
// }
// $listaBotonesOpciones.appendChild(Boton({
//     "name": elemento.acc03,
//     "texto": elemento.ico02+" "+elemento.acc03,
//     "atributos": elemento.atributos,
//     "funcionClick": funcionEvento
// }));