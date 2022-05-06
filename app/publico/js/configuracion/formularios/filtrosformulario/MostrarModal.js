import { Modal } from "../../../componentes/Modal.js";
import { AsignaEventos } from "../../../funciones/AsignaEventos.js";
import { BotonesGuardarCancelar } from "../../../funciones/BotonesGuardarCancelar.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { TarjetaFormulario } from "../../../componentes/TarjetaFormulario.js";
import { CajaTexto } from "../../../componentes/CajaTexto.js";
import { ColocaValoresModal } from "./ColocaValoresModal.js";
import { Contenedor } from "../../../componentes/Contenedor.js";
import { Select } from "../../../componentes/Select.js";
import { Catalogo } from "../../../componentes/Catalogo.js";
import { ObtieneDatosCatalogo } from "../../../funciones/ObtieneDatosCatalogo.js";

export async function MostrarModal(AIdTabla){
  const $formulario = document.createElement("form");
  const $fragmento = document.createDocumentFragment();
  $formulario.id = "id-formulario-captura"; 
  $fragmento.appendChild(Contenedor({ "fragmento": await PrimeraLinea() }));
  $fragmento.appendChild(Contenedor({ "fragmento": SegundaLinea() }));
  $formulario.appendChild(Contenedor({ "fragmento": $fragmento }));
  Modal({
    "titulo": "Agregar Filtro",
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
      {"elemento": "id-guardar", "evento": "click"},
      {"elemento": "id-fil05", "evento": "keyup"}
    ],
    "funcion": CambiarFiltros
  });

  ColocaValoresModal(AIdTabla);
}

async function PrimeraLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Tipo de Filtro",
      "contenido": [
        Select({
          "id": "fil03",
          "anchoLista": "14rem",
          "opciones": [
            {
              "valor": 1, 
              "texto": "Lista"
            },
            {
              "valor": 2, 
              "texto": "CajaTexto"
            },
            {
              "valor": 3, 
              "texto": "Periodos"
            },
            {
              "valor": 4, 
              "texto": "RadioGroups"
            },
            {
              "valor": 5, 
              "texto": "CheckBox"
            }
          ],
          "valorDefault": 1,
          "funcion": CambiarFiltros
        })
      ]
    })); 
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Titulo",
      "contenido": [
        CajaTexto({
          "name": "fil04",
          "size": "25",
          "required": true,
          "placeholder": "Titulo",
          "maxlength": 100,
        })
      ]
    })); 
    linea.appendChild(
      await Catalogo({
        "fijo": true,
        "textoEtiqueta": "Formulario",
        "FuncionEvento": CambiarFiltros,
        "datos": await ObtieneDatosCatalogo(4),
        "id": "fil06",
        "anchoLista": "29rem"
      })
    );
  return linea;
}

function SegundaLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Mantenimiento",
      "contenido": [
        Select({
          "id": "fil05",
          "anchoLista": "14rem",
          "opciones": [
            {
              "valor": 0, 
              "texto": "No"
            },
            {
              "valor": 1, 
              "texto": "Si"
            },
          ],
          "valorDefault": 0,
          "funcion": CambiarFiltros
        })
      ]
    }));
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Opcional o Fijo",
      "contenido": [
        Select({
          "id": "fil07",
          "anchoLista": "14rem",
          "opciones": [
            {
              "valor": 0, 
              "texto": "Opcional"
            },
            {
              "valor": 1, 
              "texto": "Fijo"
            }
          ],
          "valorDefault": 0,
          "funcion": CambiarFiltros
        })
      ]
    })); 
    linea.appendChild(
      TarjetaFormulario({
        "textoEtiqueta": "Checado",
        "contenido": [
          Select({
            "id": "fil08",
            "anchoLista": "14rem",
            "opciones": [
              {
                "valor": 0, 
                "texto": "Checado"
              },
              {
                "valor": 1, 
                "texto": "No Checado"
              }
            ],
            "valorDefault": 0,
            "funcion": CambiarFiltros
          })
        ]
      }));
      linea.appendChild(
        TarjetaFormulario({
          "textoEtiqueta": "Campo Relacionado",
          "contenido": [
            CajaTexto({
              "name": "fil09",
              "size": "25",
              "required": true,
              "placeholder": "Campo Relacionado",
              "maxlength": 100,
            })
          ]
        }));
  return linea;
}