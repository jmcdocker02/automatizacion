import { Modal } from "../../../componentes/Modal.js";
import { AsignaEventos } from "../../../funciones/AsignaEventos.js";
import { BotonesGuardarCancelar } from "../../../funciones/BotonesGuardarCancelar.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { TarjetaFormulario } from "../../../componentes/TarjetaFormulario.js";
import { CajaTexto } from "../../../componentes/CajaTexto.js";
import { ColocaValoresModal } from "./ColocaValoresModal.js";
import { Contenedor } from "../../../componentes/Contenedor.js";
import { Catalogo } from "../../../componentes/Catalogo.js";
import { ObtieneDatosCatalogo } from "../../../funciones/ObtieneDatosCatalogo.js";
import { Select } from "../../../componentes/Select.js";
import { ListaDesplegable } from "../../../componentes/ListaDesplegable.js";

export async function MostrarModal(AIdTabla) {
    const $formulario = document.createElement("form");
    const $fragmento = document.createDocumentFragment();
    const $div = document.createElement("div");
    $formulario.id = "id-formulario-captura";
    $fragmento.appendChild(Contenedor({ "fragmento": await PrimeraLinea() }));
    $fragmento.appendChild(Contenedor({ "fragmento": SegundaLinea() }));
    $formulario.appendChild(Contenedor({ "fragmento": $fragmento }));
    $div.className = "centrar";
    $div.innerHTML = 'Ejemplo de Atributos: {"0":{"elemento":"data-id","valor":10},"1":{"elemento":"data-otro","valor":0}}';
    $formulario.appendChild($div);
    Modal({
        "titulo": "Agregar accion",
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
            { "elemento": "id-guardar", "evento": "click" }
        ],
        "funcion": CambiarFiltros
    });

    ColocaValoresModal(AIdTabla);

}

async function PrimeraLinea() {
    const linea = document.createDocumentFragment();
    linea.appendChild(
        TarjetaFormulario({
            "textoEtiqueta": "Titulo a Mostrar",
            "contenido": [
                CajaTexto({
                    "name": "acc03",
                    "size": "30",
                    "required": true,
                    "placeholder": "Titulo a Mostrar",
                    "maxlength": 100,
                })
            ]
        }));
    linea.appendChild(
        TarjetaFormulario({
            "textoEtiqueta": "Funcion que realiza",
            "contenido": [
                CajaTexto({
                    "name": "acc04",
                    "size": "30",
                    "required": true,
                    "placeholder": "Funcion que realiza",
                    "maxlength": 100,
                })
            ]
        }));
    linea.appendChild(
    //   await Catalogo({
    //     "id": "acc05",
    //     "fijo": "1",
    //     "textoEtiqueta": "Seleccione el Icono",
    //     "checado": "0",
    //     "datos": await ObtieneDatosCatalogo(9),
    //     "FuncionEvento": CambiarFiltros
    //   })
        TarjetaFormulario({
            "textoEtiqueta": "Seeccione el Icono",
            "contenido": [
            await ListaDesplegable({
                "id": "acc05",
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
            "textoEtiqueta": "Tipo de Accion",
            "contenido": [
              Select({
                "id": "acc06",
                "anchoLista": "16.5rem",
                "opciones": [
                  {
                    "valor": 0, 
                    "texto": "Informativo"
                  },
                  {
                    "valor": 1, 
                    "texto": "General"
                  },
                  {
                    "valor": 2, 
                    "texto": "Registro"
                  }
                ],
                "valorDefault": 1,
                "funcion": CambiarFiltros
              })
            ]
        }));
    linea.appendChild(
        TarjetaFormulario({
            "textoEtiqueta": "Clase CSS",
            "contenido": [
                CajaTexto({
                    "name": "acc07",
                    "size": "30",
                    "required": true,
                    "placeholder": "Clase CSS",
                    "maxlength": 100,
                })
            ]
        }));
    linea.appendChild(
        TarjetaFormulario({
            "textoEtiqueta": `Atributos Adicionales`,
            "contenido": [
                CajaTexto({
                    "name": "acc08",
                    "size": "38",
                    "required": true,
                    "placeholder": "Metodo a Ejecutar en OnClick",
                    "maxlength": 100,
                })
            ]
        }));
    return linea;

}