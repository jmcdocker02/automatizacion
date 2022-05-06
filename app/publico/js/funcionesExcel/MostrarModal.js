import { Modal } from "../componentes/Modal.js";
import { AsignaEventos } from "../funciones/AsignaEventos.js";
import { BotonesGuardarCancelar } from "../funciones/BotonesGuardarCancelar.js";
import { TarjetaFormulario } from "../componentes/TarjetaFormulario.js";
import { CajaTexto } from "../componentes/CajaTexto.js";
import { Contenedor } from "../componentes/Contenedor.js";
import { ColocaValoresModal } from "./ColocaValoresModal.js";
import { Texto } from "../componentes/Texto.js";

export async function MostrarModal(AJson){ // Parametro id de registro que se esta generando en caso de que sea 0 o mostrando en caso de que sea diferente de 0
  const {
    idTabla,
    funcionCambiarFiltros
  } = AJson;
  // por convencion de codificacion las primeras lineas de una funcion tienen que estar declaradas todas las constantes o variables que utilizara dicha funcion
  const $formulario = document.createElement("form"); // Se crea un formulario
  const $fragmento = document.createDocumentFragment(); // Se crea un fragmento
  const $tabla = document.createElement("div");
  $tabla.style.width = "80%";
  $tabla.style.marginLeft = "1rem";
  $tabla.id = "id-tabla-actualizaExcel";
  $formulario.id = "id-formulario-captura"; // Se le asigna un id al formulario que se va a utilizar o insertar en la SPA

  $fragmento.appendChild(Contenedor({ "fragmento": PrimeraLinea() })); // Se le inserta la primera linea a un Contenedor que es un div y organizaa de manera horizontal los componentes que se van a generar para el contenido de la modal
  $fragmento.appendChild($tabla);
  
  $formulario.appendChild(Contenedor({ "fragmento": $fragmento })); // Una vez agregadas las lineas al fragmento se insertan al formulario para que este nos ayude a obtener los datos al momento de guardar

  Modal({ // Funcion modal que se encarga de mostrar la modal en la SPA
    "titulo": "Actualiza Excel", // titulo de la modal en cuestion, este parametro es necesario que se modifique
    "claseModal": "modal-xl", // Dependiendo de las necesidades de visualizacion para el usuario este campo puede ser: modal-sm|300px, none o vacio|500px, modal-lg|800px, modal-xl|1140px, solo se utiliza la palabra modal seguida del guion y su abreviacion de tamano, es decir "modal-sm"
    "contenido": $formulario, // Contenido que se va a mostrar en la modal
    "botones": BotonesGuardarCancelar( // Botones o booton que se va a mostrar en el pie de la modal, por default se usa esta funcion pero si cambia el requerimiento se puede modificar a un solo boton usando el componente boton
      [{
        "atributo": "data-id",
        "valor": idTabla,
      }]
    )
  });

  AsignaEventos({ // Funcion que va a asignar que tipo de evento se va a asignar a cada elemento, se le tiene que enviar un arreglo de objetos que contengan el id del elemento al que se le va a insertar un envento y que tipo de evento se va a insertar
    "eventos": [
      {"elemento": "id-guardar", "evento": "click"},
      {"elemento": "id-arc01", "evento": "change"},
      {"elemento": "id-cbcampo", "evento": "click"}
    ],
    "funcion": funcionCambiarFiltros
  });

  ColocaValoresModal(idTabla); // funcion que se encarga de validar cada elemento que se encuentra en el contenido de la modal.
}

function PrimeraLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Archivo a Importar",
      "contenido": [
        CajaTexto({
          "name": "arc01",
          "type": "file",
          "size": "80",
        })
      ]
    })); 
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "",
      "contenido": [
        Texto({
          "name": "imp05",
          "texto": "Linea donde inician los Datos",
          "asignado": "id-campo",
          "clase": "texto"
        }),
        CajaTexto({
          "name": "imp05",
          "size": "10",
          "required": true,
          "placeHolder": ""
        })
      ]
    })); 
  // linea.appendChild(
  //   TarjetaFormulario({
  //     "textoEtiqueta": "Importar todas las Hojas en el Archivo",
  //     "funcionCheckBox": "click",
  //     "contenido": [
  //       CajaTexto({
  //         "name": "campo",
  //         "size": "10",
  //         "required": true,
  //         "placeHolder": ""
  //       })
  //     ]
  //   })); 
  return linea;
}