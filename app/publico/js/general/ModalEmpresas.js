import { AjaxPost } from '../funciones/AjaxPost.js';
import { ObtieneUrl } from '../funciones/ObtieneUrl.js';
import { Modal } from '../componentes/Modal.js';
import { Tabla } from '../componentes/Tabla.js';
import { AsignaEventos } from '../funciones/AsignaEventos.js';
import { CambiarEventos } from './CambiarEventos.js';
import { ConfigurarEmpresa } from './ConfigurarEmpresa.js';

export async function ModalEmpresas(AUsuario){
  //const datos = new FormData();
  //datos.set("idUsuario", AUsuario);
  //datos.set("token", sessionStorage.getItem("token"));
  const datos = {"idUsuario": Codificar(document.getElementById("AUsuario").value),
  "token": sessionStorage.getItem("token")}

  await AjaxPost({
    "url": ObtieneUrl({
        "modulo": "general",
        "pagina": "ObtieneEmpresas.php"
    }),
    "params": datos,
    cbSuccess: async(json) => {
        if (json.hasOwnProperty("registros")) {
          await SeleccionarEmpresa(json);
        } else {
            if (json.hasOwnProperty("error")) {
                document.getElementById("alerta").innerText = json.error;
                setTimeout(function() {
                    document.getElementById("alerta").innerText = "";
                }, 5000);
            }
        }
    }
  });
}

async function SeleccionarEmpresa(AJson){
  sessionStorage.setItem("token", AJson.token);
  if (AJson.registros.length === 1){
    ConfigurarEmpresa({
      "idEmpresa": AJson.registros[0].emp01,
      "nombreEmpresa": AJson.registros[0].con03,
      "numeroEmpresas": AJson.registros.length
    })
  } else {
    Modal({
      "titulo": "Seleccionar Empresa",
      "claseModal": "modal-lg",
      "contenido": Tabla({
        "clases": ["clase1", "clase2"],
        "registros": AJson.registros,
        "titulos": AJson.titulos,
        "botones": AJson.botones,
        "formulario": AJson.formulario,
        "tipo": 1
      })
    });
    AsignaEventos({
      "eventos": [
          { "elemento": "id-empresas", "evento": "click" }
      ],
      "funcion": CambiarEventos
    });
  }
}