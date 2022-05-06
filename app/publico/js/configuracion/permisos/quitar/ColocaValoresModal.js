import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { ObtieneRegistro } from "../../funciones/ObtieneRegistro.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { TablaPermisos } from "./tablaPermisos.js";

export async function ColocaValoresModal(AIdTabla) { // funcion que recibe como uico parametro el id del registro que se va a levantar, si es 0 el id es un registro nuevo por lo tanto se muestran los campos de la modal vacios, si el id es diferente de 0 se hace una consulta para obtener el registro y se poblan los componentes de la modal con esa informacion
  if (AIdTabla === 0) { // Condicion que valida si es un registro nuevo
  } else {
    const valores = await ObtieneRegistro({
      "idFormulario": sessionStorage.getItem("idFormulario"),
      "idTabla": AIdTabla
    }); // Aqui dependiendo del id del registro se van a obtener los datos y se van a guardar en valores como un objeto.
    document.getElementById("modal-principal-titulo").innerHTML = null; // Por default se va a utilizar la modal principal para poblar los datos de un modulo comun por lo tanto se selecciona el titulo de la modal principal
    document.getElementById("modal-principal-titulo").innerHTML = "Modificar Permiso"; // Aqui se debe insertar el titulo que va a aparecer en la modal
    // Aqui se poblan los elementos del cuerpo de la modal con los valores que trae la constante valores.
    document.getElementById(`id-per01`).value = valores.per01; 
    document.getElementById("id-per02").value = valores.per02;
    document.getElementById("id-per03").value = valores.per03;
    document.getElementById("id-per04").value = valores.per04;
  }
  const json = await ObtieneDatosTabla({
    "id": "modal-secundaria-cuerpo",  
    "funcion": CambiarFiltros,
    "modulo" : "configuracion",
    "pagina" : "usuarios.php",
    "parametros" : {"idUsuario": sessionStorage.getItem("idUsuarioPermiso")},
    "resultado": true
  }); 
  document.getElementById("id-formulario-captura").appendChild(TablaPermisos({
    "registros": json.registros,
    "titulos": json.titulos
  }))
}