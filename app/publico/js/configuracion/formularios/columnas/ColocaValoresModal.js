import { Hidden } from "../../../componentes/Hidden.js";
import { ObtieneRegistro } from "../../../funciones/ObtieneRegistro.js";

export async function ColocaValoresModal(AJson) {
  const {
    col01,
    col02
  } = AJson;
  const $formulario = document.getElementById("id-formulario-captura");
  $formulario.appendChild(Hidden({
    "name": "col01",
    "valor": col01
  }));
  if (col02 === 0) {
    document.getElementById("id-col02").value = "";
    document.getElementById("id-col03").value = "";
    document.getElementById("id-col04").value = "";
    document.getElementById("id-col06").value = "";
    document.getElementById("id-col07").value = "";
  } else {
    const valores = await ObtieneRegistro({
      "idFormulario": sessionStorage.getItem("idFormulario"),
      "idTabla": `${col01},${col02}`
    });
    document.getElementById("modal-principal-titulo").innerHTML = null;
    document.getElementById("modal-principal-titulo").innerHTML = "Modificar Columna";
    document.getElementById("id-col02").value = valores.col02;
    document.getElementById("id-col02").setAttribute("readonly", "");
    document.getElementById("id-col03").value = valores.col03;
    document.getElementById("id-col04").value = valores.col04;
    document.getElementById("id-col05").value = valores.col05;
    document.getElementById("id-col06").value = valores.col06;
    document.getElementById("id-col07").value = valores.col07;
  }
}