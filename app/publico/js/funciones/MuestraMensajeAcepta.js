import { OcultaModal } from "./OcultaModal.js";

export function MuestraMensajeAcepta(AJson){
    const {
        mensaje,
        modal
    } = AJson;
    alertify.alert("Confirmacion", mensaje, function(click, value){
        if(modal){OcultaModal(`modal-${modal}`)};
        sessionStorage.removeItem("urlExcel");
        sessionStorage.removeItem("columnasExcel");
    });
    
}