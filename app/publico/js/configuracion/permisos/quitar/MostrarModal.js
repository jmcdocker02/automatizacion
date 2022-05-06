import { Modal } from "../../componentes/Modal.js";
import { AsignaEventos } from "../../funciones/AsignaEventos.js";
import { BotonesGuardarCancelar } from "../../funciones/BotonesGuardarCancelar.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { ColocaValoresModal } from "./ColocaValoresModal.js";
import { Contenedor } from "../../componentes/Contenedor.js";
import { Catalogo } from "../../componentes/Catalogo.js";
import { ObtieneDatosCatalogo } from "../../funciones/ObtieneDatosCatalogo.js";
import { TablaPermisos } from "./tablaPermisos.js";

export async function MostrarModal(AIdTabla){ // Parametro id de registro que se esta generando en caso de que sea 0 o mostrando en caso de que sea diferente de 0
  // por convencion de codificacion las primeras lineas de una funcion tienen que estar declaradas todas las constantes o variables que utilizara dicha funcion
  const $formulario = document.createElement("form"); // Se crea un formulario
  const $fragmento = document.createDocumentFragment(); // Se crea un fragmento
  $formulario.id = "id-formulario-captura"; // Se le asigna un id al formulario que se va a utilizar o insertar en la SPA

  $fragmento.appendChild(Contenedor({ "fragmento": await PrimeraLinea() })); // Se le inserta la primera linea a un Contenedor que es un div y organizaa de manera horizontal los componentes que se van a generar para el contenido de la modal
  
  $formulario.appendChild(Contenedor({ "fragmento": $fragmento })); // Una vez agregadas las lineas al fragmento se insertan al formulario para que este nos ayude a obtener los datos al momento de guardar

  Modal({ // Funcion modal que se encarga de mostrar la modal en la SPA
    "titulo": "Agregar Permiso", // titulo de la modal en cuestion, este parametro es necesario que se modifique
    "claseModal": "modal-xl", // Dependiendo de las necesidades de visualizacion para el usuario este campo puede ser: modal-sm|300px, none o vacio|500px, modal-lg|800px, modal-xl|1140px, solo se utiliza la palabra modal seguida del guion y su abreviacion de tamano, es decir "modal-sm"
    "contenido": $formulario, // Contenido que se va a mostrar en la modal
    "botones": BotonesGuardarCancelar( // Botones o booton que se va a mostrar en el pie de la modal, por default se usa esta funcion pero si cambia el requerimiento se puede modificar a un solo boton usando el componente boton
      [{
        "atributo": "data-id",
        "valor": AIdTabla,
      }]
    )
  });

  AsignaEventos({ // Funcion que va a asignar que tipo de evento se va a asignar a cada elemento, se le tiene que enviar un arreglo de objetos que contengan el id del elemento al que se le va a insertar un envento y que tipo de evento se va a insertar
    "eventos": [
      {"elemento": "id-per01", "evento": "click"},
      {"elemento": "id-per02", "evento": "click"}
    ],
    "funcion": CambiarFiltros
  });

  ColocaValoresModal(AIdTabla); // funcion que se encarga de validar cada elemento que se encuentra en el contenido de la modal.
}


async function PrimeraLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(await Catalogo({
    "fijo": "true",
    "textoEtiqueta": "Empresa",
    "FuncionEvento": CambiarFiltros,
    "datos": await ObtieneDatosCatalogo(5),
    "id": "per01",
    "anchoLista": "30rem"    
  }));
  linea.appendChild(await Catalogo({
    "fijo": "true",
    "textoEtiqueta": "Menus",
    "FuncionEvento": CambiarFiltros,
    "datos": await ObtieneDatosCatalogo(16),
    "id": "per02",
    "anchoLista": "20rem"    
  }));
  return linea;
}