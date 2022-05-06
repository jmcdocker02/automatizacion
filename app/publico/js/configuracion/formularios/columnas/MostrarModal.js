import { Modal } from "../../../componentes/Modal.js";
import { AsignaEventos } from "../../../funciones/AsignaEventos.js";
import { BotonesGuardarCancelar } from "../../../funciones/BotonesGuardarCancelar.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { TarjetaFormulario } from "../../../componentes/TarjetaFormulario.js";
import { CajaTexto } from "../../../componentes/CajaTexto.js";
import { ColocaValoresModal } from "./ColocaValoresModal.js";
import { Contenedor } from "../../../componentes/Contenedor.js";
import { Select } from "../../../componentes/Select.js";

export async function MostrarModal(AJson){
  const {
    col01,
    col02
  } = AJson
  const $formulario = document.createElement("form");
  const $fragmento = document.createDocumentFragment();
  $formulario.id = "id-formulario-captura"; 

  $fragmento.appendChild(Contenedor({ "fragmento": PrimeraLinea() }));
  $fragmento.appendChild(Contenedor({ "fragmento": SegundaLinea() }));
  $formulario.appendChild(Contenedor({ "fragmento": $fragmento }));
  Modal({
    "titulo": "Agregar Columna",
    "claseModal": "modal-xl",
    "contenido": $formulario,
    "botones": BotonesGuardarCancelar(
      [{
        "atributo": "data-col01",
        "valor": col01,
      },
      {
        "atributo": "data-col02",
        "valor": col02,
      }]
    )
  });

  AsignaEventos({
    "eventos": [
      {"elemento": "id-guardar", "evento": "click"}
    ],
    "funcion": CambiarFiltros
  });

  ColocaValoresModal(AJson);
}


function PrimeraLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "No de Columna",
      "contenido": [
        CajaTexto({
          "name": "col02",
          "size": "30",
          "required": true,
          "placeholder": "No de Columna",
          "maxlength": 100,
        })
      ]
    }));
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Campo",
      "contenido": [
        CajaTexto({
          "name": "col03",
          "size": "30",
          "required": true,
          "placeholder": "Campo",
          "maxlength": 100,
        })
      ]
    }));  
    linea.appendChild(
      TarjetaFormulario({
        "textoEtiqueta": "Titulo a Mostrar",
        "contenido": [
          CajaTexto({
            "name": "col04",
            "size": "30",
            "required": true,
            "placeholder": "Titulo a Mostrar",
            "maxlength": 100,
          })
        ]
      }));
  return linea;
}
function SegundaLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Alineacion",
      "contenido": [
        Select({
          "id": "col05",
          "anchoLista": "16.5rem",
          "opciones": [
            {
              "valor": 0, 
              "texto": "Izquierda"
            },
            {
              "valor": 1, 
              "texto": "Centro"
            },
            {
              "valor": 2, 
              "texto": "Derecha"
            }
          ],
          "valorDefault": 0,
          "funcion": CambiarFiltros
        })
      ]
    }));
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Longitud en rem",
      "contenido": [
        CajaTexto({
          "name": "col06",
          "size": "30",
          "required": true,
          "placeholder": "Longitud en rem",
          "maxlength": 100,
        })
      ]
    }));  
    linea.appendChild(
      TarjetaFormulario({
        "textoEtiqueta": "Formato",
        "contenido": [
          CajaTexto({
            "name": "col07",
            "size": "30",
            "required": true,
            "placeholder": "Formato",
            "maxlength": 100,
          })
        ]
      })); 
  return linea;
}