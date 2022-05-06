import { Boton } from './Boton.js';
import { ListaBotones } from "./ListaBotones.js";

export function Tabla(AJson) {
    const {
      clases,
      json,
      funcion
    } = AJson;
    const titulos = json.titulos;
    const botones = json.botones;
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
    if (botones != undefined) {
      const $th = document.createElement('th');
      $th.innerText = 'Opciones';
      $trCabecera.appendChild($th);
    }
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
  const {formulario, registros, botones, titulos, funcion} = AJson
  registros.forEach(registro => {
    const $tr = document.createElement('tr');
    const atributos = [];
    let i = 0;
    for (let j = 1; j <= formulario.for09; ++j) {
        let elemento = formulario.for10 + "0" + j;
        atributos[j] = { "atributo": `data-${elemento}`, "valor": registro[elemento] };
    }
    Object.values(titulos).forEach(columna => {
        const $td = document.createElement('td');
        let clase = "";
        const icono = (registro[`${columna.col03}`].length>3)?registro[`${columna.col03}`].slice(0,3) === "&#x":false;
        // $td.innerText = registro[i]; //se modifica para que solo se muestren los elementos que hay en las columnas
        if(icono){
            $td.innerHTML = registro[`${columna.col03}`];
            clase += "fa "
        }else{
            $td.innerText = registro[`${columna.col03}`];
        }
        if (columna) $td.className = columna;
        switch (columna.col05) {
            case "0":
                clase += "alinea-izquierda";
                break;
            case "1":
                clase += "alinea-centrado";
                break;
            case "2":
                clase += "alinea-derecha";
                break;
        }
        $td.className = clase;
        $tr.appendChild($td);
        i++;
    });
    if (botones != undefined) {
        const $td = document.createElement('td');

        if (botones.length === 1) {
            if (botones[0].acc08 === "") {

            } else {
                const ocultaModal = JSON.parse(botones[0].acc08);
                Object.keys(ocultaModal).forEach(elemento => {
                    atributos[atributos.length + 1] = { "atributo": ocultaModal[elemento].atributo, "valor": ocultaModal[elemento].valor }
                })
            }
            const $boton = Boton({
                "name": botones[0].acc03,
                "texto": botones[0].ico02 + " " + botones[0].acc03,
                "atributos": atributos,
                "funcionClick": funcion
            });
            atributos.forEach(atributo => {
                $boton.setAttribute(atributo.atributo, atributo.valor);
            });
            $td.appendChild($boton);
            $tr.appendChild($td);
        } else {
            const ABotones = [];
            i = 0;
            botones.forEach(boton => {
                if (boton.acc08 != "") {
                    const ocultaModal = JSON.parse(boton.acc08);
                    Object.values(ocultaModal).forEach(elemento => {
                        atributos[atributos.length + 1] = { "atributo": elemento.elemento, "valor": elemento.valor };
                    });
                }
                boton["atributos"] = atributos;
                const $boton = Boton({
                    "name": boton.acc03,
                    "texto": boton.ico02 + " " + boton.acc03,
                    "clases": "dropdown-item",
                    "atributos": atributos,
                    "funcionClick": funcion
                })
                ABotones[i] = $boton;
                i++;
            });
            $td.appendChild(ListaBotones({
                textoBoton: "Opciones",
                claseMargen: "margenTabla",
                contenido: ABotones
            }));
            $tr.appendChild($td);
        }
    }
    $tbodyFragment.appendChild($tr);
  });
  return $tbodyFragment;
}