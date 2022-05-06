import { CheckBox } from "./CheckBox.js";
import { Tarjeta } from "./Tarjeta.js";
import { ListaDesplegable } from "./ListaDesplegable.js";
import { CamelCase } from "../funciones/CamelCase.js";
import { Boton } from "./Boton.js";

export async function Catalogo(AJson) {
    const {
        valorDefault,
        fijo,
        textoEtiqueta,
        checado,
        FuncionEvento,
        datos,
        id,
        mantenimiento,
        anchoLista
    } = AJson;
    const valorChecado = checado === undefined ? false : checado;
    const filtroFijo = fijo === undefined ? false : fijo;
    const $cabecera = document.createDocumentFragment();
    const idLista = (id) ? id : datos["for06"];
    if (filtroFijo == false) {
        $cabecera.appendChild(CheckBox({
            "nombre": `cbFiltro${CamelCase(idLista)}`,
            "valor": "on",
            "evento": FuncionEvento,
            "checado": valorChecado
        }));
    }
    const clase = (filtroFijo) ? "" : (valorChecado) ? "" : "ocultar";
    const $etiqueta = document.createElement("label");
    const valores = {
        "valorDefault": valorDefault,
        "id": idLista,
        "datos": datos
    }
    if (anchoLista) valores["anchoLista"] = anchoLista;
    $etiqueta.innerText = textoEtiqueta;
    $etiqueta.className = "margenDerecha05";
    $cabecera.appendChild($etiqueta);
    let $boton = document.createElement("hidden"); //se inserta por el arreglo de la linea 73
    if (mantenimiento != undefined) {
        // const atributos = (mantenimiento.atributos) ? mantenimiento.atributos : "";
        const idFormularioCatalogo = mantenimiento;
        $boton = Boton({
          "name": `boton-${idLista}`,
          "texto": '<i class="fas fa-tools"></i>',
          "atributos": [
          {
            "atributo": "data-id",
            "valor": idFormularioCatalogo
          }
        ],
          "funcionClick": FuncionEvento
        });
        valores["clase"] = "margen";
    }

    const $contenido = (valores["datos"].error) 
      ? ObtieneListaVacia({"datos":valores["datos"],"anchoLista":anchoLista, "tabla": datos["for06"],idLista}) 
      : await ListaDesplegable(valores);
    $contenido.removeEventListener("change", FuncionEvento);
    $contenido.addEventListener("change", FuncionEvento);
    const $filtroCatalogo = Tarjeta({
        "id": `id-${CamelCase(idLista)}-tarjeta`,
        "clase": "margen",
        "claseCuerpo": clase,
        "claseCabecera": "alineaElementosCabeceraTarjeta",
        "titulo": $cabecera,
        "contenido": [$contenido, $boton]
    });
    return $filtroCatalogo;
}

function ObtieneListaVacia(AJson){
  const {
    idLista,
    tabla,
    anchoLista,
    datos
  } = AJson;
  const $lista = document.createElement("select");
  const $opcion = document.createElement("option");
  $opcion.id = `id-${tabla}`;
  $opcion.innerText = datos.error;
  $lista.style.width = anchoLista;
  $lista.id = `id-${idLista}`;
  $lista.appendChild($opcion)
  return $lista;
}