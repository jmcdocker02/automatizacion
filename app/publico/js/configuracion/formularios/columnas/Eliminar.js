import { EliminarRegistro } from '../../../funciones/EliminarRegistro.js';
import { Confirmar } from '../../../funciones/Confirmar.js';
import { ObtieneDatosTabla } from '../../../funciones/ObtieneDatosTabla.js';
import { CambiarFiltros } from './CambiarFiltros.js';
import { ObtieneParametrosUrl } from '../../../funciones/ObtieneParametrosUrl.js';

export async function Eliminar(AJson) {
  const {
    col01,
    col02
  } = AJson;
  await Confirmar({
    "titulo": "Eliminar Columna",
    "mensaje": `Esta seguro de eliminar la columna con id ${col02}`,
    "funcion": EliminarRegistro,
    "parametros": {
      "parametros":  ObtieneParametrosUrl({"parametrosFijos": {"idTabla": `${col01},${col02}`}}),
      "funcionCargarDatos": ObtieneDatosTabla,
      "id": "modal-secundaria-cuerpo",
      "funcion": CambiarFiltros
    }
  });
}