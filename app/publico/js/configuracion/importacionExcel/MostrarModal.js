import { Modal } from "../../componentes/Modal.js";
import { AsignaEventos } from "../../funciones/AsignaEventos.js";
import { BotonesGuardarCancelar } from "../../funciones/BotonesGuardarCancelar.js";
import { CambiarFiltros } from "./CambiarFiltros.js";
import { TarjetaFormulario } from "../../componentes/TarjetaFormulario.js";
import { CajaTexto } from "../../componentes/CajaTexto.js";
import { ColocaValoresModal } from "./ColocaValoresModal.js";
import { Contenedor } from "../../componentes/Contenedor.js";
import { Select } from "../../componentes/Select.js";
import { Boton } from "../../componentes/Boton.js";

export async function MostrarModal(AIdTabla){ // Parametro id de registro que se esta generando en caso de que sea 0 o mostrando en caso de que sea diferente de 0
  // por convencion de codificacion las primeras lineas de una funcion tienen que estar declaradas todas las constantes o variables que utilizara dicha funcion
  const $formulario = document.createElement("form"); // Se crea un formulario
  const $fragmento = document.createDocumentFragment(); // Se crea un fragmento
  const $tabla = document.createElement("div");
  $tabla.style.width = "80%";
  $tabla.style.marginLeft = "1rem";
  // $tabla.innerHTML = ObtieneTabla();
  $formulario.id = "id-formulario-captura"; // Se le asigna un id al formulario que se va a utilizar o insertar en la SPA

  $fragmento.appendChild(Contenedor({ "fragmento": PrimeraLinea() })); // Se le inserta la primera linea a un Contenedor que es un div y organizaa de manera horizontal los componentes que se van a generar para el contenido de la modal
  $fragmento.appendChild(Contenedor({ "fragmento": SegundaLinea() }));
  $fragmento.appendChild(Contenedor({ "fragmento": TerceraLinea() }));
  $fragmento.appendChild(Contenedor({ "fragmento": CuartaLinea() }));
  // $fragmento.appendChild($tabla);
  
  $formulario.appendChild(Contenedor({ "fragmento": $fragmento })); // Una vez agregadas las lineas al fragmento se insertan al formulario para que este nos ayude a obtener los datos al momento de guardar

  Modal({ // Funcion modal que se encarga de mostrar la modal en la SPA
    "titulo": "Agregar Titulo de la Modal", // titulo de la modal en cuestion, este parametro es necesario que se modifique
    "claseModal": "modal-xl", // Dependiendo de las necesidades de visualizacion para el usuario este campo puede ser: modal-sm|300px, none o vacio|500px, modal-lg|800px, modal-xl|1140px, solo se utiliza la palabra modal seguida del guion y su abreviacion de tamano, es decir "modal-sm"
    "contenido": $formulario, // Contenido que se va a mostrar en la modal
    "botones": BotonesGuardarCancelar( // Botones o booton que se va a mostrar en el pie de la modal, por default se usa esta funcion pero si cambia el requerimiento se puede modificar a un solo boton usando el componente boton
      [{
        "atributo": "data-id",
        "valor": AIdTabla,
      }]
    )
  });

  document.getElementById("id-Imp06-tarjeta-cabecera").classList.add("ocultar");
  document.getElementById("id-imp06").classList.add("ocultar");
  document.getElementById("id-imp06").value = "";

  AsignaEventos({ // Funcion que va a asignar que tipo de evento se va a asignar a cada elemento, se le tiene que enviar un arreglo de objetos que contengan el id del elemento al que se le va a insertar un envento y que tipo de evento se va a insertar
    "eventos": [
      {"elemento": "id-guardar", "evento": "click"},
      {"elemento": "id-imp04", "evento": "change"},
      {"elemento": "id-agregarLinea", "evento": "click"},
      {"elemento": "id-Eliminar", "evento": "click"}
    ],
    "funcion": CambiarFiltros
  });

  ColocaValoresModal(AIdTabla); // funcion que se encarga de validar cada elemento que se encuentra en el contenido de la modal.
}

function ObtieneTabla() {
  return `
 <table id="id-tabla-campos" class="table table-bordered">
 <thead>
  <tr>
   <th>Campo</th>
   <th>Descripcion</th>
   <th>Valor</th>
   <th id="id-opciones-columna">Opciones</th>
  </tr>
  </thead>
  <tbody id="id-cuerpo-tabla"></tbody>
 </table>
`
}

function PrimeraLinea() {
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Nombre de la importacion ",
      "contenido": [
        CajaTexto({
          "name": "imp03",
          "size": "40",
          "required": true,
          "placeholder": "Nombre de la importacion",
          "maxlength": 100,
        })
      ]
    }));
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Tipo de Importacion",
      "contenido": [
        Select({
          "id": "imp04",
          "anchoLista": "14rem",
          "opciones": [
            {
              "valor": 0, 
              "texto": "Insercion"
            },
            {
              "valor": 1, 
              "texto": "Actualizacion"
            },
            {
              "valor": 2,
              "texto": "Procedimiento"
            }
          ],
          "valorDefault": 0,
          "funcion": CambiarFiltros
        })
      ]
    }));
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Linea Inician los Datos",
      "contenido": [
        CajaTexto({
          "name": "imp05",
          "size": "20",
          "required": true,
          "placeholder": "Donde empiezan los Datos",
          "maxlength": 100,
        })
      ]
    }));  
    linea.appendChild(
      TarjetaFormulario({
        "textoEtiqueta": "Texto Boton",
        "contenido": [
          CajaTexto({
            "name": "imp09",
            "size": "20",
            "required": true,
            "placeholder": "Texto a mostrar en el boton",
            "maxlength": 50
          })
        ]
      }));
  return linea;
}

function SegundaLinea(){
  const linea = document.createDocumentFragment();
  linea.appendChild(
    TarjetaFormulario({
      "textoEtiqueta": "Nombre del Procedimiento Almacenado",
      "contenido": [
        CajaTexto({
          "name": "imp06",
          "size": "40",
          "placeholder": "Nombre del Procedimiento Almacenado",
          "maxlength": 100,
        })
      ]
    })); 
  return linea;
}

function TerceraLinea(){
  const $linea = document.createDocumentFragment();
  $linea.appendChild(TarjetaFormulario({
      "textoEtiqueta": "Campo",
      "contenido": [
          CajaTexto({
              "name": "campo",
              "placeholder": "Campo",
              "required": true,
              "size": "30",
              "type": "number",
              "tamanio": "10rem"
          })
      ]
  }));
  $linea.appendChild(TarjetaFormulario({
    "textoEtiqueta": "Descripcion",
    "contenido": [
        CajaTexto({
            "name": "descripcion",
            "placeholder": "Descripcion",
            "required": true,
            "size": "30",
            "tamanio": "20rem"
        })
    ]
}));
$linea.appendChild(TarjetaFormulario({
  "textoEtiqueta": "Valor",
  "contenido": [
      CajaTexto({
          "name": "valor",
          "placeholder": "Valor",
          "required": true,
          "size": "30",
          "tamanio": "10rem"
      })
  ]
}));

  $linea.appendChild(Boton({
      "name": "agregarLinea",
      "texto": `<i class="far fa-plus-square"></i>`
  }));
  return $linea;
}

function CuartaLinea(){
  const linea = document.createDocumentFragment();
  const $div = document.createElement("div");
  $div.id = "id-tabla-registros";
  linea.appendChild($div);
  return linea;
}