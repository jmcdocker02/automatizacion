export function RestaurarFormularioPrincipal(AElementoTitulo) {
  const formularioPrincipal = JSON.parse(sessionStorage.getItem("formularioPrincipal"));
  sessionStorage.setItem("idFormulario", formularioPrincipal.idFormulario);
  sessionStorage.setItem("nombreFormulario", formularioPrincipal.nombreFormulario);
  sessionStorage.setItem("parametros", formularioPrincipal.parametros);
  sessionStorage.removeItem("formularioPrincipal");
  document.getElementById("id-titulo").innerHTML = null;
  document.getElementById("id-titulo").innerHTML = AElementoTitulo;
}