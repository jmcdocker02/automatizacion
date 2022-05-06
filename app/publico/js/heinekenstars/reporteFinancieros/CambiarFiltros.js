import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { ExportarExcel } from "../../funcionesExcel/ExportarExcel.js";
import { ModalErrores } from "../ModalErrores.js";

export async function CambiarFiltros(e){
  if (e.target.tagName === "FORM") e.preventDefault();
  switch(e.target.id){
    case "id-Exportar":
      ExportarExcel({
        "modulo": "heinekenstars",
        "pagina": `reporteFinancieros.php`
      });
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
    case "id-Exportar":
      ExportarExcel({
        "modulo": "heinekenstars",
        "pagina": `reporteFinancieros.php`
      });
    break;
    case "id-Errores":
      ModalErrores({"idTabla": e.target.parentNode.getAttribute("data-pro01"), "funcionClick": CambiarFiltros});
      break;
  }
}
