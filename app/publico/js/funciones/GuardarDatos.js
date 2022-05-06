import { OcultaModal } from './OcultaModal.js';
import { MuestraMensajeCorrecto } from './MuestraMensajeCorrecto.js';
import { MuestraMensajeError } from './MuestraMensajeError.js';
import { Ajax } from './Ajax.js';
import { ObtieneRegistrosTabla } from './ObtieneRegistrosTabla.js';
import { ObtieneJSONFormulario } from "../funciones/ObtieneJSONFormulario.js";

export async function GuardarDatos(AJson) {
  const {
    metodo,
    url,
    idTabla,
    formulario,
    modal
  } = AJson;
  const nombreFormulario = (formulario === undefined) ? "id-formulario-captura" : formulario;
  // const datos =  new FormData(document.getElementById(nombreFormulario))
  // if(idTabla != undefined){
  //   datos.append("productos", ObtieneRegistrosTabla(idTabla))
  // }
  const datos = ObtieneJSONFormulario(document.getElementById(nombreFormulario));
  // datos["campos"] = ObtieneRegistrosTabla({idTabla: "id-tabla-productos", atributo: "data-linea"});

  await Ajax({
    "metodo": metodo,
    "url": url, 
    "params": datos, 
    cbSuccess: async(json) => {
      if (json.error === undefined) {
        MuestraMensajeCorrecto(json.resultado.resultado);
        if(modal){OcultaModal(`modal-${modal}`)};
      } else {
        MuestraMensajeError(json.error.error);
      }
    } 
  })
}