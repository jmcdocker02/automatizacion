import { ObtieneRegistro } from "../../funciones/ObtieneRegistro.js";

export async function ColocaValoresModal(AIdTabla) { // funcion que recibe como uico parametro el id del registro que se va a levantar, si es 0 el id es un registro nuevo por lo tanto se muestran los campos de la modal vacios, si el id es diferente de 0 se hace una consulta para obtener el registro y se poblan los componentes de la modal con esa informacion
  if (AIdTabla === 0) { // Condicion que valida si es un registro nuevo
    document.getElementById(`id-pla01`).value = "";
    document.getElementById("id-pla02").value = "";
    document.getElementById("id-pla03").value = "";
    document.getElementById("id-pla04").value = "";
    document.getElementById("id-pla05").value = "";
  } else {
    const valores = await ObtieneRegistro({
      "idFormulario": sessionStorage.getItem("idFormulario"),
      "idTabla": AIdTabla
    }); // Aqui dependiendo del id del registro se van a obtener los datos y se van a guardar en valores como un objeto.
    document.getElementById("modal-principal-titulo").innerHTML = null; // Por default se va a utilizar la modal principal para poblar los datos de un modulo comun por lo tanto se selecciona el titulo de la modal principal
    document.getElementById("modal-principal-titulo").innerHTML = "Modificar Tiulo de la Modal"; // Aqui se debe insertar el titulo que va a aparecer en la modal
    // Aqui se poblan los elementos del cuerpo de la modal con los valores que trae la constante valores.
    document.getElementById(`id-pla01`).value = valores.pla01; 
    document.getElementById("id-pla02").value = valores.pla02;
    document.getElementById("id-pla03").value = valores.pla03;
    document.getElementById("id-pla04").value = valores.pla04;
    document.getElementById("id-pla05").value = valores.pla05;
  }
}