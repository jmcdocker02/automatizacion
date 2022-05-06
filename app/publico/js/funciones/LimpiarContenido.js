export function LimpiarContenido() {
  // LimpiarElemento("empresa");
  LimpiarElemento("filtros");
  LimpiarElemento("contenido");
  sessionStorage.setItem("parametros", "{}");
}

function LimpiarElemento(AIdElemento) {
  document.getElementById(AIdElemento).innerHTML = null;
}