import { Eliminar } from "./Eliminar.js";
import { Guardar } from "./Guardar.js";
import { MostrarModal } from "./MostrarModal.js";

export async function CambiarFiltros(e){
  if (e.target.tagName === "FORM") e.preventDefault(); // Aqui se cancela todos los eventos que puedan venir en la etiqueta de formulario
  switch(e.target.id){ // valida en que elemento del DOM se esta realizando el evento y lo asigna por cases
    case "id-Agregar":
      await MostrarModal(0); // Levanta una Modal que se gestiona en la funcion de Mostrar modal, esta funcino tiene que venir en cada modulo ya que se asigna el estilo de modal
      break;
    case "id-guardar":
      await Guardar(e.target.getAttribute("data-id")); // funcion que se encarga de guardar un registro dependiendo de su data-id
      break;
    case "id-Modificar":
      await MostrarModal(e.target.getAttribute("data-pla01")); // Funcion que se encarga de mostrar una modal pero utiliza el data-pla01 para obtener los datos de ese registro y colocarlos en la modal cuando se muestre
      break;
    case "id-Eliminar":
      await Eliminar(e.target.getAttribute("data-pla01")); // Funcion que se encargara de eliminar un registro de acuerdo al data-pla01, deacuerdo a la cantidad de llaves se van a eniar los identificadores, cuando solo es uno se manda como esta por default, cuando son mas de 1 parametro se tienen que enviar como una cadena separadas por comas ejemplo `${e.target.getAttribute("data-pla01")},${e.target.getAttribute("data-pla02")},...,${e.target.getAttribute("data-pla0n")}`
      break;
  }
  switch (e.target.parentNode.id) { // Valida los eventos que se hacen sobre un icono, si el elemento no tiene icono no es necesario que se incluya en esta seccion
    case "id-Agregar":
      await MostrarModal(0)
      break;
    case "id-guardar":
      await Guardar(e.target.parentNode.getAttribute("data-id"));
      break;
    case "id-Modificar":
      await MostrarModal(e.target.parentNode.getAttribute("data-pla01"))
      break;
    case "id-Eliminar":
      await Eliminar(e.target.parentNode.getAttribute("data-pla01"))
      break;
  }
}