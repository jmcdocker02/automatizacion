import { ObtieneUrl } from './ObtieneUrl.js';
import { MuestraMensajeCorrecto } from './MuestraMensajeCorrecto.js';
import { MuestraMensajeError } from './MuestraMensajeError.js';
import { Ajax } from './Ajax.js';

export async function EliminarRegistro(AJson) {
    const {
        parametros,
        funcionCargarDatos,
        id,
        funcion,
        pagina,
        modulo
    } = AJson;
    const parametroPagina = (pagina) ? pagina : "formulario.php";
    const parametroModulo = (modulo) ? modulo : "general";
    await Ajax({
        "metodo": "DELETE",
        "url": ObtieneUrl({
            "modulo": parametroModulo,
            "pagina": parametroPagina
        }) + parametros,
        cbSuccess: async(json) => {
            if (json.hasOwnProperty("resultado")){
                MuestraMensajeCorrecto(json.resultado.resultado);
                await funcionCargarDatos({
                  "id": id,
                  "funcion": funcion,
                  "pagina": parametroPagina,
                  "modulo": parametroModulo
                });
            } else {
                MuestraMensajeError(json.error.error);
            }
        }
    })
}