import { ObtieneRegistro } from "../../../funciones/ObtieneRegistro.js";
import { Hidden } from "../../../componentes/Hidden.js";

export async function ColocaValoresModal(AIdTabla) {
    const $formulario = document.getElementById("id-formulario-captura");
    $formulario.appendChild(Hidden({
        "name": "acc01",
        "valor": AIdTabla
    }));
    $formulario.appendChild(Hidden({
        "name": "acc02",
        "valor": document.getElementById("id-formularios").value
    }));
    if (AIdTabla === 0) {
        document.getElementById("id-acc03").value = "";
        document.getElementById("id-acc04").value = "";
        document.getElementById("id-acc07").value = "";
        document.getElementById("id-acc08").value = "";
    } else {
        const valores = await ObtieneRegistro({
            "idFormulario": sessionStorage.getItem("idFormulario"),
            "idTabla": AIdTabla
        });
        document.getElementById("modal-principal-titulo").innerHTML = null;
        document.getElementById("modal-principal-titulo").innerHTML = "Modificar Acciones";
        document.getElementById("id-acc03").value = valores.acc03;
        document.getElementById("id-acc04").value = valores.acc04;
        document.getElementById("id-acc05").value = valores.acc05;
        document.getElementById("id-acc06").value = valores.acc06;
        document.getElementById("id-acc07").value = valores.acc07;
        document.getElementById("id-acc08").value = valores.acc08;
    }
}