import { Hidden } from "../componentes/Hidden.js";
import { ObtieneRegistro } from "../funciones/ObtieneRegistro.js";
import { ObtieneDatosTablaExcel } from "./ObtieneDatosTablaExcel.js";
export async function ColocaValoresModal(AId){
  const valores = await ObtieneRegistro({
    "idFormulario": 31,
    "idTabla": AId
  });
  const $formulario = document.getElementById("id-formulario-captura");
  $formulario.appendChild(Hidden({
    "name": "imp01",
    "valor": AId
  })) 
  document.getElementById(`id-imp05`).value = valores.imp05; 

  await ObtieneDatosTablaExcel({
    "id": "id-tabla-actualizaExcel",
    "idFormulario": 32,
    "parametros": {"dim01": AId}
  });
}