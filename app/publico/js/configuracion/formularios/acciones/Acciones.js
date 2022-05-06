import { Contenedor } from "../../../componentes/Contenedor.js"
import { CambiarFiltros } from "./CambiarFiltros.js";
import { ObtieneFiltros } from "../../../funciones/ObtieneFiltros.js";
import { ObtieneDatosTabla } from "../../../funciones/ObtieneDatosTabla.js";
import { RespaldaFormularioPrincipal } from './../../../funciones/RespaldaFormularioPrincipal.js';

export default async function Acciones(AJson) {
    const { idFormulario, idAcciones } = AJson;
    const $formulario = document.createElement("form");
    const $filtros = document.createElement("div");
    RespaldaFormularioPrincipal({
        "for01": idAcciones,
        "for03": "Acciones"
    });
    $filtros.id = "id-modal-filtros";
    $formulario.id = "id-formulario-filtros";
    $formulario.appendChild(Contenedor({
        "marco": "borde02",
        "fragmento": await ObtieneFiltros({"funcionEvento": CambiarFiltros})
    }));

    document.getElementById("modal-secundaria-encabezado").appendChild($filtros);
    $filtros.appendChild($formulario);
    document.getElementById("id-formularios").value = idFormulario;
    document.getElementById("id-Formularios-tarjeta").style.display = "none";

    await ObtieneDatosTabla({
        "id": "modal-secundaria-cuerpo",
        "funcion": CambiarFiltros
    });
}