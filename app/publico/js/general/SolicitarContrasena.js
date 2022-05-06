import { AjaxPost } from "../funciones/AjaxPost.js";
import { Codificar } from "../funciones/Codificar.js";
import { ObtieneUrl } from "../funciones/ObtieneUrl.js";

export async function SolicitarContrasena(){
  //let datos = new FormData();
  //datos.append("usuario", Codificar(document.getElementById("usuario").value));
  //datos.append("correo", document.getElementById("password").value);
  const datos = {"usuario": Codificar(document.getElementById("usuario").value),
  "correo": document.getElementById("password").value}

  AjaxPost({
    "url": ObtieneUrl({
      "modulo": "general",
      "pagina": "solicitarContrasena.php"
    }),
    "params": datos,
    "cbSuccess": async(json) => {
      let mensaje = ""; 
      if (json.hasOwnProperty("resultado")) {
        if(json.resultado.hasOwnProperty("enviado")){
          mensaje = json.resultado.enviado;
        } else {
          mensaje = json.resultado.error;
        }
      }else{
       if (json.hasOwnProperty("error")) {
        mensaje = json.error.error;
       } else {
        mensaje = "Acceso Denegado";
       }
      }
      document.getElementById("alerta").innerText = mensaje;
      setTimeout(function() {
          document.getElementById("alerta").innerText = "";
      }, 5000);
}
  })
}