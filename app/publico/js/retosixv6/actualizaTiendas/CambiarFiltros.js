import { MostrarModal } from "../../funcionesExcel/MostrarModal.js";
import { EnviarDatosExcel } from "../../funcionesExcel/EnviarDatosExcel.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";

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
        "modulo": "retoSix",
        "pagina": `tiendas.php`
      });
      //  if (await ValidarCaptura()){
      //   await ObtieneColumnasImportar({});
      //   const loader = document.getElementById("main-loader");
      //   if ( loader != null ) loader.style.display = "block";
      //   await ObtieneDatosArchivo({
      //     "elemento": document.getElementById("id-arc01"), 
      //     "funcion": LlamadoJson
      //     });
      //   if(loader != null)loader.style.display = "none"; 
      //  }
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
        "idTabla": e.target.parentNode.getAttribute("data-id-importacion"),
        "funcionCambiarFiltros": CambiarFiltros
      });
    break;
    case "id-guardar":
      await EnviarDatosExcel();
    break;
  }
}

// function LlamadoJson(json){
//   Ajax({
//     "metodo": "POST",
//     "url": ObtieneUrl({
//       "modulo": "retoSix",
//       "pagina": `tiendas.php?columnasExcel=${sessionStorage.getItem("columnasExcel")}`
//     }),
//     "params": json,
//     cbSuccess: async (json) =>{
//       await MuestraMensajeAcepta({"mensaje": json.resultado, "modal": "principal"});
//     }
//   })
//   sessionStorage.removeItem("columnasExcel");      
//  }

// function ObtienevaloresTabla(AJson){
//   const {
//     idTabla,
//     columnasTabla,
//     columnasObtener,
//   } = AJson;
//   const $tabla = document.getElementById(idTabla);
//   const totalColumnas = (columnasTabla) 
//     ? columnasTabla //es para verificar si se utiizara una columna mas
//     : $tabla.rows[0].cells.length - 1
//   let lineas = "";
//   let coma = "";
//   for (let i = 1; i < $tabla.rows.length; i++) {
//     let linea = "";
//     let puntoComa = "";
//     columnasObtener.forEach(columna => {
//       linea += `${puntoComa}${$tabla.rows[i].cells[columna].innerText}`;
//       puntoComa = ";";        
//     });
//     lineas += `${coma}${linea}`;
//     coma = ",";
//   }
//   sessionStorage.setItem("columnasExcel",lineas);
// }