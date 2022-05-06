import { CheckBox } from '../../componentes/CheckBox.js';
import { Boton } from '../../componentes/Boton.js';
import { ListaBotones } from "../../componentes/ListaBotones.js";

export function TablaPermisos(AJson) {
    const {
        id,
        clases,
        checado,
        registros,
        titulos,
        botones,
        llave,
        tipo
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
    titulos.forEach(titulo => {
        const $th = document.createElement('th');
        $th.innerText = titulo["col04"];
        $th.className = "";
        if (titulo["col04"] === "Acceso") {
            $th.className = "incluir";
         }
        $trCabecera.appendChild($th);
    });
    $trCabecera.className = "textoCentro";
    $cabecera.appendChild($trCabecera);
    $tabla.appendChild($cabecera);
    if(Array.isArray(registros)){
    registros.forEach(registro => {
        const $tr = document.createElement('tr');
        const atributos = [];
        let i = 0;
        Object.values(registro).forEach(campo => {
          if(i<2){  
            const $td = document.createElement('td');
            if(i === 0){
             $td.style.textAlign = "center";
             $td.appendChild(CheckBox({
              "nombre": "per03[]",
                    "valor": registro.for01,
                    "checado": registro.per03!== null,
                    "atributo": "per03[]"
                }));
            }else{
             $td.innerText = campo;
            }
            $tr.appendChild($td);
        }  
            i++;
        });
        $tbodyFragment.appendChild($tr);
    });
}else{
    const $tr = document.createElement('tr');
    const $td = document.createElement('td');
    $td.innerText = registros.error;
    $tr.appendChild($td);
    $tbodyFragment.appendChild($tr);
}

    $tbody.appendChild($tbodyFragment);
    $tabla.appendChild($tbody);
    if (tipo === 1) {
        $scroll.appendChild($tabla);
        return $scroll;
    } else {
        return $tabla;
    }
}