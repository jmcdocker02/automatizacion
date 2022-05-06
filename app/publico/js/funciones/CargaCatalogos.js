import { Ajax } from "./Ajax.js";
import { ObtieneParametrosUrl } from "./ObtieneParametrosUrl.js";
import { ObtieneRutaOpcionMenu } from "./ObtieneRutaOpcionMenu.js";

export async function CargaCatalogos(AJson){
  const {
    idFiltroTarjeta, // Id del filtro de la tarjeta, es el div que contiene todo el filtro
    url // url que va a verificar que php o api es la que va a consultar
    } = AJson;
  let respuesta; // esta variable se crea aqui para usarla en toda la funcion
  await Ajax({
    "metodo": "GET",
    "url": url,//`?${parametro}=${idCatalogo}`, // verificar como se van a pasar los parametros siendo una funcion general
    cbSuccess: async(json) => { 
      respuesta = json.formulario; // Se asigna a respuesta el json que retorna la peticion AJAx
    }
  })
  const $filtroTarjeta = document.getElementById(idFiltroTarjeta); // se guarda en una constante el elemento filtro
  const nombreOpcionMenu = respuesta["for06"]; // se asigna a una constante el nombre del menu que va a aparecer como titulo, sera la descripcion con la que se dio del alta el fomrulario
  const nombreOpcionModulo = respuesta["men02"]; // se asigna el nombre del modulo que aparecera en la ruta
  const idFormulario = respuesta["for01"]; // id del formulario que se esta consultando 
  sessionStorage.setItem("idFormulario", idFormulario) // se guarda en el sessionStorage el formulario que se esta consultando
  sessionStorage.setItem("nombreFormulario", respuesta["for03"]); // se Guarda el nombre del formulario que se esta consultando
  const rutaOpcionMenu = ObtieneRutaOpcionMenu({ // Se asigna a la constante una ruta
      "modulo": nombreOpcionModulo.trim(),
      "menu": nombreOpcionMenu
  });

  const opcionMenu = await
  import (`${rutaOpcionMenu}`).then((module) => module); //se asigna el modulo que se va a levantar
  await opcionMenu.default(); // Se ejecuta el modulo por default

  document.getElementById("id-contenedor-filtros").appendChild($filtroTarjeta); // Se inserta el filtro lista que se obtuvo en la linea 18
}