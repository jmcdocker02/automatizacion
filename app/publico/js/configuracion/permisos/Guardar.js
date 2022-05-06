import { GuardarDatos } from "../../funciones/GuardarDatos.js";
import { ObtieneUrl } from "../../funciones/ObtieneUrl.js";
import { ObtieneParametrosUrl } from "../../funciones/ObtieneParametrosUrl.js";
import { CargarPermisos } from "./CargarPermisos.js";

export async function Guardar(){ 
  const metodo =  "PUT"; // metodo que se enviara a la consulta de api para verificar si es un registro nuevo o es uno existente
  const parametros = {
     "idCatalogo" : document.getElementById("id-catalogo").value,
   };
  const url = URL(parametros);
 // const datos = new FormData(document.getElementById("id-formulario-captura"));
 // datos.append("idCatalogo",document.getElementById("id-catalogo").value);
  // const datos = ObtieneJSONFormulario(document.getElementById("id-formulario-captura"));
  // await Ajax({
  //   "metodo":metodo,
  //   "url": url, 
  //   "params": datos, 
  //   cbSuccess: async(json) => {
  //     if (json.error === undefined) {
  //       MuestraMensajeCorrecto(json.resultado.resultado);
  //       if(modal){OcultaModal(`modal-${modal}`)};
  //     } else {
  //       MuestraMensajeError(json.error.error);
  //     }
  //   } 
  // })
  await GuardarDatos({
    "metodo": metodo,
    "url": url
  })

  await CargarPermisos(document.getElementById("id-catalogo").value); // Aqui se hace una consulta a la funcion que se encarga de colocar una tabla en el cuerpo de nuestra SPA
}

function URL(AParametros){ // Funcion que hace una consulta para la generacionde una url para la consulta de la api, esto se hace con el objetivo de que si se va a consultar alguna otra api dependiendo del modulo se cambien los valores de la url
  return ObtieneUrl({
    "modulo": "configuracion",
    "pagina": "usuarios.php"
  }) + ObtieneParametrosUrl({
     "parametrosFijos": AParametros
   });
}