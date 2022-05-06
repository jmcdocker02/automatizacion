import { Hidden } from "../../componentes/Hidden.js";
import { ObtieneRegistro } from "../../funciones/ObtieneRegistro.js";

export async function ColocaValoresModal(AJson) {
    const {
        id,
        formulario
    } = AJson;
    const aux = (formulario === undefined) ? "id-formulario-captura" : formulario;
    const $formulario = document.getElementById(aux);

    $formulario.appendChild(Hidden({
        "name": "for01",
        "valor": id
    }));
    $formulario.appendChild(Hidden({
      "name": "for02",
      "valor": document.getElementById("id-menus").value
    }));
    if (id === 0) {
        document.getElementById("id-for03").value = "";
        document.getElementById("id-for04").value = "";
        document.getElementById("id-for06").value = "";
        document.getElementById("id-for07").value = "";
        document.getElementById("id-for08").value = "";
        document.getElementById("id-for09").value = "";
        document.getElementById("id-for10").value = "";
        document.getElementById("id-for11").value = "";
        document.getElementById("id-for12").value = "";
        document.getElementById("id-for13").value = "";
    } else {
        const valores = await ObtieneRegistro({
            "idFormulario": sessionStorage.getItem("idFormulario"),
            "idTabla": id
        });
        console.log(valores)
        document.getElementById("modal-principal-titulo").innerHTML = null;
        document.getElementById("modal-principal-titulo").innerHTML = "Modificar Formulario";
        document.getElementById("id-for02").value = valores.for02;
        document.getElementById("id-for03").value = valores.for03;
        document.getElementById("id-for04").value = valores.for04;
        document.getElementById("id-for05").value = valores.for05;
        document.getElementById("id-for06").value = valores.for06;
        document.getElementById("id-for07").value = valores.for07;
        document.getElementById("id-for08").value = valores.for08;
        document.getElementById("id-for09").value = valores.for09;
        document.getElementById("id-for10").value = valores.for10;
        document.getElementById("id-for11").value = valores.for11;
        document.getElementById("id-for12").value = valores.for12;
        document.getElementById("id-for13").value = valores.for13;
    }
}