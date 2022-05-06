import { ObtieneRegistro } from "../../funciones/ObtieneRegistro.js";
import { Hidden } from "../../componentes/Hidden.js";
export async function ColocaValoresModal(AIdTabla) {
  const $formulario = document.getElementById("id-formulario-captura");  
  $formulario.appendChild(Hidden({
    "name": "rep01",
    "valor": AIdTabla
}));
  if (AIdTabla === 0) {
    document.getElementById(`id-rep02`).value = "";
    document.getElementById(`id-rep03`).value = "";
    document.getElementById(`id-rep04`).value = "";
    document.getElementById(`id-rep05`).value = "";
    document.getElementById(`id-rep06`).value = "";
  } else {
    const valores = await ObtieneRegistro({
      "idFormulario": sessionStorage.getItem("idFormulario"),
      "idTabla": AIdTabla
    });
    document.getElementById(`id-rep01`).value = valores.rep01;
    document.getElementById("id-rep02").value = valores.rep02;
    document.getElementById("id-rep03").value = valores.rep03;
    document.getElementById("id-rep04").value = valores.rep04;
    document.getElementById("id-rep05").value = valores.rep05;
    document.getElementById("id-rep06").value = valores.rep06;
  }
}