import { Eliminar } from "./Eliminar.js";
import { Guardar } from "./Guardar.js";
import { MostrarModal } from "./MostrarModal.js";

export async function CambiarFiltros(e){
  if (e.target.tagName === "FORM") e.preventDefault();
  switch(e.target.id){
    case "id-Agregar":
      await MostrarModal(0);
      break;
    case "id-guardar":
      await Guardar(e.target.getAttribute("data-id"));
      break;
    case "id-Modificar":
      await MostrarModal(e.target.getAttribute("data-men01"))
      break;
    case "id-Eliminar":
      await Eliminar(e.target.getAttribute("data-men01"));
      break;
  }
  switch (e.target.parentNode.id) {
    case "id-Agregar":
      await MostrarModal(0)
      break;
    case "id-guardar":
      console.log("guardado")
      await Guardar()
      break;
    case "id-Modificar":
      console.log("modifica")
      break;
    case "id-Eliminar":
      console.log("elimina")
      break;
  }
}