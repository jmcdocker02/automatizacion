export function RespaldaFormularioPrincipal(AJson) {
    const {
        for01,
        for03
    } = AJson;
    const formularioPrincipal = {
        "idFormulario": sessionStorage.getItem("idFormulario"),
        "nombreFormulario": sessionStorage.getItem("nombreFormulario"),
        "parametros": sessionStorage.getItem("parametros")
    }
    sessionStorage.setItem("idFormulario", for01);
    sessionStorage.setItem("nombreFormulario", for03);
    sessionStorage.setItem("formularioPrincipal", JSON.stringify(formularioPrincipal));

}