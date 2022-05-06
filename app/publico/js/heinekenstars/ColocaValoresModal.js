import { ObtieneRegistro } from "../funciones/ObtieneRegistro.js";

export async function ColocaValoresModal(AId){

    const valores = await ObtieneRegistro({
    "idFormulario": 43,
    "idTabla": AId
  });
  
  document.getElementById(`id-pro09`).value = valores.pro09; 

}