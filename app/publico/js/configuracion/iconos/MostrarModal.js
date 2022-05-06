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
  
  $formulario.appendChild(Contenedor({ "fragmento": $fragmento }));

  Modal({
    "titulo": "Agregar Estado",
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
      "textoEtiqueta": "Id del Icono",
      "contenido": [
        CajaTexto({
          "name": "ico01",
          "size": "40",
          "required": true,
          "placeholder": "Id del Icono",
          "maxlength": 100,
        })
      ]
    }));
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Codigo HTML",
      "contenido": [
        CajaTexto({
          "name": "ico02",
          "size": "30",
          "required": true,
          "placeholder": "Codigo HTML",
          "maxlength": 100,
        })
      ]
    }));
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Codigo Unicod",
      "contenido": [
        CajaTexto({
          "name": "ico03",
          "size": "30",
          "required": true,
          "placeholder": "Codigo Unicod",
          "maxlength": 100,
        })
      ]
    }));  
  return linea;
}