import { MostrarModal } from "../../funcionesExcel/MostrarModal.js";
import { EnviarDatosExcel } from "../../funcionesExcel/EnviarDatosExcel.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { ModalErrores } from "../ModalErrores.js";

export async function CambiarFiltros(e){
  if (e.target.tagName === "FORM") e.preventDefault();
  switch(e.target.id){
    case "id-Importar":
      await MostrarModal({
        "idTabla": e.target.getAttribute("data-id-importacion"),
        "funcionCambiarFiltros": CambiarFiltros
      });
    break;
    case "id-arc01":
      break;
    case "id-guardar":
      await EnviarDatosExcel({
        "modulo": "heinekenstars",
        "pagina": `bajaEmpleados.php`
      });
      break; 
    case "id-cbcampo":
      
      break;
    case "id-fechaInicio":
    case "id-fechaFin":
      await ObtieneDatosTabla({"funcion": CambiarFiltros}); 
      break
    case "id-Errores":
      ModalErrores({"idTabla": e.target.getAttribute("data-pro01"), "funcionClick": CambiarFiltros});
      break;
  }
  
  switch (e.target.parentNode.id) { 
    case "id-Importar":
      await MostrarModal({
        "idTabla": e.target.parentNode.getAttribute("data-id-importacion"),
        "funcionCambiarFiltros": CambiarFiltros
      });
      break;
    case "id-guardar":
      await EnviarDatosExcel();
      break;
    case "id-Errores":
      ModalErrores({"idTabla": e.target.parentNode.getAttribute("data-pro01"), "funcionClick": CambiarFiltros});
      break;
  }
}