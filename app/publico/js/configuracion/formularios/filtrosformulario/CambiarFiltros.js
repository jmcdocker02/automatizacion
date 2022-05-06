import { Eliminar } from "./Eliminar.js";
import { Guardar } from "./Guardar.js";
import { MostrarModal } from "./MostrarModal.js";
import { ObtienePrefijo } from "../ObtienePrefijo.js";

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
      await MostrarModal(e.target.getAttribute("data-fil01"));
      break;
    case "id-Eliminar":
      await Eliminar(e.target.getAttribute("data-fil01"));
      break;
    case "id-fil05":
      const prefijo = ObtienePrefijo("id-fil05");
      document.getElementById("id-fil06").value = prefijo+"01";
      document.getElementById("id-fil07").value = prefijo+"02";
      break;
  }
  switch (e.target.parentNode.id) {
    case "id-Agregar":
      await MostrarModal(0);
      break;
    case "id-guardar":
      await Guardar(e.target.parentNode.getAttribute("data-id"));
      break;
      case "id-Modificar":
        await MostrarModal(e.target.parentNode.getAttribute("data-fil01"));
        break;
      case "id-Eliminar":
        await Eliminar(e.target.parentNode.getAttribute("data-fil01"));
      break;
  }
}