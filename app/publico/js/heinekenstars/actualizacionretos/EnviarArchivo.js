import { EnviarDatosExcel } from "../../funcionesExcel/EnviarDatosExcel.js";

export async function EnviarArchivo(){
    const fecha = document.getElementById("id-fechaProceso").value;
    const id = document.getElementById("id-reto").value;
    const tipo = document.getElementById("id-tipo").value;
    const adicionales = `&fechaProceso=${fecha}&idReto=${id}&tipo=${tipo}`
    await EnviarDatosExcel({
    "modulo": "heinekenstars",
    "pagina": `ActualizacionRetos.php`,
    "adicionales": adicionales
    });
}