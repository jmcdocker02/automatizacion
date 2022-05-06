import { ObtieneRegistro } from "../../funciones/ObtieneRegistro.js";

export async function ColocaValoresModal(AIdTabla) {
  if (AIdTabla === 0) {
    document.getElementById(`id-ico01`).value = "";
    document.getElementById("id-ico02").value = "";
    document.getElementById("id-ico03").value = "";
  } else {
    const valores = await ObtieneRegistro({
      "idFormulario": sessionStorage.getItem("idFormulario"),
      "idTabla": AIdTabla
    });
    document.getElementById("modal-principal-titulo").innerHTML = null;
    document.getElementById("modal-principal-titulo").innerHTML = "Modificar Icono";
    document.getElementById(`id-ico01`).value = valores.ico01;
    document.getElementById("id-ico02").value = valores.ico02;
    document.getElementById("id-ico03").value = valores.ico03;
  }
}