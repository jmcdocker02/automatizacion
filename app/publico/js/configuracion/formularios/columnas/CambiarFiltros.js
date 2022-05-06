import { Eliminar } from "./Eliminar.js";
import { Guardar } from "./Guardar.js";
import { MostrarModal } from "./MostrarModal.js";

export async function CambiarFiltros(e){
  if (e.target.tagName === "FORM") e.preventDefault();
  switch(e.target.id){
    case "id-Agregar":
      await MostrarModal({"col01": document.getElementById("id-formularios").value, "col02": 0});
      break;
    case "id-guardar":
      await Guardar({"col01": e.target.getAttribute("data-col01"), "col02": e.target.getAttribute("data-col02")});
      break;
    case "id-Modificar":
      await MostrarModal({"col01": e.target.getAttribute("data-col01"), "col02": e.target.getAttribute("data-col02")})
      break;
    case "id-Eliminar":
      await Eliminar({"col01": e.target.getAttribute("data-col01"), "col02": e.target.getAttribute("data-col02")});
      break;
  }
  switch (e.target.parentNode.id) {
    case "id-Agregar":
      await MostrarModal({"col01": document.getElementById("id-formularios").value, "col02": 0});
      break;
    case "id-guardar":
      await Guardar({"col01": e.target.parentNode.getAttribute("data-col01"), "col02": e.target.parentNode.getAttribute("data-col02")});
      break;
    case "id-Modificar":
      await MostrarModal({"col01": e.target.parentNode.getAttribute("data-col01"), "col02": e.target.parentNode.getAttribute("data-col02")})
      break;
    case "id-Eliminar":
      await Eliminar({"col01": e.target.parentNode.getAttribute("data-col01"), "col02": e.target.parentNode.getAttribute("data-col02")});
      break;
  }
}