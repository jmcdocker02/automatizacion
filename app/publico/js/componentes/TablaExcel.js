import { CajaTexto } from './CajaTexto.js';

export function TablaExcel(AJson) {
    const {
      clases,
      json,
      funcion
    } = AJson;
    const titulos = json.titulos;
    const formulario = json.formulario;
    const $scroll = document.createElement("div");
    const $tabla = document.createElement("table");
    const $cabecera = document.createElement("thead");
    const $tbody = document.createElement("tbody");
    const $trCabecera = document.createElement("tr");
    $scroll.className = "contenido-fijo";
    $tabla.id = (formulario.for06) ? `id-tabla${formulario.for06}` : "id-Tabla";
    $tbody.id = (formulario.for06) ? `id-tabla${formulario.for06}-body` : "id-Tabla-body";
    $tabla.className = "table table-bordered";
    Object.values(titulos).forEach(titulo => {
        const $th = document.createElement('th');
        $th.innerText = titulo.col04; //Texto a mostrar
        $th.name = titulo.col03; //campo de la tabla de la BD
        $th.id = titulo.col02; //numero de columna
        $th.className = `alinea-centrado`;
        $th.style.width = `${titulo.col06}rem`
        $trCabecera.appendChild($th);
    });
    $trCabecera.className = "textoCentro";
    $cabecera.appendChild($trCabecera);
    $tabla.appendChild($cabecera);
    if (json.registros.error != undefined) {
      const $p = document.createElement("p");
      $p.innerText = json.registros.error;
      $tbody.appendChild($p);
    } else if(json.registros[0].error != undefined){
      const $p = document.createElement("p");
      $p.innerText = json.registros[0].error;
      $tbody.appendChild($p);
    } else {
      json["funcion"] = funcion;
      $tbody.appendChild(ObtieneRenglones(json));
    }
    
    $tabla.appendChild($tbody);
    $scroll.appendChild($tabla);
    return $scroll;
}

function ObtieneRenglones(AJson){
  const $tbodyFragment = document.createDocumentFragment();
  const {formulario, registros, titulos, funcion} = AJson
  registros.forEach(registro => {
    const $tr = document.createElement('tr');
    const atributos = [];
    for (let j = 1; j <= formulario.for09; ++j) {
        let elemento = formulario.for10 + "0" + j;
        atributos[j] = { "atributo": `data-${elemento}`, "valor": registro[elemento] };
    }
    let n = 0;
    Object.values(titulos).forEach(columna => {
        const $td = document.createElement('td');
        let clase = "";
        if(n === titulos.length-1){
            $td.appendChild(CajaTexto({
                "name": `dim${("0"+registro.dim02).slice(-2)}`,
                "value": registro[`${columna.col03}`],
                "tamanio": "100%",
                "clases": "alinea-centrado"
            }))
        } else {
            $td.innerText = registro[`${columna.col03}`];
        }

        if (columna) $td.className = columna;
        switch (columna.col05) {
            case "0":
                clase = "alinea-izquierda";
                break;
            case "1":
                clase = "alinea-centrado";
                break;
            case "2":
                clase = "alinea-derecha";
                break;
        }
        $td.className = clase;
        $tr.appendChild($td);
        n++;
    });
    $tbodyFragment.appendChild($tr);
  });
  return $tbodyFragment;
}