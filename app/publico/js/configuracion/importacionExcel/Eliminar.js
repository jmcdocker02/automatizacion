import { EliminarRegistro } from '../../funciones/EliminarRegistro.js';
import { Confirmar } from '../../funciones/Confirmar.js';
import { ObtieneDatosTabla } from '../../funciones/ObtieneDatosTabla.js';
import { CambiarFiltros } from './CambiarFiltros.js';
import { ObtieneParametrosUrl } from '../../funciones/ObtieneParametrosUrl.js';

export async function Eliminar(AIdTabla) { // Funcion que se encarga de modificar el texto y titulo que apareceran en en alertify paara poder eliminar un registro 
  await Confirmar({ // Funcion que se encarga de llamar las funciones correspondientes para cumplir el proposito de eliminar un registro
    "titulo": "Eliminar Importacion de Excel", // Se envia el titulo que se va a mostrar en el alertify
    "mensaje": `Esta seguro de eliminar la importacion con id ${AIdTabla}`, // Mensaje de confirmacion que se le muestra al usuario
    "funcion": EliminarRegistro, // Funcion general que se va a encargar de hacer un delete a una api
    "parametros": { // parametros que recibe la funcion general de eliminar Registro
      "parametros": ObtieneParametrosUrl({"parametrosFijos": {"idTabla": AIdTabla}}),//`?id=${sessionStorage.getItem("idFormulario")}&idTabla=${AIdTabla}`,
      "funcionCargarDatos": ObtieneDatosTabla,
      "funcion": CambiarFiltros,
      "id": "modal-secundaria-cuerpo"
    }
  });
}