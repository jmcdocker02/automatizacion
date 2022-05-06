import { TarjetaFormulario } from "../componentes/TarjetaFormulario.js";
import { CajaTexto } from "../componentes/CajaTexto.js";
import { ObtieneFecha } from "../funciones/ObtieneFecha.js";

export function PeriodoFecha(AJson){
    const {
        tituloFiltro,
        mantenimiento,
        idFormulario,
        tipo,
        checado,
        campoRelacionado,
        funcionEvento
    } = AJson;
    return TarjetaFormulario({
        "textoEtiqueta": tituloFiltro,
        "funcionCheckBox": checado,
        "contenido": [
            CajaTexto({
            "type": "date",
            "name": "fechaInicio",
            "tamanio": "9rem",
            "value": ObtieneFecha(1),
            "funcionChange": funcionEvento
            }),
            CajaTexto({
            "type": "date",
            "name": "fechaFin",
            "tamanio": "9rem",
            "value": ObtieneFecha(0),
            "funcionChange": funcionEvento
            })
        ]
    });
}

