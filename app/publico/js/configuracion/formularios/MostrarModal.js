import { Modal } from "../../componentes/Modal.js";
import { AsignaEventos } from "../../funciones/AsignaEventos.js";
import { BotonesGuardarCancelar } from "../../funciones/BotonesGuardarCancelar.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { TarjetaFormulario } from "../../componentes/TarjetaFormulario.js";
import { CajaTexto } from "../../componentes/CajaTexto.js";
import { ColocaValoresModal } from "./ColocaValoresModal.js";
import { Contenedor } from "../../componentes/Contenedor.js";
import { Catalogo } from "../../componentes/Catalogo.js";
import { ObtieneDatosCatalogo } from "../../funciones/ObtieneDatosCatalogo.js";
import { ListaDesplegable } from "../../componentes/ListaDesplegable.js";

export async function MostrarModal(AIdTabla){
  const $formulario = document.createElement("form");
  const $fragmento = document.createDocumentFragment();
  $formulario.id = "id-formulario-captura"; 

  $fragmento.appendChild(Contenedor({ "fragmento": await PrimeraLinea() }));
  $fragmento.appendChild(Contenedor({ "fragmento": SegundaLinea() }));
  $fragmento.appendChild(Contenedor({ "fragmento": TerceraLinea() }));
  $fragmento.appendChild(Contenedor({ "fragmento": CuartaLinea() }));
  
  $formulario.appendChild(Contenedor({ "fragmento": $fragmento }));

  Modal({
    "titulo": "Agregar Formulario",
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
      {"elemento": "id-for06", "evento": "keyup"}
    ],
    "funcion": CambiarFiltros
  });

  ColocaValoresModal({
    "id": AIdTabla
  });
}


async function PrimeraLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Descripcion de la funcion que realiza",
      "contenido": [
        CajaTexto({
          "name": "for03",
          "size": "35",
          "required": true,
          "placeholder": "Descripcion de la funcion que realiza",
          "maxlength": 100,
        })
      ]
    }));
    linea.appendChild(
      TarjetaFormulario({
        "textoEtiqueta": "Nombre que Aparece en el menu",
        "contenido": [
          CajaTexto({
            "name": "for04",
            "size": "35",
            "required": true,
            "placeholder": "Nombre que Aparece en el menu",
            "maxlength": 100,
          })
        ]
      }));
    linea.appendChild(
      // await Catalogo({
      //   "id": "for05",
      //   "fijo": "1",
      //   "textoEtiqueta": "Seleccione el Icono",
      //   "checado": "0",
      //   "datos": await ObtieneDatosCatalogo(9),
      //   "FuncionEvento": CambiarFiltros
      // })
      TarjetaFormulario({
        "textoEtiqueta": "Nombre que Aparece en el menu",
        "contenido": [
          await ListaDesplegable({
            "id": "for05",
            "clase": "fa",
            "anchoLista": "19.5rem",
            "datos": await ObtieneDatosCatalogo(9)
          })
        ]
      })
    );
  return linea;
}

function SegundaLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Nombre de la tabla",
      "contenido": [
        CajaTexto({
          "name": "for06",
          "size": "35",
          "required": true,
          "placeholder": "Nombre de la tabla",
          "maxlength": 100,
        })
      ]
    }));
    linea.appendChild(
      TarjetaFormulario({
        "textoEtiqueta": "Nombre de la vista",
        "contenido": [
          CajaTexto({
            "name": "for07",
            "size": "35",
            "required": true,
            "placeholder": "Nombre de la vista",
            "maxlength": 100,
          })
        ]
      }));
    linea.appendChild(
      TarjetaFormulario({
        "textoEtiqueta": "Numero de campos de la tabla",
        "contenido": [
          CajaTexto({
            "name": "for08",
            "size": "35",
            "required": true,
            "placeholder": "Numero de campos de la tabla",
            "maxlength": 100,
          })
        ]
      })); 
  return linea;
}

function TerceraLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Numero de campos de la llave",
      "contenido": [
        CajaTexto({
          "name": "for09",
          "size": "35",
          "required": true,
          "placeholder": "Numero de campos de la llave",
          "maxlength": 100,
        })
      ]
    }));
    linea.appendChild(
      TarjetaFormulario({
        "textoEtiqueta": "Prefijo",
        "contenido": [
          CajaTexto({
            "name": "for10",
            "size": "35",
            "required": true,
            "placeholder": "Prefijo",
            "maxlength": 3,
          })
        ]
      }));
      linea.appendChild(
        TarjetaFormulario({
          "textoEtiqueta": "Campo Llave",
          "contenido": [
            CajaTexto({
              "name": "for11",
              "size": "35",
              "required": true,
              "placeholder": "Campo Llave",
              "maxlength": 5,
            })
          ]
        }));
  return linea;
}

function CuartaLinea(){
  const linea = document.createDocumentFragment();
    linea.appendChild(
      TarjetaFormulario({
        "textoEtiqueta": "Campo Descripcion",
        "contenido": [
          CajaTexto({
            "name": "for12",
            "size": "35",
            "required": true,
            "placeholder": "Campo Descripcion",
            "maxlength": 5,
          })
        ]
      }));
    linea.appendChild(
      TarjetaFormulario({
        "textoEtiqueta": "Campo Id Empresa",
        "contenido": [
          CajaTexto({
            "name": "for13",
            "size": "35",
            "required": true,
            "placeholder": "Campo Id Empresa",
            "maxlength": 5,
          })
        ]
      }));
  return linea;
}