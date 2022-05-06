import { GuardarDatos } from "../../funciones/GuardarDatos.js";
import { ValidarCaptura } from "./ValidarCaptura.js";
import { ObtieneUrl } from "../../funciones/ObtieneUrl.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { ObtieneParametrosUrl } from "../../funciones/ObtieneParametrosUrl.js";

export async function Guardar(AIdTabla){
  const metodo = (parseInt(AIdTabla) === 0) ? "POST" : "PUT";
  const parametros = (parseInt(AIdTabla) === 0) ? {} : {"idTabla":AIdTabla};
  const url = URL(parametros);
  if (ValidarCaptura()) {
    await GuardarDatos({
      "metodo": metodo,
      "url": url,
      "modal": "principal"
    })
  }
  await ObtieneDatosTabla({"funcion": CambiarFiltros});
}

function URL(AParametros){
  return ObtieneUrl({
    "modulo": "general",
    "pagina": "formulario.php"
  }) + ObtieneParametrosUrl({
    "parametrosFijos": AParametros
  });
}