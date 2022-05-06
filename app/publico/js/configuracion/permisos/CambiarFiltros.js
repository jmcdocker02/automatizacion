import { CargarPermisos } from "./CargarPermisos.js";
import { Guardar } from "./Guardar.js";

export async function CambiarFiltros(e){
   if (e.target.tagName === "FORM") e.preventDefault(); // Aqui se cancela todos los eventos que puedan venir en la etiqueta de formulario
  switch(e.target.id){ // valida en que elemento del DOM se esta realizando el evento y lo asigna por cases
    case "id-Guardar":
      await Guardar(e.target.getAttribute("data-id")); // funcion que se encarga de guardar un registro dependiendo de su data-id
      break;
      case "id-menus":
        CargarPermisos(document.getElementById("id-catalogo").value);
        break;      
  }
  switch (e.target.parentNode.id) { // Valida los eventos que se hacen sobre un icono, si el elemento no tiene icono no es necesario que se incluya en esta seccion
    case "id-Guardar":
      await Guardar(e.target.parentNode.getAttribute("data-id"));
      break;
  }
}