import { PeriodoFecha } from "../componentes/PeriodoFecha.js";

export function ObtieneFiltrosPeriodos(AJson){
    const {
        periodos,
        funcionEvento
    } = AJson;
    const parametros = JSON.parse(sessionStorage.getItem("parametros"));
    parametros[periodos[0].for06] = ["fechaInicio","fechaFin"];
    sessionStorage.setItem("parametros", JSON.stringify(parametros));
    return PeriodoFecha({
        "tituloFiltro": periodos[0].fil04,
        "mantenimiento": periodos[0].fil05,
        "idFormulario": periodos[0].fil06,
        "tipo": periodos[0].fil07,
        "checado": periodos[0].fil08,
        "campoRelacionado": periodos[0].fil09,
        "funcionEvento": funcionEvento
    })
}