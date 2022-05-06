import { ObtieneRegistro } from "../../funciones/ObtieneRegistro.js";
import { Hidden } from "../../componentes/Hidden.js";
import { TablaAgregaLinea } from "../../componentes/TablaAgregaLinea.js";
import { AgregaLineaTabla } from "../../funciones/AgregaLineaTabla.js";
import { CambiarFiltros } from "./CambiarFiltros.js";

export async function ColocaValoresModal(AIdTabla) { // funcion que recibe como uico parametro el id del registro que se va a levantar, si es 0 el id es un registro nuevo por lo tanto se muestran los campos de la modal vacios, si el id es diferente de 0 se hace una consulta para obtener el registro y se poblan los componentes de la modal con esa informacion
  const $formulario = document.getElementById("id-formulario-captura");
  $formulario.appendChild(Hidden({
    "name": "imp01",
    "valor": AIdTabla
  }));
  $formulario.appendChild(Hidden({
    "name": "imp02",
    "valor": document.getElementById("id-formularios").value
  }))
  $formulario.appendChild(Hidden({
    "name": "imp07",
    "valor": 0
  }))
  $formulario.appendChild(Hidden({
    "name": "imp08",
    "valor": 0
  }))
  $formulario.appendChild(Hidden({
    "name": "campos",
    "valor": ""
  }))
  if (AIdTabla === 0) { // Condicion que valida si es un registro nuevo
    document.getElementById("id-imp03").value = "";
    document.getElementById("id-imp05").value = "";
    document.getElementById("id-imp06").value = "";
    document.getElementById("id-imp09").value = "Importar";
  } else {
    const valores = await ObtieneRegistro({
      "idFormulario": sessionStorage.getItem("idFormulario"),
      "idTabla": AIdTabla
    }); // Aqui dependiendo del id del registro se van a obtener los datos y se van a guardar en valores como un objeto.
    document.getElementById("modal-principal-titulo").innerHTML = null; // Por default se va a utilizar la modal principal para poblar los datos de un modulo comun por lo tanto se selecciona el titulo de la modal principal
    document.getElementById("modal-principal-titulo").innerHTML = "Modificar Importacion de Excel"; // Aqui se debe insertar el titulo que va a aparecer en la modal
    // Aqui se poblan los elementos del cuerpo de la modal con los valores que trae la constante valores.
    document.getElementById(`id-imp01`).value = valores.imp01; 
    document.getElementById("id-imp02").value = valores.imp02;
    document.getElementById("id-imp03").value = valores.imp03;
    document.getElementById("id-imp04").value = valores.imp04;
    document.getElementById("id-imp05").value = valores.imp05;
    document.getElementById("id-imp06").value = valores.imp06;
    document.getElementById("id-imp09").value = valores.imp09;
  }
  const json = await TablaAgregaLinea({
    "id": "id-tabla-registros",
    "idFormulario": 32,
    "parametros": {"dim01": AIdTabla}
  });
  json.forEach(registro => {
    AgregaLineaTabla({
      "camposMostrarTabla": {
        "campo": registro["dim02"],
        "descripcion": registro["dim03"],
        "valor": registro["dim05"]
      },
      "camposAlmacenarAtributo": {
        "campo": registro["dim02"],
        "descripcion": registro["dim03"],
        "valor": registro["dim05"]
      },
      "idTabla": "id-tabladimportacionexcel-body",
      "funcionClick": CambiarFiltros
    });
  });
}