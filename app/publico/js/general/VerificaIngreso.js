import { AjaxPost } from "../funciones/AjaxPost.js";
import { Codificar } from "../funciones/Codificar.js";
import { ObtieneUrl } from "../funciones/ObtieneUrl.js";
import { ConfigurarEmpresa } from "./ConfigurarEmpresa.js";
import { ModalEmpresas } from "./ModalEmpresas.js";

export async function VerificaIngreso(){
//  let datos = new FormData();
//  datos.append("usuario", Codificar(document.getElementById("usuario").value));
//  datos.append("password", Codificar(md5(document.getElementById("password").value)));
  const datos = {"usuario": Codificar(document.getElementById("usuario").value),
  "password": Codificar(md5(document.getElementById("password").value))}

  AjaxPost({
    "url": ObtieneUrl({
      "modulo": "general",
      "pagina": "ingreso.php"
    }),
    "params": datos,
    "cbSuccess": async(json) => {
      if (json.hasOwnProperty("usuario")) {
        sessionStorage.setItem("idUsuario", json.usuario.usu01);
        sessionStorage.setItem("cveUsuario", json.usuario.usu04);
        sessionStorage.setItem("token", json.token);
        await ConfigurarEmpresa({
          "idEmpresa": 1,
          "nombreEmpresa": "DECODE",
          "numeroEmpresas": 1
        });
        //await ModalEmpresas(json.usuario.usu01);
      } else {
        let mensaje = ""; 
          if (json.hasOwnProperty("error")) {
            mensaje = json.error.error;
          } else {
            mensaje = "Acceso Denegado";
          }
          document.getElementById("alerta").innerText = mensaje;
          setTimeout(function() {
              document.getElementById("alerta").innerText = "";
          }, 5000);
      }
    }
  })
}