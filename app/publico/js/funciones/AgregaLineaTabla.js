import { Boton } from "../componentes/Boton.js";
import { CamelCase } from "./CamelCase.js";

export function AgregaLineaTabla(AJson){
  const {
    camposMostrarTabla,
    camposAlmacenarAtributo,
    camposLimpiar,
    idTabla,
    funcionClick
  } = AJson;

  const $tbody = document.getElementById(idTabla);
  const $tr = document.createElement('tr');
  let i = 0;
  let datos = [];
  let detalle = [];
  Object.keys(camposMostrarTabla).forEach( llave => {
      datos[i] = camposMostrarTabla[llave];
    i++;
  });
  i=0;
  Object.keys(camposAlmacenarAtributo).forEach( campo => {
      detalle[i] = `${camposAlmacenarAtributo[campo]}`;
      i++;
  })
  if($tbody.getElementsByTagName("p"));
  datos.forEach(columna => {
    $tr.appendChild(AgregaColumna(columna));
  });  
  $tr.appendChild(AgregaBoton({
    "detalle": detalle,
    "funcionClick": funcionClick
  }));

  if ($tbody.getElementsByTagName("p").length > 0) $tbody.getElementsByTagName("p")[0].innerHTML = null
  if(camposLimpiar){
    if(ValidaCampos(camposLimpiar)){
      $tbody.appendChild($tr);
      LimpiaCampos(camposLimpiar);
    }
  }else {
    $tbody.appendChild($tr);
  }
}

function AgregaColumna(valor) {
  const $td = document.createElement('td');
  $td.innerText = valor;
  return $td;
}

function AgregaBoton(AJson) {
  const {
    detalle,
    funcionClick
  } = AJson;
  const $td = document.createElement('td');
  $td.appendChild(Boton({
      "name": "eliminarLinea",
      "texto": `<i class="fas fa-trash"></i> Eliminar`,
      "atributos": [{
          "atributo": "data-linea",
          "valor": detalle
      }],
      "funcionClick": funcionClick
  }));
  return $td;
}

function ValidaCampos(ACampos){
  let resultado = true;
  ACampos.forEach(campo =>{
    const idCampo = CamelCase(campo);
    document.getElementById(`id-${idCampo}-tarjeta-cabecera`).classList.remove("grupoFormularioError");
    if(document.getElementById(`id-${campo}`).value === ""){
      document.getElementById(`id-${idCampo}-tarjeta-cabecera`).classList.add("grupoFormularioError");
      resultado = false;
    }
  })
  return resultado;
}

function LimpiaCampos(ACampos){
  ACampos.forEach(campo => {
    document.getElementById(`id-${campo}`).value = "";
  })
}