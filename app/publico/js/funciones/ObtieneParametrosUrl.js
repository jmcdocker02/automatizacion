import { CamelCase } from "./CamelCase.js";

export function ObtieneParametrosUrl(AJson) {
    const {
      formulario,
      parametrosFijos
    } = AJson;

    let resultado = `?id=${(formulario) ? formulario : sessionStorage.getItem("idFormulario")}`;
    resultado +=`&idEmpresa=${sessionStorage.getItem("idEmpresa")}&token=${sessionStorage.getItem("token")}`;
    if (parametrosFijos) {
      Object.keys(parametrosFijos).forEach(llave => {
        resultado += `&${llave}=${parametrosFijos[llave]}`;
      });
    } //else {

    const parametros = JSON.parse(sessionStorage.getItem("parametros"));
    Object.keys(parametros).forEach(llave => {
      const idCheckbox = `id-cbFiltro${CamelCase(llave)}`;
      if (document.getElementById(idCheckbox) != undefined && document.getElementById(idCheckbox).checked) {
        resultado += `&${parametros[llave]}=${document.getElementById(`id-${llave}`).value}`;
      }
      if (document.getElementById(idCheckbox) === null){
          Object.values(parametros[llave]).forEach(valor => {
              resultado += `&${valor}=${(document.getElementById(`id-${llave}`) === null) 
            ? document.getElementById(`id-${valor}`).value
            : document.getElementById(`id-${llave}`).value}`;
          })
      }
    });
    //}
  return resultado;
}