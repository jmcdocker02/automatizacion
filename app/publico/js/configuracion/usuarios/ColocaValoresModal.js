import { ObtieneRegistro } from "../../funciones/ObtieneRegistro.js";
import { Hidden } from "../../componentes/Hidden.js";

export async function ColocaValoresModal(AIdTabla) { // funcion que recibe como uico parametro el id del registro que se va a levantar, si es 0 el id es un registro nuevo por lo tanto se muestran los campos de la modal vacios, si el id es diferente de 0 se hace una consulta para obtener el registro y se poblan los componentes de la modal con esa informacion
  const $formulario = document.getElementById("id-formulario-captura");
  $formulario.appendChild(Hidden({
    "name": "usu01",
    "valor": AIdTabla
  }))
  if (AIdTabla === 0) { // Condicion que valida si es un registro nuevo
    console.log(AIdTabla)
    document.getElementById("id-usu02").value = "";
    document.getElementById("id-usu04").value = "";
    document.getElementById("id-usu05").value = "";
    document.getElementById("id-usu06").value = "";
  } else {
    const valores = await ObtieneRegistro({
      "idFormulario": sessionStorage.getItem("idFormulario"),
      "idTabla": AIdTabla,
      "pagina": "usuarios.php",
      "modulo": "configuracion"
    }); // Aqui dependiendo del id del registro se van a obtener los datos y se van a guardar en valores como un objeto.
    document.getElementById("modal-principal-titulo").innerHTML = null; // Por default se va a utilizar la modal principal para poblar los datos de un modulo comun por lo tanto se selecciona el titulo de la modal principal
    document.getElementById("modal-principal-titulo").innerHTML = "Modificar Usuario"; // Aqui se debe insertar el titulo que va a aparecer en la modal
    // Aqui se poblan los elementos del cuerpo de la modal con los valores que trae la constante valores.
    document.getElementById(`id-usu01`).value = valores.usu01; 
    document.getElementById("id-usu02").value = valores.usu02;
    document.getElementById("id-usu04").value = valores.usu04;
    document.getElementById("id-usu05").value = valores.usu05;
    document.getElementById("id-usu06").value = valores.usu06;

  }
}