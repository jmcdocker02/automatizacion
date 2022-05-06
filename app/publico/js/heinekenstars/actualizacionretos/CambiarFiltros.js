import { ObtieneDatosRetos } from "./ObtieneDatosRetos.js";
import { MostrarModal } from "../../funcionesExcel/MostrarModal.js";
import { EnviarArchivo } from "./EnviarArchivo.js";
import { ValidarCaptura } from "./ValidarCaptura.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { ModalErrores } from "../ModalErrores.js";

export async function CambiarFiltros(e){
  if (e.target.tagName === "FORM") e.preventDefault(); // Aqui se cancela todos los eventos que puedan venir en la etiqueta de formulario
  switch(e.target.id){ // valida en que elemento del DOM se esta realizando el evento y lo asigna por cases
    case "id-Importar Empleados":
    case "id-Importar Cajas":
        if(ValidarCaptura()){
        await MostrarModal({
          "idTabla":e.target.getAttribute("data-id-importacion"),
          "funcionCambiarFiltros": CambiarFiltros
        });
      }
      break;
    case "id-guardar":
      await EnviarArchivo();
      break;
    case "id-fechaProceso":
      await ObtieneDatosRetos();
      break;
    case "id-fechaInicio":
    case "id-fechaFin":
      await ObtieneDatosTabla({"funcion": CambiarFiltros}); 
      break
    case "id-Errores":
      ModalErrores({"idTabla": e.target.getAttribute("data-pro01"), "funcionClick": CambiarFiltros});
      break;
  }
  switch (e.target.parentNode.id) { // Valida los eventos que se hacen sobre un icono, si el elemento no tiene icono no es necesario que se incluya en esta seccion
    case "id-Importar":
      if(ValidarCaptura()){
        await MostrarModal({
          "idTabla":e.target.parentNode.getAttribute("data-id-importacion"),
          "funcionCambiarFiltros": CambiarFiltros
        });
      }
      break;
    case "id-guardar":
      await EnviarArchivo();
      break;
    case "id-Errores":
      ModalErrores({"idTabla": e.target.parentNode.getAttribute("data-pro01"), "funcionClick": CambiarFiltros});
      break;
  }
}