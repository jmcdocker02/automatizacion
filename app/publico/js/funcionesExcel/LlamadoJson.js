import { Ajax } from "../funciones/Ajax.js";
import { CargarOpcion } from "../funciones/CargarOpcion.js";
import { MuestraMensajeAcepta } from "../funciones/MuestraMensajeAcepta.js";

export async function LlamadoJson(json){
    await Ajax({
        "metodo": "POST",
        "url": sessionStorage.getItem("urlExcel"),
        "modal": "principal",
        "params": json,
        cbSuccess: async (json) =>{
            let mensaje = "";
            if(json.error){
                mensaje = json.error;
            } else if(json.resultado){
                Object.keys(json.resultado).forEach(titulo => {
                 mensaje += titulo + " " + json.resultado[titulo] +" \n ";
                });
            } else {
                mensaje = "Error inesperado";
            }
            MuestraMensajeAcepta({
                "mensaje": mensaje, 
                "modal": "principal"}
            );
            await CargarOpcion();
        }
    });
}