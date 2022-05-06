import { MostrarModal } from "../../funcionesExcel/MostrarModal.js";
import { EnviarDatosExcel } from "../../funcionesExcel/EnviarDatosExcel.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { EnviaProceso } from "./EnviaProceso.js";
import { ExportarExcel } from "../../funcionesExcel/ExportarExcel.js";
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
      const anio = `&anio=${document.getElementById("id-anio").value}`;
      const semestre = `&semestre=${document.getElementById("id-Semestre").value}`;
      await EnviarDatosExcel({
        "modulo": "heinekenstars",
        "pagina": `StarsSemestral.php`,
        "adicionales" : `&opcion=1${anio}${semestre}`
      });
      break; 
    case "id-cbcampo":
      break;
    case "id-Actualizar":
      EnviaProceso(2);
      break;
    case "id-Exportar":
      ExportarExcel({
        "modulo": "heinekenstars",
        "pagina": `StarsSemestral.php`
      });
      break;
    case "id-Correo":
      EnviaProceso(4);
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
    case "id-Exportar":
      ExportarExcel({
        "modulo": "heinekenstars",
        "pagina": `StarsSemestral.php`
      });
      break;
    case "id-Errores":
      ModalErrores({"idTabla": e.target.parentNode.getAttribute("data-pro01"), "funcionClick": CambiarFiltros});
      break;
  }
}