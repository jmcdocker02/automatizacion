import { LimpiarContenido } from "../funciones/LimpiarContenido.js";
import { ObtieneRutaOpcionMenu } from "../funciones/ObtieneRutaOpcionMenu.js";
import { ConfigurarEmpresa } from "./ConfigurarEmpresa.js";
import { ModalEmpresas } from "./ModalEmpresas.js";
import { VerificaIngreso } from "./VerificaIngreso.js";
import { CerrarSession } from "./CerrarSession.js";
import { ValidarCaptura } from "./ValidarCaptura.js";
import { CargarOpcion } from "../funciones/CargarOpcion.js";
import { SolicitarContrasena } from "./SolicitarContrasena.js";

export async function CambiarEventos(e) {
    if (e.target.tagName === "BUTTON") e.preventDefault();
    if(e.target.type === "button" && e.target.id !== "id=recuperaContrasenia" && e.target.id !== "id-salir"){
        sessionStorage.setItem("nombreOpcionMenu",e.target.getAttribute("data-opcionmenu"));
        sessionStorage.setItem("nombreOpcionModulo",e.target.getAttribute("data-modulo"));
        sessionStorage.setItem("idFormulario",e.target.getAttribute("data-idformulario"));
        sessionStorage.setItem("nombreFormulario",e.target.getAttribute("data-nombreformulario"));
        await CargarOpcion();
    }
    switch (e.target.id) {
        case "id-ingresar":
            if (ValidarCaptura()){
             VerificaIngreso();
            }
            break;
        case "id-Seleccionar":
            ConfigurarEmpresa({
                "idEmpresa": e.target.getAttribute("data-emp01"),
                "nombreEmpresa": e.target.getAttribute("data-con03"),
                "numeroEmpresas": 2
            });
            break;
        case "id-cambioEmpresa":
            document.getElementById("empresa").innerHTML = null;
            LimpiarContenido();
            await ModalEmpresas(sessionStorage.getItem("idUsuario"));
            break;
        case "id-salir":
            CerrarSession();
            break;
        case "id-recuperaContrasenia":
            if (ValidarCaptura()){
                SolicitarContrasena();
            }   
            break;    
    }
}