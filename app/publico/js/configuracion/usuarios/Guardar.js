import { GuardarDatos } from "../../funciones/GuardarDatos.js";
import { ValidarCaptura } from "./ValidarCaptura.js";
import { ObtieneUrl } from "../../funciones/ObtieneUrl.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { ObtieneParametrosUrl } from "../../funciones/ObtieneParametrosUrl.js";

export async function Guardar(AIdTabla){ 
  const metodo = (parseInt(AIdTabla) === 0) ? "POST" : "PUT"; // metodo que se enviara a la consulta de api para verificar si es un registro nuevo o es uno existente
  const parametros = (parseInt(AIdTabla) === 0) ? {} : {"idTabla":AIdTabla};
  const url = URL(parametros);
  if (ValidarCaptura()) { // Condicion que manda a llamar a una funcion Validar Captura para verificar que este correctamente llenado los componentes de la modal en cuestion
    await GuardarDatos({ // si la respues de la condicion es true manda a llamar a la funcion guardar datos que se encarga de enviar la peticion a la api
      "metodo": metodo,
      "url": url,
      "modal": "principal"
    })
  await ObtieneDatosTabla({
    "pagina": "usuarios.php",
    "modulo": "configuracion",
    "funcion": CambiarFiltros
  }); // Aqui se hace una consulta a la funcion que se encarga de colocar una tabla en el cuerpo de nuestra SPA
 }
}

function URL(AParametros){ // Funcion que hace una consulta para la generacionde una url para la consulta de la api, esto se hace con el objetivo de que si se va a consultar alguna otra api dependiendo del modulo se cambien los valores de la url
  return ObtieneUrl({
    "modulo": "configuracion",
    "pagina": "usuarios.php"
  }) + ObtieneParametrosUrl({
    "parametrosFijos": AParametros
  });
}