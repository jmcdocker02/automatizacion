import { Modal } from "../../../componentes/Modal.js";
import { AsignaEventos } from "../../../funciones/AsignaEventos.js";
import { BotonesGuardarCancelar } from "../../../funciones/BotonesGuardarCancelar.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { TarjetaFormulario } from "../../../componentes/TarjetaFormulario.js";
import { CajaTexto } from "../../../componentes/CajaTexto.js";
import { ColocaValoresModal } from "./ColocaValoresModal.js";
import { Contenedor } from "../../../componentes/Contenedor.js";
import { Select } from "../../../componentes/Select.js";

export async function MostrarModal(AIdTabla){
  const $formulario = document.createElement("form");
  const $fragmento = document.createDocumentFragment();
  $formulario.id = "id-formulario-captura"; 

  $fragmento.appendChild(Contenedor({ "fragmento": PrimeraLinea() }));
  $fragmento.appendChild(Contenedor({ "fragmento": SegundaLinea() }));
  
  $formulario.appendChild(Contenedor({ "fragmento": $fragmento }));

  Modal({
    "titulo": "Agregar Menu",
    "claseModal": "modal-lg",
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

  ColocaValoresModal({
    "id": AIdTabla
  });
}


function PrimeraLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Nombre o Descripcion del Menu",
      "contenido": [
        CajaTexto({
          "name": "men02",
          "size": "30",
          "required": true,
          "placeholder": "Nombre o Descripcion del Menu",
          "maxlength": 100,
        })
      ]
    }));
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Activo o Inactivo",
      "contenido": [
        Select({
          "id": "men03",
          "anchoLista": "16.5rem",
          "opciones": [
            {
              "valor": 0, 
              "texto": "Activo"
            },
            {
              "valor": 1, 
              "texto": "Inactivo"
            }
          ],
          "valorDefault": 0,
          "funcion": CambiarFiltros
        })
      ]
    }));  
  return linea;
}

function SegundaLinea(){
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Base de Datos",
      "contenido": [
        CajaTexto({
          "name": "men04",
          "size": "30",
          "required": true,
          "placeholder": "Base de Datos",
          "maxlength": 100,
        })
      ]
    }));
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Coloca los dos digitos del Año",
      "contenido": [
        Select({
          "id": "men05",
          "anchoLista": "16.5rem",
          "opciones": [
            {
              "valor": 1, 
              "texto": "Si"
            },
            {
              "valor": 0, 
              "texto": "No"
            }
          ],
          "valorDefault": 0,
          "funcion": CambiarFiltros
        })
      ]
    }));  
  return linea;
}