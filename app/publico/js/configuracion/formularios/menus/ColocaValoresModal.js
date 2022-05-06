import { ObtieneRegistro } from "../../../funciones/ObtieneRegistro.js";
import { Hidden } from "../../../componentes/Hidden.js";

export async function ColocaValoresModal(AJson) {
  const {
      id,
      formulario
  } = AJson;
  const aux = (formulario === undefined) ? "id-formulario-captura" : formulario;
  const $formulario = document.getElementById(aux);

  $formulario.appendChild(Hidden({
      "name": "men01",
      "valor": id
  }));
  if (id === 0) {
    document.getElementById("id-men02").value = "";
    document.getElementById("id-men04").value = "";
  } else {
    const valores = await ObtieneRegistro({
      "idFormulario": sessionStorage.getItem("idFormulario"),
      "idTabla": id
    });
    document.getElementById("modal-principal-titulo").innerHTML = null;
    document.getElementById("modal-principal-titulo").innerHTML = "Modificar Menu";
    document.getElementById(`id-men01`).value = valores.men01;
    document.getElementById("id-men02").value = valores.men02;
    document.getElementById("id-men03").value = valores.men03;
    document.getElementById("id-men04").value = valores.men04;
    document.getElementById("id-men05").value = valores.men05;
  }
}