import { Boton } from "../componentes/Boton.js"
import { ListaBotones } from "../componentes/ListaBotones.js";

export async function ObtieneFiltrosBotones(AJson){
  const {
    botones,
    funcionEvento
  } = AJson;
  let atributos = [];
  let respuesta;
  if(botones.length === 1){
    if(botones[0].acc08 !=""){
      const atributosBoton = JSON.parse(botones[0].acc08);
      Object.keys(atributosBoton).forEach(elemento => {
        atributos[atributos.length + 1] = { 
          "atributo": atributosBoton[elemento].atributo, 
          "valor": atributosBoton[elemento].valor 
        }
      })
    }
    respuesta = Boton({
      "name": botones[0].acc03,
      "texto": botones[0].ico02+" "+botones[0].acc03,
      "atributos": atributos,
      "funcionClick": funcionEvento
    });
  } else {
    const ABotones = [];
    let i = 0;
    botones.forEach(boton => {
        if (boton.acc08 != "") {
            const ocultaModal = JSON.parse(boton.acc08);
            Object.values(ocultaModal).forEach(elemento => {
                atributos[atributos.length + 1] = { "atributo": elemento.atributo, "valor": elemento.valor };
            });
        }
        boton["atributos"] = atributos;
        const $boton = Boton({
            "name": boton.acc03,
            "texto": boton.ico02 + " " + boton.acc03,
            "clases": "dropdown-item",
            "atributos": atributos,
            "funcionClick": funcionEvento
        })
        ABotones[i] = $boton;
        i++;
    });
    respuesta = ListaBotones({
      "nombre": "opciones",
      "textoBoton": "Seleccione",
      "funcionEvento": funcionEvento,
      "contenido": ABotones
    })
  }
  return respuesta;
}