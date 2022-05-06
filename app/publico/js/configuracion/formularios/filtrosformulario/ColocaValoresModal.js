import { Hidden } from "../../../componentes/Hidden.js";
import { ObtieneRegistro } from "../../../funciones/ObtieneRegistro.js";

export async function ColocaValoresModal(AIdTabla) {
  const $formulario = document.getElementById("id-formulario-captura");
  $formulario.appendChild(Hidden({
    "name": "fil01",
    "valor": AIdTabla
  }));
  $formulario.appendChild(Hidden({
    "name": "fil02",
    "valor": document.getElementById("id-formularios").value
  }));
  if (AIdTabla === 0) {
    document.getElementById("id-fil04").value = "";
    document.getElementById("id-fil09").value = "";
  } else {
    const valores = await ObtieneRegistro({
      "idFormulario": sessionStorage.getItem("idFormulario"),
      "idTabla": AIdTabla
    });
    document.getElementById("modal-principal-titulo").innerHTML = null;
    document.getElementById("modal-principal-titulo").innerHTML = "Modificar Filtro Formulario";
    document.getElementById("id-fil03").value = valores.fil03;
    document.getElementById("id-fil04").value = valores.fil04;
    document.getElementById("id-fil05").value = valores.fil05;
    document.getElementById("id-fil06").value = valores.fil06;
    document.getElementById("id-fil07").value = valores.fil07;
    document.getElementById("id-fil08").value = valores.fil08;
    document.getElementById("id-fil09").value = valores.fil09;
  }

  
}