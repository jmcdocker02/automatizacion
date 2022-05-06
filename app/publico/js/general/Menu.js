import { AjaxPost } from "../funciones/AjaxPost.js";
import { ArmaMenu } from "../funciones/ArmaMenu.js";
import { AsignaEventos } from "../funciones/AsignaEventos.js";
import ColocaTituloEmpresa from "../funciones/ColocaTituloEmpresa.js";
import { ObtieneUrl } from "../funciones/ObtieneUrl.js";
import { CambiarEventos } from "./CambiarEventos.js";
import { CerrarSession } from "./CerrarSession.js";

export async function Menu(ANumeroEmpresas) {
    let $menu = document.getElementById("menu");
    //let datos = new FormData();
    //datos.append("idUsuario", sessionStorage.getItem("idUsuario"));
    //datos.append("idEmpresa", sessionStorage.getItem("idEmpresa"));
    //datos.append("token", sessionStorage.getItem("token"));
    const datos = {"idUsuario": sessionStorage.getItem("idUsuario"),
      "idEmpresa": sessionStorage.getItem("idEmpresa"),
      "token": sessionStorage.getItem("token")}

    await AjaxPost({
        "url": ObtieneUrl({
            "modulo": "general",
            "pagina": "ObtieneOpcionesMenu.php"
        }),
        "params": datos,
        cbSuccess: async(json) => {
            if (json.hasOwnProperty("error")) {
                document.getElementById("alerta").innerText = json.error;
                setTimeout(function() {
                    document.getElementById("alerta").innerText = "";
                    CerrarSession();
                }, 5000);
            } else {
                document.getElementById("body").className = "body";
                $menu.innerHTML = MenuPrincipal({ "datos": json.registros, "numeroEmpresas": ANumeroEmpresas }).outerHTML
                ColocaTituloEmpresa(sessionStorage.getItem("nombreEmpresa"));
            }
        }
    })

    AsignaEventos({
        "eventos": [
            { "elemento": "menu", "evento": "click" }
        ],
        "funcion": CambiarEventos
    });
}



function MenuPrincipal(AJson) {

    const {
        datos,
        numeroEmpresas
    } = AJson;
    const $barraMenu = document.createElement("div");
    const visible = (numeroEmpresas === 1) ? "none" : "block";
    $barraMenu.innerHTML = `
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto bg-light">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <div class="sidebar-header border-bottom" style="width: 100%; padding: 1rem .5rem">
            <img src="publico/img/Decode-02-01.jpg" width="100" height="65" alt="logo" class="centro"/>
          </div>  
          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            ${
              ArmaMenu(datos)
            }
          </ul>
          <hr>
          <div class="dropdown pb-4">
            <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle link-dark" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="publico/img/login/usuarioLogin1.jpg" alt="" width="30" height="30" class="rounded-circle">
              <span class="d-none d-sm-inline mx-1">${sessionStorage.getItem("cveUsuario")}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownUser1">
              <li><button type="button" class="btn btn-light btn-sm" style="width: 100%;display: ${visible};" id="id-cambioEmpresa">Cambiar Empresa</button></li>
              <li><button type="button" class="btn btn-light btn-sm" style="width: 100%;" id="id-salir">Cerrar Sesion</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
    return $barraMenu;
}