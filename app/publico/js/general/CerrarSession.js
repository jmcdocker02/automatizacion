import { MuestraMensajeError } from "../funciones/MuestraMensajeError.js";

export async function CerrarSession(AMensaje){ 
  let tiempoEspera = 50;
  if(AMensaje){
   MuestraMensajeError(AMensaje);
   tiempoEspera = 3000;
 }
 setTimeout(function(){
  sessionStorage.clear();
  window.location = "https://jmc.decode.mx/"; //"http://localhost/app/";
  },tiempoEspera);

  
}