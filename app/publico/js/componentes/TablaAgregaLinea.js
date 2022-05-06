import { Ajax } from "../funciones/Ajax.js";
import { ObtieneParametrosUrl } from "../funciones/ObtieneParametrosUrl.js";
import { ObtieneUrl } from "../funciones/ObtieneUrl.js";

export async function TablaAgregaLinea(AJson) {
    const {
        id,
        idFormulario,
        parametros,
        funcion,
        resultado,
        pagina,
        modulo
    } = AJson;
    const idContenido = (id === undefined) ? "contenido" : id;
    const $cuerpo = document.getElementById(idContenido);
    const formulario = (idFormulario) ? idFormulario : sessionStorage.getItem("idFormulario");
    const parametroPagina = (pagina) ? pagina : "formulario.php";
    const parametroModulo = (modulo) ? modulo : "general";
    let aux;
    const regresaDatos = (resultado) 
      ? true
      : false;
    await Ajax({
        "metodo": "GET",
        "url": ObtieneUrl({
            "modulo": parametroModulo,
            "pagina": parametroPagina
        }) + ObtieneParametrosUrl({"formulario":formulario, "parametrosFijos": parametros}),
        cbSuccess: async(json) => {
            if(regresaDatos){
              aux = json;
            }else {
              $cuerpo.appendChild(Tabla({"json": json, "funcion": funcion}));
              aux = json.registros;
            }
        }
    })
    return aux;
}

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

  }
  
  $tabla.appendChild($tbody);
  $scroll.appendChild($tabla);
  return $scroll;
}