import { EliminarRegistro } from '../../funciones/EliminarRegistro.js';
import { Confirmar } from '../../funciones/Confirmar.js';
import { ObtieneDatosTabla } from '../../funciones/ObtieneDatosTabla.js';
import { CambiarFiltros } from './CambiarFiltros.js';
import { ObtieneParametrosUrl } from '../../funciones/ObtieneParametrosUrl.js';

export async function Eliminar(AIdTabla) {
  await Confirmar({
    "titulo": "Eliminar Formulario",
    "mensaje": `Esta seguro de eliminar el formulario con id ${AIdTabla}`,
    "funcion": EliminarRegistro,
    "parametros": {
      "parametros": ObtieneParametrosUrl({"parametrosFijos": {"idTabla": AIdTabla}}),
      "funcionCargarDatos": ObtieneDatosTabla,
      "funcion": CambiarFiltros
    }
  });
}

// funcion titulos
//   JSON.titulos
// funcion cuerpo
//   JSON.cuerpo
// funcion parametros  
//   json.parametros