import { EnviarDatosExcel } from "../../funcionesExcel/EnviarDatosExcel.js";
import { MostrarModal } from "../../funcionesExcel/MostrarModal.js";

export async function CambiarFiltros(e){
  if (e.target.tagName === "FORM") e.preventDefault();
  switch(e.target.id){
    case "id-Importar":
      await MostrarModal(e.target.getAttribute("data-id-importacion"));
    break;
    case "id-arc01":
      // const loader = document.getElementById("main-loader");
      // if ( loader != null ) loader.style.display = "block";
      // const json = await ObtieneDatosArchivo({"e": e, "funcion": LlamadoJson});
      // if(loader != null)loader.style.display = "none";
      break;
     case "id-guardar":
        await EnviarDatosExcel({
          "modulo": "retoSix",
          "pagina": `comerciantes.php`
        });
      break; 
      case "id-cbcampo":
        
        break;
  }
  
  switch (e.target.parentNode.id) { 
    case "id-Actualizar":
     alert("hola")
    break;
  }
}