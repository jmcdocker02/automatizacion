import { CheckBox } from '../componentes/CheckBox.js';
import { Boton } from '../componentes/Boton.js';
import { ListaBotones } from "../componentes/ListaBotones.js";

export function TablaPermisos(AJson) {
    const {
        id,
        clases,
        checado,
        registros,
        titulos,
        botones,
        llave,
        tipo,
        checkBoxInicio,
        checkBoxFinal
    } = AJson;
    const $scroll = document.createElement("div");
    const $tabla = document.createElement("table");
    const $cabecera = document.createElement("thead");
    const $tbody = document.createElement("tbody");
    const $tbodyFragment = document.createDocumentFragment();
    const $trCabecera = document.createElement("tr");
    let valorCheckbox = (checado != undefined) ? checado : false;
    $scroll.className = "contenido-fijo";
    $tabla.id = (id) ? `id-${id}` : "id-Tabla";
    $tabla.className = "table table-bordered";
    Object.values(titulos).forEach(titulo => {
        const $th = document.createElement('th');
        $th.innerText = titulo;
        $th.className = "";
        if (titulo === "Incluir") {
            $th.className = "incluir";
            $th.appendChild(CheckBox({
                "nombre": "tra00",
                "valor": "tra00",
                "checado": valorCheckbox
            }));
        }
        $trCabecera.appendChild($th);
    });
    if (tipo == 1) {
        const $th = document.createElement('th');
        $th.innerText = 'Opciones';
        $trCabecera.appendChild($th);
    }
    $trCabecera.className = "textoCentro";
    $cabecera.appendChild($trCabecera);
    $tabla.appendChild($cabecera);
    registros.forEach(registro => {
        const $tr = document.createElement('tr');
        const atributos = [];
        let i = 0;
        Object.values(registro).forEach(campo => {
            const $td = document.createElement('td');
            $td.innerText = campo;
            // if(campo)$td.className=clase;
            $tr.appendChild($td);
            i++;
        });
        const $td = document.createElement("td"); // se crea con la finalidad de insertar el icono de pdf y xml de la tabla de carta porte
        $td.style.textAlign = "center";
        $td.appendChild(CheckBox({
            "nombre": "numeroTraspaso[]",
            "valor": registro.tra02,
            "checado": valorCheckbox,
            "atributo": "numeroTraspaso[]"
        }));
        $tr.appendChild($td);
        if (tipo == 1) {
            const $td = document.createElement('td');
            if (botones.length === 1) {
                botones[0]["atributos"] = atributos;
                const $boton = Boton(botones[0]);
                atributos.forEach(atributo => {
                    $boton.setAttribute(atributo.atributo, atributo.valor);
                });
                $td.appendChild($boton);
                $tr.appendChild($td);
            } else {
                const ABotones = [];
                i = 0;
                botones.forEach(boton => {
                    boton["atributos"] = atributos;
                    const $boton = Boton(boton);
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

    $tbody.appendChild($tbodyFragment);
    $tabla.appendChild($tbody);
    if (tipo === 1) {
        $scroll.appendChild($tabla);
        return $scroll;
    } else {
        return $tabla;
    }
}