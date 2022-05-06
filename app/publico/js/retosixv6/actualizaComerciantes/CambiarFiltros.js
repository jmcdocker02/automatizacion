import { MostrarModal } from "../../funcionesExcel/MostrarModal.js";
import { EnviarDatosExcel } from "../../funcionesExcel/EnviarDatosExcel.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";

export async function CambiarFiltros(e){
  if (e.target.tagName === "FORM") e.preventDefault();
  switch(e.target.id){
    case "id-Importar":
      await MostrarModal({
        "idTabla":e.target.getAttribute("data-id-importacion"),
        "funcionCambiarFiltros": CambiarFiltros
      });
    break;
    case "id-arc01":
      break;
     case "id-guardar":
        await EnviarDatosExcel({
          "modulo": "retoSix",
          "pagina": `comerciantes.php`
        });
      break; 
      case "id-cbcampo":
        
        break;
    case "id-fechaInicio":
    case "id-fechaFin":
      await ObtieneDatosTabla({"funcion": CambiarFiltros}); 
      break
  }
  switch (e.target.parentNode.id) { 
    case "id-Importar":
      await MostrarModal({
        "idTabla":e.target.parentNode.getAttribute("data-id-importacion"),
        "funcionCambiarFiltros": CambiarFiltros
      });
    break;
    case "id-guardar":
      await EnviarDatosExcel({
        "modulo": "retoSix",
        "pagina": `comerciantes.php`
      });
      break;
  }
}