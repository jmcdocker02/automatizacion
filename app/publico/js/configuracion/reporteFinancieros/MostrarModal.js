import { Modal } from "../../componentes/Modal.js";
import { AsignaEventos } from "../../funciones/AsignaEventos.js";
import { BotonesGuardarCancelar } from "../../funciones/BotonesGuardarCancelar.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { TarjetaFormulario } from "../../componentes/TarjetaFormulario.js";
import { CajaTexto } from "../../componentes/CajaTexto.js";
import { ColocaValoresModal } from "./ColocaValoresModal.js";
import { Contenedor } from "../../componentes/Contenedor.js";

export async function MostrarModal(AIdTabla){
  const $formulario = document.createElement("form");
  const $fragmento = document.createDocumentFragment();
  $formulario.id = "id-formulario-captura"; 

  $fragmento.appendChild(Contenedor({ "fragmento": PrimeraLinea() }));
  $fragmento.appendChild(Contenedor({ "fragmento": SegundaLinea() }));
  $fragmento.appendChild(Contenedor({ "fragmento": TerceraLinea() }));
  
  $formulario.appendChild(Contenedor({ "fragmento": $fragmento }));

  Modal({
    "titulo": "Agregar Linea al Reporte",
    "claseModal": "modal-xl",
    "contenido": $formulario,
    "botones": BotonesGuardarCancelar(
      [{
        "atributo": "data-id",
        "valor": AIdTabla,
      }]
    )
  });

  AsignaEventos({
    "eventos": [
      {"elemento": "id-guardar", "evento": "click"}
    ],
    "funcion": CambiarFiltros
  });

  ColocaValoresModal(AIdTabla);
}


function PrimeraLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Modulo",
      "contenido": [
        CajaTexto({
          "name": "rep02",
          "size": "50",
          "required": true,
          "placeholder": "Modulo",
          "maxlength": 50,
        })
      ]
    }));
    linea.appendChild(
      TarjetaFormulario({
      "textoEtiqueta": "Periodo",
      "contenido": [
        CajaTexto({
          "name": "rep03",
          "size": "50",
          "required": true,
          "placeholder": "Periodo",
          "maxlength": 50,
        })
      ]
    }));  
    return linea;
}

function SegundaLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Fecha de Asigancion de Stars",
      "contenido": [
        CajaTexto({
          "name": "rep04",
          "size": "50",
          "required": true,
          "placeholder": "Fecha de Asigancion de Stars",
          "maxlength": 50,
        })
      ]
    }));
    linea.appendChild(
      TarjetaFormulario({
      "textoEtiqueta": "Tabla",
      "contenido": [
        CajaTexto({
          "name": "rep05",
          "size": "50",
          "required": true,
          "placeholder": "Tabla",
          "maxlength": 50,
        })
      ]
    }));  
    return linea;
}

function TerceraLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Consulta SQL",
      "contenido": [
        CajaTexto({
          "name": "rep06",
          "size": "108",
          "required": true,
          "placeholder": "Consulta SQL",
          "maxlength": 500,
        })
      ]
    }));
  
    return linea;
}